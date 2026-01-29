import styles from "./index.module.sass";
import DashboardNavbar from "../../components/dashboard/navbar";
import DashboardContent from "../../components/dashboard/content-screen";
import DashboardCodeScreen from "../../components/dashboard/code-screen";
import Timer from "../../components/dashboard/Timer";
import AIChat from "../../components/dashboard/AIChat";
import { useScreenResizer } from "../../hooks/dashboard/useScreenResizer";
import { useAIChatResizer } from "../../hooks/dashboard/useAIChatResizer";
import { CiMenuKebab } from "react-icons/ci";
import { MdOpenWith } from "react-icons/md";
import { useState, useEffect } from "react";
import { problemsByCategory } from "../../components/dashboard/content-screen/store/categories";
// import { useEffect } from "react";
export default function Dashboard() {
  // console.log('🔍 Dashboard component rendering');
  
  const [isProblemsPanelOpen, setIsProblemsPanelOpen] = useState(false);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState(null);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [files, setFiles] = useState([]);
  const [githubFiles, setGithubFiles] = useState(null); 
  const [hasStoredVersion, setHasStoredVersion] = useState(false);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  const [isMobileResizerVisible, setIsMobileResizerVisible] = useState(false);
  const [isAIChatVisible, setIsAIChatVisible] = useState(false);
  const { aiChatWidth, isResizing: isAIChatResizing, startResizing: startAIChatResizing } = useAIChatResizer();
  const { screenResizer, setScreenResizer, setIsDragging } = useScreenResizer(isAIChatVisible, aiChatWidth);
  const [problemType, setProblemType] = useState('console');
  const [isNavigatingFromSearch, setIsNavigatingFromSearch] = useState(false);

  // // console.log('🔍 Dashboard state initialized');
  // console.log('🔍 Dashboard - hooks initialized:', {
  //   aiChatWidth,
  //   isAIChatResizing,
  //   screenResizer
  // });

  const toggleProblemsPanel = () => {
    setIsProblemsPanelOpen(!isProblemsPanelOpen);
    const minWidthForPanel = 768; // Minimum width at which the panel should be visible
    const panelWidth = window.innerWidth >= minWidthForPanel ? (isProblemsPanelOpen ? 100 : 30) : (isProblemsPanelOpen ? 100 : 0);
    setScreenResizer(panelWidth);
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
    // console.log('Files updated in Dashboard:', updatedFiles);
  };

  const handleFilesFromGitHub = (pulledFiles) => {
    setFiles(pulledFiles);
    setGithubFiles(pulledFiles); // Store GitHub files to pass to code screen
    // console.log('Files pulled from GitHub:', pulledFiles);
  };

  const handleHasStoredVersionChange = (hasStored) => {
    setHasStoredVersion(hasStored);
  };

  const toggleTimer = () => {
    setIsTimerVisible(!isTimerVisible);
  };

  const toggleMobileResizer = () => {
    if (isAIChatVisible) {
      setIsAIChatVisible(false);
      return;
    }
    setIsMobileResizerVisible(!isMobileResizerVisible);
    if (!isMobileResizerVisible) {
      setScreenResizer(100);
    } else {
      setScreenResizer(0);
    }
  };

  const toggleAIChat = () => {
    // console.log('toggleAIChat called, current state:', isAIChatVisible);
    setIsAIChatVisible(!isAIChatVisible);
  };

  const handleSearchProblemSelect = (categoryId, problemIndex) => {
    setIsNavigatingFromSearch(true); // Set flag to prevent problem index reset
    setSelectedCategory(categoryId);
    setSelectedProblemIndex(problemIndex);
    if (!isProblemsPanelOpen) {
      toggleProblemsPanel();
    }
  };

  // // Add useEffect to track re-renders
  // useEffect(() => {
  //   // console.log('🔍 Dashboard useEffect - component re-rendered');
  // });

  // Update selectedProblem when index or category changes
  useEffect(() => {
    // console.log('🔍 Dashboard - category changed, resetting problem');
    if (!isNavigatingFromSearch) {
      setSelectedProblemIndex(null); // Reset problem index when category changes, but not from search
    }
    setIsNavigatingFromSearch(false); // Reset the flag
    setSelectedProblem(null);
    // Only reset GitHub files if we're not dealing with configuration files (no problem selected)
    if (selectedProblem) {
      setGithubFiles(null);
    }
  }, [selectedCategory]);

  useEffect(() => {
    // console.log('🔍 Dashboard - problem index changed:', selectedProblemIndex, 'category:', selectedCategory);
    if (selectedProblemIndex !== null && selectedCategory) {
      const categoryData = problemsByCategory[selectedCategory] || [];
      // console.log('🔍 Dashboard - category data length:', categoryData.length);
      if (categoryData[selectedProblemIndex]) {
        const problem = categoryData[selectedProblemIndex];
        // console.log('🔍 Dashboard - setting selected problem:', problem);
        setSelectedProblem(problem);
        setGithubFiles(null); // Reset GitHub files when problem changes
      } else {
        // console.log('🔍 Dashboard - no problem found at index:', selectedProblemIndex);
        setSelectedProblem(null);
        // setGithubFiles(null); // Reset GitHub files when no problem
      }
    } else {
      // console.log('🔍 Dashboard - clearing selected problem');
      setSelectedProblem(null);
      // Don't reset GitHub files here - we might be dealing with configuration files
    }
  }, [selectedProblemIndex, selectedCategory]);

  // Global keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Dispatch custom event to open search
        window.dispatchEvent(new CustomEvent('openSearch'));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
        setSelectedCategory={setSelectedCategory}
        setSelectedProblemIndex={setSelectedProblemIndex}
        isAIChatVisible={isAIChatVisible}
        onToggleAIChatbot={toggleAIChat}
        onSearchProblemSelect={handleSearchProblemSelect}
      />
      <div className={styles.container}>
        <DashboardContent 
          screenResizer={screenResizer}
          selectedProblemIndex={selectedProblemIndex}
          setSelectedProblemIndex={setSelectedProblemIndex}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onToggleProblemsPanel={toggleProblemsPanel}
          problemType={problemType}
          setProblemType={setProblemType}
        />
        <ScreenResizer />
        <DashboardCodeScreen 
          screenResizer={100 - screenResizer} 
          selectedProblem={selectedProblem}
          onHasStoredVersionChange={handleHasStoredVersionChange}
          onFilesUpdated={handleFilesUpdated}
          onFilesFromGitHub={handleFilesFromGitHub}
          githubFiles={githubFiles}
          problemType={problemType}
        /> 
        {isAIChatVisible && (
          <>
            <AIChatResizer />
            <AIChat 
              isVisible={isAIChatVisible} 
              onClose={() => setIsAIChatVisible(false)}
              activeFile={files.find(f => f.active)}
              width={aiChatWidth}
              files={files}
            />
          </>
        )}
      </div>
      {/* Mobile FAB Button */}
      <button 
        className={styles.mobileFab}
        onClick={toggleMobileResizer}
        aria-label="Toggle screen resizer"
      >
        <MdOpenWith />
      </button>
      <Timer isVisible={isTimerVisible} onClose={() => setIsTimerVisible(false)} />
    </div>
  );

  function ScreenResizer() {

    return <div
      className={styles.screenResizer}
      onMouseDown={(e) => setIsDragging(true)}
      onTouchStart={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
    >
      <CiMenuKebab />
    </div>;
  }

  function AIChatResizer() {
    return <div
      className={styles.aiChatResizer}
      onMouseDown={startAIChatResizing}
      onTouchStart={(e) => {
        e.preventDefault();
        startAIChatResizing();
      }}
    />;
  }
}
