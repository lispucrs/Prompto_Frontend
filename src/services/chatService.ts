import api from "./api";

export const sendMessageToBackend = async (projectId: string, userInput: string): Promise<string> => {
  try {
    const response = await api.post(`${projectId}/chat`, { user_input: userInput });
    return response.data.response;
  } catch (error) {
    console.error("Erro ao consultar o backend:", error);
    throw new Error("Erro ao consultar o backend.");
  }
};
