import styles from "./index.module.sass";
import DashboardNavbar from "../../components/dashboard/navbar";
import DashboardContent from "../../components/dashboard/content-screen";
import DashboardCodeScreen from "../../components/dashboard/code-screen";
import Timer from "../../components/dashboard/Timer";
import { useScreenResizer } from "../../hooks/dashboard/useScreenResizer";
import { CiMenuKebab } from "react-icons/ci";
import { useState, useEffect } from "react";
import { problemsByCategory } from "../../components/dashboard/content-screen/store/categories";

export default function Dashboard() {
  const { screenResizer, setScreenResizer, setIsDragging } = useScreenResizer();
  const [isProblemsPanelOpen, setIsProblemsPanelOpen] = useState(false);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [files, setFiles] = useState([]);
  const [githubFiles, setGithubFiles] = useState(null); // Files from GitHub pull
  const [hasStoredVersion, setHasStoredVersion] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const toggleProblemsPanel = () => {
    setIsProblemsPanelOpen(!isProblemsPanelOpen);
    setScreenResizer(isProblemsPanelOpen ? 100 : 30);
  };

  const goToPreviousProblem = () => {
    if (!selectedCategory) return;
    
    const categoryData = problemsByCategory[selectedCategory] || [];
    if (selectedProblemIndex === null) {
      setSelectedProblemIndex(categoryData.length - 1);
    } else {
      const newIndex = selectedProblemIndex - 1;
      setSelectedProblemIndex(newIndex >= 0 ? newIndex : null);
    }
  };

  const goToNextProblem = () => {
    if (!selectedCategory) return;
    
    const categoryData = problemsByCategory[selectedCategory] || [];
    if (selectedProblemIndex === null) {
      setSelectedProblemIndex(0);
    } else {
      const newIndex = selectedProblemIndex + 1;
      setSelectedProblemIndex(newIndex < categoryData.length ? newIndex : null);
    }
  };

  const shuffleProblems = () => {
    if (!selectedCategory) return;
    
    const categoryData = problemsByCategory[selectedCategory] || [];
    const randomIndex = Math.floor(Math.random() * categoryData.length);
    setSelectedProblemIndex(randomIndex);
  };

  const handleFilesUpdated = (updatedFiles) => {
    setFiles(updatedFiles);
    console.log('Files updated in Dashboard:', updatedFiles);
  };

  const handleFilesFromGitHub = (pulledFiles) => {
    setFiles(pulledFiles);
    setGithubFiles(pulledFiles); // Store GitHub files to pass to code screen
    console.log('Files pulled from GitHub:', pulledFiles);
  };

  const handleHasStoredVersionChange = (hasStored) => {
    setHasStoredVersion(hasStored);
  };

  const toggleTimer = () => {
    setIsTimerVisible(!isTimerVisible);
  };

  // Update selectedProblem when index or category changes
  useEffect(() => {
    setSelectedProblemIndex(null); // Reset problem index when category changes
    setSelectedProblem(null);
    setGithubFiles(null); // Reset GitHub files when category changes
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedProblemIndex !== null && selectedCategory) {
      const categoryData = problemsByCategory[selectedCategory] || [];
      if (categoryData[selectedProblemIndex]) {
        setSelectedProblem(categoryData[selectedProblemIndex]);
        setGithubFiles(null); // Reset GitHub files when problem changes
      }
    } else {
      setSelectedProblem(null);
      setGithubFiles(null); // Reset GitHub files when no problem
    }
  }, [selectedProblemIndex, selectedCategory]);

  return (
    <div className={styles.dashboard}>
      <DashboardNavbar 
        isProblemsPanelOpen={isProblemsPanelOpen}
        onToggleProblemsPanel={toggleProblemsPanel}
        goToPreviousProblem={goToPreviousProblem}
        goToNextProblem={goToNextProblem}
        shuffleProblems={shuffleProblems}
        files={files}
        onFilesUpdated={handleFilesUpdated}
        onFilesFromGitHub={handleFilesFromGitHub}
        selectedProblem={selectedProblem}
        hasStoredVersion={hasStoredVersion}
        isTimerVisible={isTimerVisible}
        onToggleTimer={toggleTimer}
      />
      <div className={styles.container}>
        <DashboardContent 
          screenResizer={screenResizer}
          selectedProblemIndex={selectedProblemIndex}
          setSelectedProblemIndex={setSelectedProblemIndex}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onToggleProblemsPanel={toggleProblemsPanel}
        />
        <ScreenResizer />
        <DashboardCodeScreen 
          screenResizer={100 - screenResizer} 
          selectedProblem={selectedProblem}
          onHasStoredVersionChange={handleHasStoredVersionChange}
          onFilesUpdated={handleFilesUpdated}
          onFilesFromGitHub={handleFilesFromGitHub}
          githubFiles={githubFiles}
        />
      </div>
      <Timer isVisible={isTimerVisible} onClose={() => setIsTimerVisible(false)} />
    </div>
  );

  function ScreenResizer() {
    return <div
      className={styles.screenResizer}
      onMouseDown={(e) => setIsDragging(true)}
    >
      <CiMenuKebab />
    </div>;
  }
}
