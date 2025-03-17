import { useEffect, useRef, useState } from "react";
import Profile from "../../components/Profile/Profile";
import SideBarHeader from "../../components/SideBarHeader/SideBarHeader";
import { sendMessageToBackendOnboarding } from "../../services/onboardingService";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowUp, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
type Message = {
  text: string;
  sender: "user" | "bot" | "bot-loading";
};

export default function Onboarding() {
  const location = useLocation();
  const { selectedProject } = location.state || {};
  const projectId = selectedProject?.id || null;
  const projectName = selectedProject?.name || "No Project Selected";
  console.log("selectedProject", selectedProject);
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  const handlePromptClick = (prompt: string) => {
    setCurrentMessage(prompt);
  };

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [haveText, setHaveText] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const navigate = useNavigate();

  const handleProjectSelect = (projectId: number) => {
    navigate("/chat", {
      state: { selectedProject: { id: projectId } },
    });
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
      const botResponse = await sendMessageToBackendOnboarding(
        projectId,
        currentMessage
      );
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
    "What is the objective of the project?",
    "What are the key deliverables of this project?",
    "What milestones should I consider for my project?",
  ];
  const promptsRight = [
    "How many people are required for this project?",
    "Explain the roadmap of the project.",
    "Whats the Onboarding of the project?",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <>
      <SideBarHeader onProjectSelect={handleProjectSelect} />
      <div className="chat-container">
        <div className="chat-title">{projectName || "None"}</div>

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
