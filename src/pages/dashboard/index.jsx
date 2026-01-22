import styles from "./index.module.sass";
import DashboardNavbar from "../../components/dashboard/navbar";
import DashboardContent from "../../components/dashboard/content-screen";
import DashboardCodeScreen from "../../components/dashboard/code-screen";
import { useScreenResizer } from "../../hooks/dashboard/useScreenResizer";
import { CiMenuKebab } from "react-icons/ci";
import { useState, useEffect } from "react";
import { data } from "../../components/dashboard/content-screen/store/data";

export default function Dashboard() {
  const { screenResizer, setScreenResizer, setIsDragging } = useScreenResizer();
  const [isProblemsPanelOpen, setIsProblemsPanelOpen] = useState(true);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [files, setFiles] = useState([]);
  const [githubFiles, setGithubFiles] = useState(null); // Files from GitHub pull
  const [hasStoredVersion, setHasStoredVersion] = useState(false);

  const toggleProblemsPanel = () => {
    setIsProblemsPanelOpen(!isProblemsPanelOpen);
    setScreenResizer(isProblemsPanelOpen ? 0 : 30);
  };

  const goToPreviousProblem = () => {
    if (selectedProblemIndex === null) {
      setSelectedProblemIndex(data.length - 1);
    } else {
      const newIndex = selectedProblemIndex - 1;
      setSelectedProblemIndex(newIndex >= 0 ? newIndex : null);
    }
  };

  const goToNextProblem = () => {
    if (selectedProblemIndex === null) {
      setSelectedProblemIndex(0);
    } else {
      const newIndex = selectedProblemIndex + 1;
      setSelectedProblemIndex(newIndex < data.length ? newIndex : null);
    }
  };

  const shuffleProblems = () => {
    const randomIndex = Math.floor(Math.random() * data.length);
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

  // Update selectedProblem when index changes
  useEffect(() => {
    if (selectedProblemIndex !== null && data[selectedProblemIndex]) {
      setSelectedProblem(data[selectedProblemIndex]);
      setGithubFiles(null); // Reset GitHub files when problem changes
    } else {
      setSelectedProblem(null);
      setGithubFiles(null); // Reset GitHub files when no problem
    }
  }, [selectedProblemIndex]);

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
      />
      <div className={styles.container}>
        <DashboardContent 
          screenResizer={screenResizer}
          selectedProblemIndex={selectedProblemIndex}
          setSelectedProblemIndex={setSelectedProblemIndex}
        />
        <ScreenResizer />
        <DashboardCodeScreen 
          screenResizer={100 - screenResizer} 
          selectedProblem={selectedProblemIndex !== null ? data[selectedProblemIndex] : null}
          onHasStoredVersionChange={handleHasStoredVersionChange}
          onFilesUpdated={handleFilesUpdated}
          onFilesFromGitHub={handleFilesFromGitHub}
          githubFiles={githubFiles}
        />
      </div>
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
