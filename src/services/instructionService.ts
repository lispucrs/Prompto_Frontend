import api from "./api";

export const changeInstruction = async (instructionKey: number): Promise<void> => {
  try {
    const response = await api.post("/change-instruction", {
      instruction_key: instructionKey,
    });
    if (!response.status) throw new Error("Erro ao alterar a instrução do sistema.");
    console.log("Instrução alterada com sucesso!");
  } catch (error) {
    console.error("Erro ao alterar a instrução:", error);
    throw new Error("Erro ao alterar a instrução.");
  }
};
