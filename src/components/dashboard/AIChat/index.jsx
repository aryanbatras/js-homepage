import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import styles from './styles.module.sass';
import aiService from '../../../services/aiService';

export default function AIChat({ isVisible, onClose, activeFile }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const codeContext = activeFile?.content ? 
        `File: ${activeFile.name}\nLanguage: ${activeFile.language || 'javascript'}\n\n${activeFile.content.substring(0, 2000)}` : 
        '';

      const result = await aiService.sendMessage(input, codeContext);
      
      if (result.error) {
        const errorMessage = { 
          role: 'assistant', 
          text: result.error,
          isError: true 
        };
        setMessages(prev => [...prev, errorMessage]);
      } else {
        const aiMessage = { 
          role: 'assistant', 
          text: result.response,
          responseTime: result.responseTime 
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      const errorMessage = { 
        role: 'assistant', 
        text: `Sorry, I encountered an error: ${error.message}`,
        isError: true 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.chat}>
        <div className={styles.header}>
          <div className={styles.title}>
            <FaRobot />
            <span>AI Assistant</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.messages}>
          {messages.length === 0 ? (
            <div className={styles.welcome}>
              <h3>Hello! I'm your AI coding assistant.</h3>
              <p>Ask me anything about your code. I can see your current file and help with:</p>
              <ul>
                <li>Code explanation</li>
                <li>Bug fixing</li>
                <li>Code optimization</li>
                <li>Best practices</li>
              </ul>
              <p><strong>🚀 Now powered by Cloudflare Workers backend!</strong></p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`${styles.message} ${styles[msg.role]} ${msg.isError ? styles.error : ''}`}>
                <div className={styles.text}>{msg.text}</div>
                {msg.responseTime && (
                  <div className={styles.meta}>
                    <span className={styles.responseTime}>{msg.responseTime}ms</span>
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className={`${styles.message} ${styles.assistant}`}>
              <div className={styles.typing}>Thinking...</div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.input}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your code..."
            disabled={isLoading}
          />
          <button 
            className={styles.sendBtn} 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
}
