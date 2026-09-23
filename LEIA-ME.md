# Pequenos Detetives — cópia completa editável

Página baseada no HTML, CSS e comportamento de https://pequenoscuriosos.vercel.app/.

## Elementos preservados

- Cronômetro de 26:48 com persistência no navegador, barra de urgência e animações.
- Hero, duas faixas de carrossel de produtos, três passos de compra, quatro bônus e carrossel de fotos.
- Plano Básico de 100 mistérios: de R$ 39,90 por R$ 17,90.
- Plano Premium de 200 mistérios + 4 bônus: de R$ 97,00 por R$ 37,90.
- Pop-up ao escolher a Básica: upgrade de R$ 6,10, total Premium R$ 24,00.
- Selo de garantia, seção de depoimentos, notificações, FAQ, CTA final e rodapé.
- Mesmos estilos, fontes, cores, bordas, sombras e estrutura responsiva da referência.

## Arquivos para editar

- `dist/index.html`: textos, preços, bônus, quantidade e seções.
- `dist/style.css`: CSS da referência; correções de largura e acessibilidade ao final.
- `dist/script.js`: cronômetro, notificações, animações e FAQ.
- `dist/checkout.js`: modal de upgrade e encaminhamento para compra.
- `dist/config.js`: configurar `basic`, `premium` e `upgrade` com os links da nova oferta.
- `dist/img/`: novas imagens adaptadas das referências originais, selo e marca preservados.

Prévia local: `python3 -m http.server 4173 --directory dist`.

## Rastreamento e checkout

A página utiliza os scripts de pixel e UTMs da UTMify fornecidos para esta oferta. Os botões direcionam para os checkouts configurados em `dist/offer-settings.js`.

Os arquivos visuais usados diretamente pela página ficam em `dist/img`. Entregáveis, prompts de geração e materiais de anúncios permanecem fora deste repositório.

## Abrir em outro computador

Consulte `PORTABILIDADE.md` para clonar, abrir no Codex, visualizar localmente e publicar novamente.
