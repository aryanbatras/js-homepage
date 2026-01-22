import styles from "./index.module.sass";
import Navbar from "./navbar";
import { data } from "./store/data";
import ProblemList from "./problemList";
import { useState } from "react";
export default function DashboardContent({
  screenResizer,
  selectedProblemIndex,
  setSelectedProblemIndex,
}) {
  return (
    <div className={styles.container} style={{ width: `${screenResizer}%` }}>
      <div className={styles.content}>
        <ProblemList
          data={data}
          selectedProblemIndex={selectedProblemIndex}
          setSelectedProblemIndex={setSelectedProblemIndex}
        />
      </div>
    </div>
  );
}
