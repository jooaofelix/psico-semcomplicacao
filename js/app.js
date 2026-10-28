(function () {
  'use strict';

  // ---------- utilidades ----------

  function esc(texto) {
    return String(texto)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // Tira acentos e deixa minúsculo, para a busca achar "etica" em "Ética".
  function normalizar(texto) {
    return String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  function slug(texto) {
    return normalizar(texto).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  function linkMateria(materia, topico) {
    return 'materia.html?m=' + encodeURIComponent(materia.id) + (topico ? '#' + slug(topico.titulo) : '');
  }

  function prontos(materia) {
    return materia.topicos.filter(function (t) { return t.pdf; }).length;
  }

  function textoStatus(materia) {
    var total = materia.topicos.length;
    var n = prontos(materia);
    if (n === 0) return 'Resumos em breve';
    if (n === total) return total === 1 ? '1 resumo pronto' : total + ' resumos prontos';
    return n + ' de ' + total + ' resumos prontos';
  }

  function nomeFase(id) {
    var fase = FASES.find(function (f) { return f.id === id; });
    return fase ? fase.nome : '';
  }

  var ICONE_BAIXAR =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19.5h14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  var ICONE_PLAY =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 6.5v11l9-5.5z" fill="currentColor"/></svg>';

  function acaoTopico(topico) {
    if (topico.pdf) {
      return '<a class="botao-baixar" href="' + esc(topico.pdf) + '" download>' + ICONE_BAIXAR + '<span>Baixar PDF</span></a>';
    }
    return '<span class="selo-breve">Em breve</span>';
  }

  // ---------- página inicial ----------

  function cartaoMateria(materia) {
    return (
      '<li>' +
        '<a class="materia" href="' + linkMateria(materia) + '">' +
          '<span class="materia-aba">' + materia.topicos.length + ' temas</span>' +
          '<span class="materia-corpo">' +
            '<span class="materia-nome">' + esc(materia.nome) + '</span>' +
            '<span class="materia-descricao">' + esc(materia.descricao) + '</span>' +
            '<span class="materia-status' + (prontos(materia) ? ' tem-resumo' : '') + '">' + textoStatus(materia) + '</span>' +
          '</span>' +
        '</a>' +
      '</li>'
    );
  }

  function renderFases() {
    var alvo = document.getElementById('fases');
    if (!alvo) return;
    alvo.innerHTML = FASES.map(function (fase) {
      var materias = MATERIAS.filter(function (m) { return m.fase === fase.id; });
      return (
        '<section class="fase" data-fase="' + fase.id + '" aria-labelledby="fase-' + fase.id + '">' +
          '<div class="fase-cabeca">' +
            '<h2 id="fase-' + fase.id + '">' + esc(fase.nome) + '</h2>' +
            '<p>' + esc(fase.descricao) + '</p>' +
          '</div>' +
          '<ul class="materias">' + materias.map(cartaoMateria).join('') + '</ul>' +
        '</section>'
      );
    }).join('');
  }

  function renderAtalhos() {
    var alvo = document.getElementById('atalhos');
    if (!alvo) return;
    var links = MAIS_PROCURADAS.map(function (id) {
      var materia = MATERIAS.find(function (m) { return m.id === id; });
      return materia ? '<a href="' + linkMateria(materia) + '">' + esc(materia.nome) + '</a>' : '';
    }).join('');
    alvo.innerHTML = '<span class="atalhos-rotulo">Mais procuradas:</span>' + links;
  }

  function renderVideos() {
    var alvo = document.getElementById('videos-lista');
    if (!alvo) return;
    alvo.innerHTML = VIDEOS.map(function (video) {
      var materia = MATERIAS.find(function (m) { return m.id === video.materia; });
      var fase = materia ? materia.fase : 'comeco';
      var link = video.link || (video.youtube ? 'https://www.youtube.com/watch?v=' + encodeURIComponent(video.youtube) : '');
      var capa = video.capa || (video.youtube ? 'https://i.ytimg.com/vi/' + encodeURIComponent(video.youtube) + '/hqdefault.jpg' : '');

      var miniatura = capa
        ? '<img src="' + esc(capa) + '" alt="" loading="lazy">'
        : '<span class="video-titulo-capa">' + esc(video.titulo) + '</span>';

      var conteudo =
        '<span class="video-capa" data-fase="' + fase + '">' +
          miniatura +
          '<span class="video-play">' + ICONE_PLAY + '</span>' +
          (link ? '' : '<span class="selo-breve">Em breve</span>') +
        '</span>' +
        '<span class="video-info">' +
          '<span class="video-nome">' + esc(video.titulo) + '</span>' +
          (materia ? '<span class="video-materia">' + esc(materia.nome) + '</span>' : '') +
        '</span>';

      return link
        ? '<li><a class="video" href="' + esc(link) + '" target="_blank" rel="noopener">' + conteudo + '</a></li>'
        : '<li><div class="video video-breve">' + conteudo + '</div></li>';
    }).join('');
  }

  // ---------- busca ----------

  function montarIndice() {
    var itens = [];
    MATERIAS.forEach(function (materia) {
      itens.push({
        tipo: 'materia',
        titulo: materia.nome,
        detalhe: materia.topicos.length + ' temas, ' + textoStatus(materia).toLowerCase(),
        href: linkMateria(materia),
        chave: normalizar(materia.nome + ' ' + materia.descricao),
      });
      materia.topicos.forEach(function (topico) {
        itens.push({
          tipo: 'topico',
          titulo: topico.titulo,
          detalhe: materia.nome,
          href: linkMateria(materia, topico),
          pdf: topico.pdf,
          chave: normalizar(topico.titulo + ' ' + materia.nome),
        });
      });
    });
    return itens;
  }

  function iniciarBusca() {
    var campo = document.getElementById('busca');
    var painel = document.getElementById('busca-resultados');
    var form = document.getElementById('busca-form');
    if (!campo || !painel || !form) return;

    var indice = montarIndice();
    var aviso = document.getElementById('busca-aviso');

    function buscar(termo) {
      var palavras = normalizar(termo).split(/\s+/).filter(Boolean);
      if (!palavras.length) return [];
      return indice.filter(function (item) {
        return palavras.every(function (p) { return item.chave.indexOf(p) !== -1; });
      })
      // matérias primeiro, depois temas
      .sort(function (a, b) { return (a.tipo === 'materia' ? 0 : 1) - (b.tipo === 'materia' ? 0 : 1); })
      .slice(0, 8);
    }

    function fechar() {
      painel.hidden = true;
      campo.setAttribute('aria-expanded', 'false');
    }

    function mostrar() {
      var termo = campo.value.trim();
      if (!termo) {
        fechar();
        aviso.textContent = '';
        return;
      }
      var resultados = buscar(termo);
      if (!resultados.length) {
        painel.innerHTML =
          '<p class="busca-vazia">Nada encontrado para “' + esc(termo) + '”. Tente o nome de um autor ou de uma matéria, como Freud ou Ética.</p>';
        aviso.textContent = 'Nenhum resultado.';
      } else {
        painel.innerHTML = '<ul>' + resultados.map(function (item) {
          var selo = item.tipo === 'materia'
            ? '<span class="selo-materia">Matéria</span>'
            : (item.pdf ? '<span class="selo-pronto">PDF</span>' : '<span class="selo-breve">Em breve</span>');
          return (
            '<li><a href="' + item.href + '">' +
              '<span class="resultado-texto">' +
                '<span class="resultado-titulo">' + esc(item.titulo) + '</span>' +
                '<span class="resultado-detalhe">' + esc(item.detalhe) + '</span>' +
              '</span>' + selo +
            '</a></li>'
          );
        }).join('') + '</ul>';
        aviso.textContent = resultados.length + (resultados.length === 1 ? ' resultado.' : ' resultados.');
      }
      painel.hidden = false;
      campo.setAttribute('aria-expanded', 'true');
    }

    campo.addEventListener('input', mostrar);
    campo.addEventListener('focus', function () { if (campo.value.trim()) mostrar(); });

    // Enter abre o primeiro resultado.
    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      var primeiro = painel.querySelector('a');
      if (primeiro && !painel.hidden) window.location.href = primeiro.href;
    });

    // Setas para navegar pelos resultados, Esc para fechar.
    form.addEventListener('keydown', function (evento) {
      var links = Array.prototype.slice.call(painel.querySelectorAll('a'));
      var atual = links.indexOf(document.activeElement);
      if (evento.key === 'ArrowDown' && links.length) {
        evento.preventDefault();
        links[Math.min(atual + 1, links.length - 1)].focus();
      } else if (evento.key === 'ArrowUp' && links.length) {
        evento.preventDefault();
        if (atual <= 0) campo.focus();
        else links[atual - 1].focus();
      } else if (evento.key === 'Escape') {
        fechar();
        campo.focus();
      }
    });

    document.addEventListener('click', function (evento) {
      if (!form.contains(evento.target)) fechar();
    });
  }

  // ---------- página da matéria ----------

  function renderMateria() {
    var alvo = document.getElementById('materia');
    if (!alvo) return;

    var id = new URLSearchParams(window.location.search).get('m');
    var materia = MATERIAS.find(function (m) { return m.id === id; });

    if (!materia) {
      alvo.innerHTML =
        '<div class="nao-encontrada">' +
          '<h1>Matéria não encontrada</h1>' +
          '<p>O link pode estar incompleto. Escolha a matéria na lista da página inicial.</p>' +
          '<a class="botao-secundario" href="./#materias">Ver todas as matérias</a>' +
        '</div>';
      return;
    }

    document.title = materia.nome + ' | Psicologia sem Complicação';
    document.body.setAttribute('data-fase', materia.fase);

    var total = materia.topicos.length;
    var n = prontos(materia);
    var contagem = n === 0
      ? total + ' temas. Os resumos ainda estão sendo preparados.'
      : n + ' de ' + total + ' resumos prontos para baixar.';

    var topicos = materia.topicos.map(function (topico) {
      return (
        '<li id="' + slug(topico.titulo) + '" class="topico' + (topico.pdf ? ' topico-pronto' : '') + '">' +
          '<span class="topico-arquivo" aria-hidden="true"><span>PDF</span></span>' +
          '<span class="topico-titulo">' + esc(topico.titulo) + '</span>' +
          acaoTopico(topico) +
        '</li>'
      );
    }).join('');

    var outras = MATERIAS.filter(function (m) { return m.fase === materia.fase && m.id !== materia.id; })
      .map(function (m) { return '<li><a href="' + linkMateria(m) + '">' + esc(m.nome) + '</a></li>'; })
      .join('');

    alvo.innerHTML =
      '<header class="materia-cabeca">' +
        '<div class="materia-cabeca-texto">' +
          '<p class="selo-fase">' + esc(nomeFase(materia.fase)) + '</p>' +
          '<h1><span class="marca-texto-fundo">' + esc(materia.nome) + '</span></h1>' +
          '<p class="materia-intro">' + esc(materia.descricao) + '</p>' +
          '<p class="materia-contagem">' + contagem + '</p>' +
        '</div>' +
        '<img class="mascote" src="img/mascote/apontando.png" alt="" width="388" height="736">' +
      '</header>' +
      '<ul class="topicos">' + topicos + '</ul>' +
      (n < total
        ? '<aside class="aviso-insta">' +
            '<p>Os resumos novos são avisados primeiro no Instagram.</p>' +
            '<a class="botao-secundario" href="https://www.instagram.com/psicosemcomplicacao/" target="_blank" rel="noopener">Seguir @psicosemcomplicacao</a>' +
          '</aside>'
        : '') +
      (outras
        ? '<nav class="outras" aria-labelledby="outras-titulo">' +
            '<h2 id="outras-titulo">Outras matérias de ' + esc(nomeFase(materia.fase).toLowerCase()) + '</h2>' +
            '<ul>' + outras + '</ul>' +
          '</nav>'
        : '');

    // Se o link veio com #tema, rola até ele depois de montar a lista.
    if (window.location.hash) {
      var destino = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
      if (destino) {
        destino.classList.add('topico-destaque');
        destino.scrollIntoView({ block: 'center' });
      }
    }
  }

  // ---------- início ----------

  renderAtalhos();
  renderFases();
  renderVideos();
  iniciarBusca();
  renderMateria();

  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();
