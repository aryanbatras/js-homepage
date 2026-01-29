import { useState, useEffect } from "react";
import styles from "./index.module.sass";
import { IoLogoJavascript, IoShuffle } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiMenuFries } from "react-icons/ci";
import { FaPlay, FaStopwatch, FaUser, FaRobot } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { VscPreview } from "react-icons/vsc";
import { VscRunCoverage } from "react-icons/vsc";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettings } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import GitHubSync from "../GitHubSync";
import Search from "../Search";
import { Link } from "react-router-dom";
import UserProfile from "../UserProfile";
import { useAuth } from "../../../contexts/AuthContext";

export default function DashboardNavbar({
  isProblemsPanelOpen,
  onToggleProblemsPanel,
  goToPreviousProblem,
  goToNextProblem,
  shuffleProblems,
  files,
  onFilesUpdated,
  onFilesFromGitHub,
  selectedProblem,
  hasStoredVersion,
  isTimerVisible,
  onToggleTimer,
  setSelectedCategory,
  setSelectedProblemIndex,
  isAIChatVisible,
  onToggleAIChatbot,
  onSearchProblemSelect,
}) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();

  const handleRun = () => {
    window.dispatchEvent(new CustomEvent("runCode"));
  };

  const togglePreview = () => {
    window.dispatchEvent(new CustomEvent("togglePreview"));
  };

  const toggleDebugMode = () => {
    window.dispatchEvent(new CustomEvent("toggleDebug"));
  };

  const toggleNotesPanel = () => {
    // Create and open index.md file
    if(!isProblemsPanelOpen) {
      onToggleProblemsPanel();
    }
    window.dispatchEvent(new CustomEvent("createNotesFile"));
  };

  const navigateToDashboard = () => {
    window.location.href = "/js-homepage/dashboard";
  };

  const toggleSettingsModal = () => {
    setSelectedCategory(null);
    if(!isProblemsPanelOpen) {
      onToggleProblemsPanel();
    }
    // alert("Settings & Customizations are only available in the paid plan.");
  };

  const toggleTimer = () => {
    onToggleTimer();
    window.dispatchEvent(
      new CustomEvent("toggleTimer", {
        detail: { isTimerVisible: !isTimerVisible },
      }),
    );
  };

  const toggleAIChatbot = () => {
    // console.log('AI Chatbot button clicked!');
    onToggleAIChatbot();
  };

  const toggleProfile = () => {
    // Only show profile for authenticated users (not guests)
    if (user && !user.isGuest) {
      setIsProfileVisible(!isProfileVisible);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    if (!isProblemsPanelOpen) {
      onToggleProblemsPanel();
    }
  };

  const handleProblemSelect = (categoryId, problemIndex) => {
    onSearchProblemSelect(categoryId, problemIndex);
  };

  // Listen for global search shortcut
  useEffect(() => {
    const handleOpenSearch = () => {
      setIsSearchOpen(true);
    };

    window.addEventListener('openSearch', handleOpenSearch);
    return () => window.removeEventListener('openSearch', handleOpenSearch);
  }, []);

  const handleMobileMenuAction = (action) => {
    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
    action();
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" style={{ textDecoration: "none", color: "darkorange" }}>
          <IoLogoJavascript className={styles.icon__large} />
        </Link>
        
        <div className={styles.mobileMenuToggle} onClick={toggleMobileMenu}>
          <CiMenuFries />
        </div>
        
        <div className={`${styles.navSections} ${isMobileMenuOpen ? styles.mobileMenuOpen : styles.mobileMenuClosed}`}>
          <div className={styles.section}>
            <div className={styles.searchContainer} onClick={() => handleMobileMenuAction(toggleSearch)}>
              <FaSearch className={styles.searchIcon} />
              <span className={styles.searchText}>Search categories...</span>
              <span className={styles.searchShortcut}>Ctrl+K</span>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(onToggleProblemsPanel)}>
              <CiMenuFries />
              <div className={styles.icon__overlay}>Problems Panel</div>
            </div>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(goToPreviousProblem)}>
              <MdKeyboardArrowLeft />
              <div className={styles.icon__overlay}>Previous Problem</div>
            </div>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(goToNextProblem)}>
              <MdKeyboardArrowRight />
              <div className={styles.icon__overlay}>Next Problem</div>
            </div>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(shuffleProblems)}>
              <IoShuffle />
              <div className={styles.icon__overlay}>Shuffle</div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(handleRun)}>
              <VscRunCoverage />
              <div className={styles.icon__overlay}>Run</div>
            </div>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(togglePreview)}>
              <VscPreview />
              <div className={styles.icon__overlay}>Preview</div>
            </div>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(toggleNotesPanel)}>
              <FaRegNoteSticky />
              <div className={styles.icon__overlay}>Notes</div>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(toggleTimer)}>
              <FaStopwatch />
              <div className={styles.icon__overlay}>Timer</div>
            </div>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(toggleAIChatbot)}>
              <FaRobot />
              <div className={styles.icon__overlay}>AI Assistant</div>
            </div>
            <div className={styles.icon__small} onClick={() => handleMobileMenuAction(toggleSettingsModal)}>
              <IoSettings />
              <div className={styles.icon__overlay}>Settings</div>
            </div>
            {user && !user.isGuest && (
              <div className={styles.icon__small} onClick={() => handleMobileMenuAction(toggleProfile)}>
                <FaUser />
                <div className={styles.icon__overlay}>Profile</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <GitHubSync
          files={files || []}
          onFilesUpdated={onFilesUpdated}
          onFilesFromGitHub={onFilesFromGitHub}
          selectedProblem={selectedProblem}
          hasStoredVersion={hasStoredVersion}
        />
      </div>

      {isProfileVisible && (
        <UserProfile 
          isOpen={isProfileVisible} 
          onClose={() => setIsProfileVisible(false)} 
        />
      )}
      
      <Search 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onCategorySelect={handleCategorySelect}
        onProblemSelect={handleProblemSelect}
      />
    </nav>
  );
}
