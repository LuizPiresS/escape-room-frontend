# Escape Room Digital

Um jogo de Escape Room digital desenvolvido em React + TypeScript.

---

## ✨ Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

---

## 🚀 Como rodar o projeto

1. Instale as dependências:
   ```sh
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
3. Acesse [http://localhost:5173](http://localhost:5173) no navegador.

---

## 🛠️ Técnicas e Padrões Utilizados

- **Componentização e Reutilização:**  
  Cada parte da interface é um componente React separado, facilitando manutenção e escalabilidade.

- **Componente Genérico para Desafios:**  
  O componente `ChallengeForm` centraliza o HTML, lógica e estilos dos desafios, sendo reutilizado por todos os tipos de desafio.

- **Tipagem Forte com TypeScript:**  
  Uso de interfaces e tipos para garantir segurança e autocompletar.

- **Hooks para Lógica de Dados:**  
  Uso de hooks (`useState`, `useEffect`) e custom hooks para separar lógica de dados da interface.

- **Feedback Visual e Acessibilidade:**  
  Feedbacks de sucesso/erro, spinner de carregamento, atributos ARIA e roles nos formulários.

- **CSS Modular e Centralizado:**  
  Cada componente tem seu CSS próprio, e estilos globais (como o spinner) são centralizados.

- **Gerenciamento de Rotas:**  
  Uso do React Router para navegação entre salas e tela de vitória.

- **Barra de Progresso:**  
  Exibe o progresso do usuário de forma visual e acessível.

---

## 📄 Licença

Este projeto está sob a licença MIT.
