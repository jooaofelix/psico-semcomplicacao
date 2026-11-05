# Psicologia sem Complicação

Site de resumos de psicologia em PDF para baixar de graça, organizado por matéria.
Feito em HTML, CSS e JavaScript puros: não precisa instalar nada.

## Estrutura

```
index.html      página inicial (busca, matérias, vídeos)
materia.html    página de cada matéria (materia.html?m=etica)
js/dados.js     TODO o conteúdo: matérias, temas, PDFs e vídeos
js/app.js       monta as páginas a partir do dados.js
css/estilo.css  visual (cores e fontes no topo do arquivo)
img/mascote/    poses do mascote
pdfs/           os resumos em PDF
```

## Colocar o mascote

As poses ficam em `img/mascote/` (PNG com fundo transparente):
`apresentando.png` (início), `apontando.png` (páginas das matérias), `estudando.png` (vídeos)
e `acenando.png` (chamada do Instagram). Para trocar, salve a nova imagem com o mesmo nome.

## Publicar um resumo

1. Coloque o PDF em `pdfs/` (ex.: `pdfs/etica/codigo-de-etica.pdf`).
2. Em `js/dados.js`, ache o tema e preencha o campo `pdf`:
   ```js
   { titulo: 'Código de Ética Profissional do Psicólogo', pdf: 'pdfs/etica/codigo-de-etica.pdf' },
   ```
3. O tema troca de "Em breve" para o botão **Baixar PDF**, e a contagem da matéria atualiza sozinha.

Cada tema tem um link direto pra usar no Instagram, por exemplo:
`materia.html?m=desenvolvimento`

## PsicoPlay

O jogo de lições fica em `psicoplay.html` (arquivo único, sem dependências). As questões estão na lista `UNITS`, dentro do próprio arquivo; cada unidade aponta para o PDF da apostila. O progresso de cada pessoa fica salvo só no navegador dela. Para mostrar a chamada do jogo em outra matéria, coloque `jogo: 'psicoplay.html'` nela em `js/dados.js`.

O jogo também pode ser instalado como aplicativo. O `manifest.webmanifest` dá o nome e os ícones (`img/app-icone-*.png`), e o `sw.js` guarda uma cópia para abrir sem internet. Ao mudar o `sw.js`, troque o número em `VERSAO` para os aparelhos baixarem a versão nova.

Qualquer link para `psicoplay.html` no site abre o jogo com a transição de marca-texto (em `js/app.js`, função `iniciarPsicoPlay`).

## Login do PsicoPlay (Firebase)

Com o Firebase configurado, o PsicoPlay pede login (Google ou e-mail e senha) e salva XP, sequência, lições, erros e histórico na conta da pessoa, em qualquer aparelho. Sem configuração, ele funciona sem login e salva só no aparelho.

1. Em console.firebase.google.com, crie um projeto (o Google Analytics pode ficar desligado).
2. **Authentication → Começar → Método de login**: ative **Google** e **E-mail/senha**.
3. **Authentication → Configurações → Domínios autorizados**: adicione o endereço do site (por exemplo `psico-semcomplicacao.desatasistemas.workers.dev`).
4. **Firestore Database → Criar banco de dados** (modo de produção, região `southamerica-east1`). Na aba **Regras**, cole o conteúdo de `firestore.rules` e publique.
5. **Configurações do projeto → Seus apps → Web (</>)**: registre um app e copie o `firebaseConfig` para `js/firebase-config.js`, no lugar do `null`.

Os dados ficam em `jogadores/{uid}`. Cada pessoa só lê e grava o próprio documento.

## Vídeos

Em `js/dados.js`, na lista `VIDEOS`, preencha `youtube` com o código do vídeo (a capa aparece sozinha)
ou `link` + `capa` para Reels. Sem link, o vídeo aparece como "Em breve".

## Mudar as cores

As cores e fontes ficam no começo de `css/estilo.css`, em `:root`.

## Publicar o site (Cloudflare)

O site no ar fica em `https://psico-semcomplicacao.jvctrfelix.workers.dev`. Depois de mudar qualquer arquivo, publique de novo com:

```bash
npx wrangler deploy
```

A configuração está em `wrangler.jsonc`. O `.assetsignore` lista o que não vai para o site (README, configuração e a pasta `.git`).

## Outra opção (GitHub Pages, grátis)

No GitHub: **Settings → Pages → Branch**, escolha a branch e a pasta `/ (root)` e salve.
O site fica em `https://jooaofelix.github.io/psico-semcomplicacao/`.
