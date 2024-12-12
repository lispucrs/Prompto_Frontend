import api from "./api";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.status === 200 && response.data.id) {
      return response.data.id; // Retorna o ID do usuário se o login for bem-sucedido
    } else {
      throw new Error("Invalid email or password.");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw new Error("Erro ao verificar credenciais. Tente novamente.");
  }
};
