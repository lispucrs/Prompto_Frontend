import SideBarHeader from "../../components/SideBarHeader/SideBarHeader";
import Profile from "../../components/Profile/Profile";
import "./Chat.scss";
import { FaArrowUp, FaRobot } from "react-icons/fa";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  atomDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import { RiRobot3Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

type Message = {
  text: string;
  sender: "user" | "bot" | "bot-loading";
};

export default function Chat() {
  const [data, setData] = useState<string>("");
  const [inputUser, setInputUser] = useState<string>("");
  const instructions = [
    { key: "create_project", label: "Create Project" },
    { key: "gather_requirements", label: "Gather Requirements" },
    { key: "assemble_team", label: "Assemble Team" },
  ];

  const handleInstructionChange = (instruction: string) => {
    console.log("Instrução escolhida:", instruction);
    setSelectedInstruction(instruction);
    changeInstruction(instruction);
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handlePromptClick = (prompt: string) => {
    setCurrentMessage(prompt);
  };
  async function changeInstruction(instructionKey: string): Promise<void> {
    try {
      const response = await fetch("http://127.0.0.1:8000/change-instruction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instruction_key: instructionKey }),
      });

      if (!response.ok) {
        throw new Error("Erro ao alterar a instrução do sistema.");
      }

      const data = await response.json();
      console.log("Instrução alterada:", data.message);
      alert("Instrução alterada com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao alterar a instrução do sistema.");
    }
  }

  async function getInfoFromBackEnd(
    apiEndpoint: string,
    params: Record<string, string>
  ): Promise<string> {
    try {
      // Montar a URL com os parâmetros de consulta
      const url = new URL(apiEndpoint);
      Object.keys(params).forEach((key) => {
        url.searchParams.append(key, params[key]);
      });

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao conectar com o backend. Código: ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Resposta do backend:", data.response);
      return data.response;
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao consultar o backend.");
      return "Desculpe, não consegui processar sua solicitação.";
    }
  }

  // const fetchData = async () => {
  //   axios
  //     .post("http://127.0.0.1:8000/chat", {
  //       user_input: inputUser,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //     });
  // };

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [haveText, setHaveText] = useState(false);
  // const [inputPosition, setInputPosition] = useState<"center" | "bottom">(
  //   "center"
  // );
  const [isWaiting, setIsWaiting] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  console.log(haveText);
  const promptsLeft = [
    "Create a new project!",
    "Form a team for my project",
    "Create user stories to base my new project!",
  ];
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const promptsRight = [
    "I want to create a new project",
    "How can I distribute tasks to my team?",
    "Define the requirements for my project.",
  ];
  const handleInputChange = (e) => {
    setCurrentMessage(e.target.value);
  };
  const handleSendMessage = async () => {
    if (currentMessage.trim() === "" || isWaiting) return;

    setMessages((prev) => [...prev, { text: currentMessage, sender: "user" }]);
    setHaveText(true);
    setIsWaiting(true);
    setCurrentMessage("");

    setMessages((prev) =>
      prev
        .filter((msg) => msg.sender !== "bot-loading")
        .concat({
          text: "",
          sender: "bot-loading",
        })
    );

    try {
      const botResponse = await sendMessageToBackend(currentMessage);

      setMessages((prev) =>
        prev
          .filter((msg) => msg.sender !== "bot-loading")
          .concat({ text: botResponse, sender: "bot" })
      );
    } catch (error) {
      setMessages((prev) =>
        prev
          .filter((msg) => msg.sender !== "bot-loading")
          .concat({
            text: "Failed to get a response from the assistant.",
            sender: "bot",
          })
      );
    } finally {
      setIsWaiting(false);
    }
  };
  const [selectedInstruction, setSelectedInstruction] = useState<string>("");
  console.log(selectedInstruction);
  return (
    <>
      <SideBarHeader onInstructionChange={handleInstructionChange} />
      <div className="chat-container">
        <div className="chat-title">
          Selected Instruction: {selectedInstruction}
        </div>

        {!haveText && (
          <>
            <div className="ready-prompts-title">Ready Prompts</div>
            <div className="chat-prompts-container">
              <div className="chat-prompts-left">
                <ul>
                  {promptsLeft.map((prompt, index) => (
                    <li key={index} onClick={() => handlePromptClick(prompt)}>
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat-prompts-right">
                <ul>
                  {promptsRight.map((prompt, index) => (
                    <li key={index} onClick={() => handlePromptClick(prompt)}>
                      {prompt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.sender === "user" ? "user" : "bot"
              }`}
            >
              {message.sender === "bot-loading" && (
                <div className="chat-message bot-loading">
                  Assistant Thinking...
                </div>
              )}
              {message.sender === "bot" ? (
                <div className="bot-message">
                  <span className="bot-icon">
                    <FaRobot />
                  </span>
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <div>{message.text}</div>
              )}
              {(index + 1) % 2 === 0 && index < messages.length - 1 && (
                <hr className="message-separator" />
              )}
            </div>
          ))}
          <div ref={bottomRef}></div>
        </div>

        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <div className="chat-input-with-button">
              <textarea
                id="chat"
                className="chat-input"
                placeholder="How can I help you today?"
                value={currentMessage}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                rows={1}
              />
              <button
                type="button"
                className="icon-button-enter-chat"
                disabled={currentMessage.trim() === "" || isWaiting}
                onClick={handleSendMessage}
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Profile />
    </>
  );
}
