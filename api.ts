import axios from "axios";

const api = axios.create({
  baseURL: "/game",
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data.message || "Erro na requisição",
        status: error.response.status,
      });
    } else if (error.request) {
      return Promise.reject({
        message: "Sem resposta do servidor",
        status: null,
      });
    } else {
      return Promise.reject({
        message: "Erro ao configurar a requisição",
        status: null,
      });
    }
  }
);

export const getRoom = (roomId: number) => api.get(`/room/${roomId}`);
export const checkAnswer = (roomId: number, answer: string) =>
  api.post(`/room/${roomId}/check-answer`, { answer });
export const getProgress = () => api.get("/progress");
export default api;

export const resetGame = async () => {
  const response = await api.post("/reset");
  return response.data;
};
