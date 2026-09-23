# Portabilidade do projeto

Este repositório contém a página de vendas pronta para editar e publicar. Prompts, frames de anúncios e entregáveis pesados não fazem parte do Git.

## Abrir no Codex em outro computador

1. Clone o repositório.
2. Abra a pasta clonada como projeto no Codex.
3. Para visualizar a página localmente, execute:

```bash
python3 -m http.server 4173 --directory dist
```

4. Abra `http://127.0.0.1:4173/` no navegador.

## Estrutura

- `dist/index.html`: página principal.
- `dist/style.css`: estilos da página.
- `dist/script.js`: interações, cronômetro e popup.
- `dist/config.js`: checkouts atualmente configurados.
- `dist/offer-settings.js`: preços e configurações comerciais.
- `dist/checkout.js`: integração dos botões de compra.
- `dist/img`: imagens necessárias para a página funcionar.
- `.openai/hosting.json`: configuração de hospedagem do projeto.

## Entregáveis

As 200 missões em alta resolução ficam na pasta do Google Drive:

https://drive.google.com/drive/folders/1lTlIq0PxIKAb6CC8X4QLpUZLHM0GbbUJ

Essa separação mantém o Git leve e permite clonar rapidamente em outro computador.

## Publicar novamente

Dentro da pasta `dist`, use a Vercel CLI vinculando o projeto existente quando solicitado:

```bash
npx vercel --prod
```

Os arquivos `.env.local` e `.vercel` não são versionados e precisam ser recriados ou vinculados em cada computador.
