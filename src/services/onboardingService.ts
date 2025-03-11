import api from "./api";

export const sendMessageToBackendOnboarding = async (
  projectId: string | number,
  userInput: string
): Promise<string> => {
  console.log("projectId", projectId);

  try {
    const response = await api.post(`/${Number(projectId)}/onboarding-chat`, {
      user_input: userInput,
    });

    return response.data.response;
  } catch (error) {
    console.error("Erro ao consultar o backend:", error);
    throw new Error("Erro ao consultar o backend.");
  }
};
