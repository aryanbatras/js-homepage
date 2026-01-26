import styles from "./index.module.sass";
import ProblemPage from "../problemPage";
import CategorySelector from "../categorySelector";
import { problemsByCategory } from "../store/categories";

export default function ProblemList({ 
  selectedProblemIndex, 
  setSelectedProblemIndex,
  selectedCategory,
  setSelectedCategory,
  onToggleProblemsPanel,
  problemType, 
  setProblemType
}) {
  const currentCategoryData = selectedCategory ? problemsByCategory[selectedCategory] || [] : [];
  return (
    <div className={styles.container}>
      <div className={styles.problems}>
        {selectedProblemIndex === null ? (
          selectedCategory === null ? (
            <CategorySelector onCategorySelect={setSelectedCategory} problemType={problemType} setProblemType={setProblemType} />
          ) : (
            <>
              <div className={styles.categoryHeader}>
                <button 
                  className={styles.backButton}
                  onClick={() => setSelectedCategory(null)}
                >
                  ← Back to Categories
                </button>
                <h2 className={styles.categoryTitle}>
                  {selectedCategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h2>
              </div>
              {currentCategoryData.map((item, index) => (
                Problem(index, item)
              ))}
            </>
          )
        ) : (
          <ProblemPage 
            selectProblem={currentCategoryData[selectedProblemIndex]} 
            setSelectProblem={() => setSelectedProblemIndex(null)}
            selectedProblemIndex={selectedProblemIndex}
            setSelectedProblemIndex={setSelectedProblemIndex}
            onToggleProblemsPanel={onToggleProblemsPanel}
            data={currentCategoryData}
          />
        )}
      </div>
    </div>
  );

  function Problem(index, item) {
    return <div key={index} className={styles.problem} onClick={() => {setSelectedProblemIndex(index); onToggleProblemsPanel();}}>
      <h1 className={styles.title}>{item?.title}</h1>
      <p className={styles.description}>{item?.description}</p>
    </div>;
  }
}

