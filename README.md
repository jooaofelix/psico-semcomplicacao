# Psico Sem Complicação

Site de resumos de psicologia em PDF para baixar de graça, organizado por matéria.
Feito em HTML, CSS e JavaScript puros: não precisa instalar nada.

## Estrutura

```
index.html      página inicial (busca, matérias, vídeos)
materia.html    página de cada matéria (materia.html?m=etica)
js/dados.js     TODO o conteúdo: matérias, temas, PDFs e vídeos
js/app.js       monta as páginas a partir do dados.js
css/estilo.css  visual (cores e fontes no topo do arquivo)
img/            mascote e ícone
pdfs/           os resumos em PDF
```

## Colocar o mascote

Salve a imagem como `img/mascote.png` (de preferência com fundo transparente).
Enquanto ela não existir, aparece o símbolo ψ no lugar.

## Publicar um resumo

1. Coloque o PDF em `pdfs/` (ex.: `pdfs/etica/codigo-de-etica.pdf`).
2. Em `js/dados.js`, ache o tema e preencha o campo `pdf`:
   ```js
   { titulo: 'Código de Ética Profissional do Psicólogo', pdf: 'pdfs/etica/codigo-de-etica.pdf' },
   ```
3. O tema troca de "Em breve" para o botão **Baixar PDF**, e a contagem da matéria atualiza sozinha.

Cada tema tem um link direto pra usar no Instagram, por exemplo:
`materia.html?m=desenvolvimento`

## Vídeos

Em `js/dados.js`, na lista `VIDEOS`, preencha `youtube` com o código do vídeo (a capa aparece sozinha)
ou `link` + `capa` para Reels. Sem link, o vídeo aparece como "Em breve".

## Mudar as cores

As cores ficam no começo de `css/estilo.css`, em `:root`. Troque os códigos para as cores do Instagram.

## Publicar o site (GitHub Pages, grátis)

No GitHub: **Settings → Pages → Branch**, escolha a branch e a pasta `/ (root)` e salve.
O site fica em `https://jooaofelix.github.io/psico-semcomplicacao/`.
