
export class EventSourceService {
    static listenForUpdates(onMessage: (message: string) => void, onError?: () => void): EventSource {
        const eventSource = new EventSource("http://localhost:8000/api/stream/sse");
    
        eventSource.onmessage = (event) => {
          console.log("Mensagem recebida via SSE:", event.data);
          onMessage(event.data);
            
        };
    
        eventSource.onerror = () => {
          console.error("Erro na conexão SSE.");
          eventSource.close();
    
          if (onError) {
            onError(); 
          }
        };
    
        return eventSource; 
      }
    }

