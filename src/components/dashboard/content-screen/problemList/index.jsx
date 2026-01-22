import { useState } from "react";
import styles from "./index.module.sass";
import ProblemPage from "../problemPage";
import Navbar from "../navbar";
export default function ProblemList({ data, selectedProblemIndex, setSelectedProblemIndex }) {
  return (
    <div className={styles.container}>
      <div className={styles.problems}>
        {selectedProblemIndex === null ? (
          data.map((item, index) => (
            Problem(index, item)
          ))
        ) : (
          <ProblemPage 
            selectProblem={data[selectedProblemIndex]} 
            setSelectProblem={() => setSelectedProblemIndex(null)}
            selectedProblemIndex={selectedProblemIndex}
            setSelectedProblemIndex={setSelectedProblemIndex}
            data={data}
          />
        )}
      </div>
    </div>
  );

  function Problem(index, item) {
    return <div key={index} className={styles.problem} onClick={() => setSelectedProblemIndex(index)}>
      <h1 className={styles.title}>{item?.title}</h1>
      <p className={styles.description}>{item?.description}</p>
    </div>;
  }
}

