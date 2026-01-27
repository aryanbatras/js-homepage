import { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";
import { TbRobot } from "react-icons/tb";
import { RiRobot3Fill } from "react-icons/ri";
import styles from "./styles.module.sass";
import aiService from "../../../services/aiService";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function AIChat({
  isVisible,
  onClose,
  activeFile,
  width = 400,
  files = [],
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const streamingRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStreaming = () => {
    streamingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const streamText = async (text, onChunk) => {
    const chars = text.split("");
    let currentText = "";

    for (let i = 0; i < chars.length; i++) {
      currentText += chars[i];
      onChunk(currentText);
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isStreaming) {
      scrollToStreaming();
    }
  }, [streamingText, isStreaming]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || isStreaming) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const codeContext = activeFile?.content
        ? `Current File: ${activeFile.name}\nLanguage: ${activeFile.language || "javascript"}\n\n${activeFile.content.substring(0, 5000)}\n\nAll Available Files:\n${files.map((f) => `-${f.name} (${f.language || "javascript"})`).join("\n")}`
        : `All Available Files:\n${files.map((f) => `-${f.name} (${f.language || "javascript"})`).join("\n")}`;

      const result = await aiService.sendMessage(input, codeContext);

      if (result.error) {
        const errorMessage = {
          role: "assistant",
          text: result.error,
          isError: true,
        };
        setMessages((prev) => [...prev, errorMessage]);
      } else {
        setIsStreaming(true);
        setStreamingText("");

        await streamText(result.response, (chunk) => {
          setStreamingText(chunk);
        });

        const aiMessage = {
          role: "assistant",
          text: result.response,
          responseTime: result.responseTime,
        };
        setMessages((prev) => [...prev, aiMessage]);
        setStreamingText("");
        setIsStreaming(false);
      }
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        text: `Sorry, I encountered an error: ${error.message}`,
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.chatPanel} style={{ width: `${width}px` }}>
      <div className={styles.header}>
        <div className={styles.title}>
          {/* <TbRobot /> */}
          <div className={styles.icon}>
            <RiRobot3Fill />
          </div>
          <span>AI Assistant</span>
        </div>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className={styles.messages}>
        {messages.length === 0 && !isStreaming ? (
          <div className={styles.welcome}>
            <div className={styles.welcomeIcon}>
              <TbRobot />
            </div>
            <div className={styles.welcomeHello}>Hello Coder</div>
            <h3>I'm your cute little AI buddy</h3>
            <p>Ask me anything about your code. </p>
            <div className={styles.capabilities}>
              <button 
                className={styles.capability}
                onClick={() => {
                  setInput("Explain this code in detail, including its purpose, key components, and how it works.");
                  // setTimeout(() => handleSend(), 100);
                  handleSend();
                }}
              >
                Code explanation
              </button>
              <button 
                className={styles.capability}
                onClick={() => {
                  setInput("Analyze this code for bugs and potential issues. Identify any problems and suggest fixes.");
                  // setTimeout(() => handleSend(), 100);
                  handleSend();
                }}
              >
                Bug fixing
              </button>
              <button 
                className={styles.capability}
                onClick={() => {
                  setInput("Optimize this code for better performance, readability, and maintainability.");
                  // setTimeout(() => handleSend(), 100);
                  handleSend();
                }}
              >
                Optimization
              </button>
              <button 
                className={styles.capability}
                onClick={() => {
                  setInput("Review this code and suggest improvements based on best practices and coding standards.");
                  // setTimeout(() => handleSend(), 100);
                  handleSend();
                }}
              >
                Best practices
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${styles.message} ${styles[msg.role]} ${msg.isError ? styles.error : ""}`}
              >  
                <div className={styles.text}>
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            className={styles.codeBlock}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={styles.inlineCode} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
                {msg.responseTime && (
                  <div className={styles.meta}>
                    <span className={styles.responseTime}>
                      {msg.responseTime}ms
                    </span>
                  </div>
                )}
              </div>
            ))}
            {isStreaming && (
              <div
                className={`${styles.message} ${styles.assistant} ${styles.streaming}`}
              >
                <div className={styles.text}>
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            className={styles.codeBlock}
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={styles.inlineCode} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {streamingText}
                  </ReactMarkdown>
                </div>
                <div className={styles.cursor}>|</div>
              </div>
            )}
          </>
        )}
        {isLoading && !isStreaming && (
          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.loading}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
        <div ref={streamingRef} />
      </div>

      <div className={styles.input}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask about your code..."
          disabled={isLoading || isStreaming}
        />
        <button
          className={styles.sendBtn}
          onClick={handleSend}
          disabled={!input.trim() || isLoading || isStreaming}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
