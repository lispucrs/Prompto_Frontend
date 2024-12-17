import api from "./api";

export class FetchUserCompleteProjects {
  static async getCompleteProjects(userId: number): Promise<any> {
    try {
      const response = await api.get(`/${userId}/done_projects`);

      if (response.status !== 200) {
        throw new Error("Erro ao buscar os projetos completos do usuário.");
      }

      console.log("Projetos completos obtidos com sucesso:", response.data);

      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar projetos completos:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      throw new Error("Erro ao buscar projetos completos.");
    }
  }
}
