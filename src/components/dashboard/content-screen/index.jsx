import styles from "./index.module.sass";
import ProblemList from "./problemList";
export default function DashboardContent({
  screenResizer,
  selectedProblemIndex,
  setSelectedProblemIndex,
  selectedCategory,
  setSelectedCategory,
  onToggleProblemsPanel,
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
        />
      </div>
    </div>
  );
}
