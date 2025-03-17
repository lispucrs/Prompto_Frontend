import api from "./api";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.status === 200 && response.data.user.id) {
      return response.data.user.id;
    } else {
      throw new Error("Invalid email or password.");
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw new Error("Erro ao verificar credenciais. Tente novamente.");
  }
};
