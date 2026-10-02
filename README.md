# 🎮 Eplay — E-commerce de Jogos

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361dafb)
![TypeScript](https://img.shields.io/badge/typescript-%23007acc.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-%23db7093.svg?style=for-the-badge&logo=styled-components&logoColor=white)

O **EPlay** é uma SPA (Single Page Application) focada em simular a experiência real de uma loja virtual de jogos. O projeto engloba todo o fluxo principal de um e-commerce, desde a listagem de produtos por categoria e tela de detalhes até o funcionamento do carrinho e a etapa final de checkout.

Desenvolvi este projeto durante o módulo de Front-end no curso da EBAC com o objetivo de consolidar conceitos de arquitetura em React, controle de estado global e integração com APIs.

---

## Tecnologias Utilizadas

- **React**
- **Typescript**
- **Redux Toolkit e RTK Query**
- **Styled-Components**
- **React Router DOM**
---

## O que a aplicação faz

- **Navegação por categorias:** Os jogos são renderizados de forma dinâmica (separados por categorias como Ação, RPG, Esportes) buscando as informações direto da API.
- **Carrinho de compras interativo:** Sistema que permite adicionar e remover itens com atualização imediata dos valores e da quantidade, controlado globalmente via Redux.
- **Tela de detalhes do produto:** Página específica para cada jogo mostrando imagens, preço e a descrição detalhada do título.
- **Fluxo de checkout completo:** Formulário simulando a etapa de pagamento e fechamento do pedido com validação dos dados digitados.
- **Otimização com cache:** Uso das vantagens do RTK Query para salvar requisições em cache, deixando a troca de páginas instantânea para o usuário.

---
