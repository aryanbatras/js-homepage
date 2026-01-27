import styles from "./index.module.sass";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useState } from "react";
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
    return (
      <div className={styles.solution}>
        {selectProblem?.solution.map((item, index) => (
          <div key={index} className={styles.approach}>
            <h3>{item?.approach}</h3>
            <pre>{item?.code}</pre>
          </div>
        ))}
      </div>
    );
  }
}
