import api from "./api";

export class FetchUserProjects {
  static async getProjects(userId: number): Promise<any> {
    try {
      const response = await api.get(`/${userId}`);
      console.log("response");

      console.log(response);
      if (response.status !== 200) {
        throw new Error("Erro ao buscar os projetos do usuário.");
      }
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      throw new Error("Erro ao buscar projetos.");
    }
  }
}
