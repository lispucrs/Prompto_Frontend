import api from "./api";

export class DownloadPDF {
  static async downloadPDF(project_id: number): Promise<Blob> {
    try {
      const response = await api.get(`/${project_id}/download-pdf`, {
        responseType: "blob", 
      });
      
      return response.data;
    } catch (error: any) {
      console.error("Erro ao buscar PDF:", error);
      if (error.response) {
        console.error("Detalhes do erro:", error.response.data);
      }
      throw error; 
    }
  }
}