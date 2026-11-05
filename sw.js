/*
  Service worker do PsicoPlay: deixa o jogo abrir mesmo sem internet.
  Páginas: tenta a rede primeiro (para pegar atualizações) e usa a cópia guardada se estiver offline.
  Imagens, fontes e PDFs: usa a cópia guardada e atualiza em segundo plano.
*/
const VERSAO = 'psicoplay-v3';
const ESSENCIAIS = [
  'psicoplay.html',
  'js/firebase-config.js',
  'js/psicoplay-nuvem.js',
  'manifest.webmanifest',
  'img/mascote/acenando.png',
  'img/mascote/estudando.png',
  'img/mascote/apresentando.png',
  'img/app-icone-192.png',
  'img/icone-mascote-32.png',
  'favicon.ico'
];

// Uma resposta que veio de redirecionamento (o Cloudflare tira o .html do endereço) não pode abrir uma página.
const limpa = r => (r && r.redirected ? r.blob().then(b => new Response(b, { status: r.status, headers: r.headers })) : r);

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(VERSAO)
      .then(c => Promise.all(ESSENCIAIS.map(u => fetch(u).then(limpa).then(r => { if (r.ok) return c.put(u, r); }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(nomes => Promise.all(nomes.filter(n => n !== VERSAO).map(n => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Fontes do Google e os arquivos do Firebase (www.gstatic.com) também ficam guardados para abrir sem internet.
  const fonte = ['fonts.googleapis.com', 'fonts.gstatic.com', 'www.gstatic.com'].includes(url.hostname);
  if (url.origin !== self.location.origin && !fonte) return;

  if (req.mode === 'navigate') {
    ev.respondWith(
      fetch(req).then(limpa).then(r => {
        if (r.ok) { const copia = r.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); }
        return r;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('psicoplay.html')))
    );
    return;
  }

  ev.respondWith(
    caches.match(req).then(guardada => {
      const rede = fetch(req).then(r => {
        if (r.ok || r.type === 'opaque') { const copia = r.clone(); caches.open(VERSAO).then(c => c.put(req, copia)); }
        return r;
      }).catch(() => guardada);
      return guardada || rede;
    })
  );
});
