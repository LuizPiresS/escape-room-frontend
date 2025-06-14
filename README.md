# 🏰 Escape Room Frontend

Frontend interativo para um jogo de Escape Room digital, desenvolvido com React, TypeScript e Vite.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js v18+
- npm v9+
- Backend do Escape Room rodando (clonar : [escape-room-backend](https://github.com/LuizPiresS/escape-room-backend))

### Instalação

1. Clone o repositório:
   ```sh
   git clone https://github.com/LuizPiresS/escape-room-frontend.git
   cd escape-room-frontend
   ```

2. Instale as dependências:
   ```sh
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

4. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## 🧩 Estrutura do Projeto

```
src/
  components/
    ProgressBar/
    Room/
    WinScreen/
  App.tsx
  main.tsx
  ...
api.ts
vite.config.ts
...
```

- **App.tsx**: Componente principal, gerencia rotas e progresso.
- **Room/**: Componentes das salas e desafios.
- **ProgressBar/**: Barra de progresso do jogo.
- **WinScreen/**: Tela de vitória.

## 📝 Scripts

- `npm run dev` — Inicia o servidor de desenvolvimento.
- `npm run build` — Gera build de produção.
- `npm run preview` — Visualiza build de produção localmente.
- `npm run lint` — Executa o linter.
 
## 📦 Build

Para gerar o build de produção:
```sh
npm run build
```

## 🧪 Testes

> Ainda não implementado. Sugestão: usar [Vitest](https://vitest.dev/) para testes unitários.

## 📄 Licença

MIT
