import styles from "./index.module.sass";
import ProblemList from "./problemList";
export default function DashboardContent({
  screenResizer,
  selectedProblemIndex,
  setSelectedProblemIndex,
  selectedCategory,
  setSelectedCategory,
  onToggleProblemsPanel,
  problemType,
  setProblemType
}) {
  return (
    <div className={styles.container} style={{ width: `${screenResizer}%` }}>
      <div className={styles.content}>
        <ProblemList
          selectedProblemIndex={selectedProblemIndex}
          setSelectedProblemIndex={setSelectedProblemIndex}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onToggleProblemsPanel={onToggleProblemsPanel}
          problemType={problemType}
          setProblemType={setProblemType}
        />
      </div>
    </div>
  );
}
