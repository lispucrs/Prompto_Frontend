import SideBarHeader from "../../components/SideBarHeader/SideBarHeader";
import Profile from "../../components/Profile/Profile";
import "./Chat.scss";
import { FaArrowUp, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { sendMessageToBackend } from "../../services/chatService";
import { useCallback } from "react";

type Message = {
  text: string;
  sender: "user" | "bot" | "bot-loading";
};

export default function Chat() {
  const location = useLocation();
  const { selectedProject } = location.state || {};
  const projectId = selectedProject?.id || null;

  console.log("Received project:", selectedProject);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handlePromptClick = (prompt: string) => {
    setCurrentMessage(prompt);
  };

  // Estados relacionados ao chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [haveText, setHaveText] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [stoppedStep, setStoppedStep] = useState<number | null>(null); // Estado para o idStopedStep

  const handleProjectSelect = ({
    projectId,
    idStopedStep,
  }: {
    projectId: number;
    idStopedStep: number;
  }) => {
    setMessages([]); // Reinicia as mensagens ao selecionar um novo projeto
    setHaveText(false);
    setStoppedStep(idStopedStep); // Salva o idStopedStep no estado, se necessário
  };
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async () => {
    if (currentMessage.trim() === "" || isWaiting || !projectId) return;

    setMessages((prev) => [...prev, { text: currentMessage, sender: "user" }]);
    setHaveText(true);
    setIsWaiting(true);
    setCurrentMessage("");

    setMessages((prev) =>
      prev
        .filter((msg) => msg.sender !== "bot-loading")
        .concat({ text: "", sender: "bot-loading" })
    );

    try {
      const botResponse = await sendMessageToBackend(projectId, currentMessage);
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const promptsLeft = [
    "Create a new project!",
    "How can I distribute tasks to my team?",
    "Create user stories to base my new project!",
  ];
  const promptsRight = [
    "Define the requirements for my project.",
    "Generate RoadMap for my project",
    "Make some user stories for my project!",
  ];
  console.log("selectedProject.id", selectedProject.id);

  console.log("stoppedStep", stoppedStep);
  useEffect(() => {
    if (selectedProject?.id === -1) {
      setStoppedStep(0);
      setMessages([]);
    }
  }, [stoppedStep, selectedProject?.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <>
      <SideBarHeader onProjectSelect={handleProjectSelect} />
      <div className="chat-container">
        <div className="chat-title">{selectedProject?.name || "None"}</div>

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
