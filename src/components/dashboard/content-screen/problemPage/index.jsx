import styles from "./index.module.sass";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";
import Navbar from "../navbar";
import CommentSection from "../../../discussion/CommentSection";
import SubmissionSection from "../../../discussion/SubmissionSection";
export default function ProblemPage({ 
  selectProblem, 
  setSelectProblem, 
  selectedProblemIndex, 
  setSelectedProblemIndex,
  onToggleProblemsPanel,
  data 
}) {
  const [navbarOption, setNavbarOption] = useState("description");
  
  const goToPreviousProblem = () => {
    const newIndex = selectedProblemIndex - 1;
    if (newIndex >= 0) {
      setSelectedProblemIndex(newIndex);
    } else {
      setSelectedProblemIndex(null);
    }
  };

  const goToNextProblem = () => {
    const newIndex = selectedProblemIndex + 1;
    if (newIndex < data.length) {
      setSelectedProblemIndex(newIndex);
    } else {
      setSelectedProblemIndex(null);
    }
  };
  return (
    <div className={styles.container}>
      <Navbar setNavbarOption={setNavbarOption} currentOption={navbarOption} />
      <button className={styles.button} onClick={() => {setSelectedProblemIndex(null); onToggleProblemsPanel();}}>
        <MdOutlineArrowBackIosNew />
        <span>Back to Problems</span>
      </button>
      <h1 className={styles.title}>{selectProblem?.title}</h1>

      {navbarOption === "description" && (
        <>
          <p className={styles.description}>{selectProblem?.description}</p>
          <CodeExamples />
          <Hint />
        </>
      )}

      {navbarOption === "editorial" && <Editorial />}

      {navbarOption === "solution" && <Solution />}

      {navbarOption === "submissions" && (
        <SubmissionSection problemId={selectProblem?.id || selectProblem?.title} />
      )}

      {navbarOption === "discussion" && (
        <CommentSection problemId={selectProblem?.id || selectProblem?.title} />
      )}
    </div>
  );

  function CodeExamples() {
    return (
      <div className={styles.code_examples}>
        {selectProblem?.code_examples.map((item, index) => (
          <div key={index}>
            <p>{item?.example}</p>
            <p>{item?.code}</p>
          </div>
        ))}
      </div>
    );
  }

  function Hint() {
    const [showHints, setShowHints] = useState({});
    const toggleHint = (index) =>
      setShowHints({ ...showHints, [index]: !showHints[index] });
    return (
      <div className={styles.hints}>
        {selectProblem?.hints.map((item, index) => (
          <div
            key={index}
            className={styles.hint}
            onClick={() => toggleHint(index)}
          >
            <span>Hint {index + 1}</span>
            <p style={{ display: showHints[index] ? "block" : "none" }}>
              {item?.hint}
            </p>
          </div>
        ))}
      </div>
    );
  }

  function Editorial() {
    return <div className={styles.editorial}>editorial</div>;
  }

  function Solution() {
    const [copiedIndex, setCopiedIndex] = useState(null);

    const copyToClipboard = async (code, index) => {
      try {
        await navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (err) {
        console.error('Failed to copy code:', err);
      }
    };

    return (
      <div className={styles.solution}>
        {selectProblem?.solution.map((item, index) => (
          <div key={index} className={styles.approach}>
            <div className={styles.approachHeader}>
              <h3>{item?.approach}</h3>
              <button
                className={styles.copyButton}
                onClick={() => copyToClipboard(item?.code, index)}
                title="Copy code"
              >
                {copiedIndex === index ? <FiCheck /> : <FiCopy />}
              </button>
            </div>
            <div className={styles.codeContainer}>
              <SyntaxHighlighter
                language="javascript"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: '1.5rem',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  background: '#1e1e1e',
                  borderRadius: '8px',
                  fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace"
                }}
                showLineNumbers
                wrapLines
                lineProps={(lineNumber) => ({
                  style: {
                    display: 'block',
                    paddingLeft: '0.5rem'
                  }
                })}
              >
                {item?.code}
              </SyntaxHighlighter>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
