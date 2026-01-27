import { useState, useRef, useEffect } from "react";
import { findLanguage, findLanguageContent } from "../../utils/code-screen/languageUtils";
import { DEFAULT_FILES, CONFIG_FILES } from "../../constants/code-screen/fileDefaults";
import { useProblemStorage } from "./useProblemStorage";
import { 
  saveConfigFilesToStorage, 
  loadConfigFilesFromStorage, 
  hasConfigFilesInStorage 
} from "../../utils/storage/problemStorage";

export function useFileManagement(selectedProblem, onFilesUpdated) {
  const inputRef = useRef(0);
  const [fileName, setFileName] = useState("index.js");
  const [files, setFiles] = useState(CONFIG_FILES);
  const [addFile, setAddFile] = useState(false);
  const [externalFiles, setExternalFiles] = useState(null); // Files from parent (GitHub pull)

  // Problem storage hook
  const {
    autoSave,
    saveProblem,
    loadProblem,
    hasStoredVersion,
    storageStatus
  } = useProblemStorage(selectedProblem, files);

  // Function to set files from external source (GitHub pull)
  const setFilesFromExternal = (externalFiles) => {
    setExternalFiles(externalFiles);
    setFiles(externalFiles);
    // Also save to localStorage to keep them in sync
    if (selectedProblem) {
      saveProblem(externalFiles);
    } else {
      // Save config files to local storage if no problem is selected
      saveConfigFilesToStorage(externalFiles);
    }
  };

  // Load problem files when selected problem changes
  useEffect(() => {
    if (selectedProblem) {
      // Only load from localStorage if we don't have external files
      if (!externalFiles) {
        const storedProblem = loadProblem();
        if (storedProblem && storedProblem.files.length > 0) {
          const problemFiles = storedProblem.files.map((file, index) => ({
            name: file.name,
            language: file.language,
            content: file.content,
            active: index === 0,
            default: false,
          }));
          setFiles(problemFiles);
        } else {
          // Load from problem data (default)
          const problemFiles = selectedProblem.files.map((file, index) => ({
            name: file.name,
            language: findLanguage(file.name),
            content: file.code,
            active: index === 0,
            default: false,
          }));
          
          // Add tests.js file if tests exist
          if (selectedProblem.tests && Array.isArray(selectedProblem.tests) && selectedProblem.tests.length > 0) {
            try {
              // Simply join all test codes together
              const testsContent = selectedProblem.tests.map(test => test.code || '').filter(code => code.trim()).join('\n\n');
              
              if (testsContent.trim()) {
                problemFiles.push({
                  name: 'tests.js',
                  language: 'javascript',
                  content: testsContent,
                  active: false,
                  default: false,
                });
              }
            } catch (error) {
              console.error('Error creating tests.js file:', error);
              // Don't break the file loading process
            }
          }
          
          setFiles(problemFiles);
        }
      }
    } else {
      // Load configuration files from local storage when no problem is selected
      const storedConfigFiles = loadConfigFilesFromStorage();
      if (storedConfigFiles) {
        setFiles(storedConfigFiles);
      } else {
        // Fallback to default config files if nothing is stored
        setFiles(CONFIG_FILES);
        saveConfigFilesToStorage(CONFIG_FILES);
      }
      setExternalFiles(null);
    }
  }, [selectedProblem, loadProblem]);

  // Notify parent when files change
  useEffect(() => {
    if (onFilesUpdated) {
      onFilesUpdated(files);
    }
  }, [files, onFilesUpdated]);

  // Auto-save config files to local storage when modified (only when no problem selected)
  useEffect(() => {
    if (!selectedProblem && files.length > 0) {
      // Check if files are config files (have config property or are default config files)
      const hasConfigFiles = files.some(file => 
        file.config || 
        ['snippets.js', 'settings.json', 'package.json', 'README.md'].includes(file.name)
      );
      
      if (hasConfigFiles) {
        saveConfigFilesToStorage(files);
      }
    }
  }, [files, selectedProblem]);

  const activeFile = files.find((file) => file.active);

  const handleAddFile = () => {
    setAddFile(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleAddFileCompleted = () => {
    
    setAddFile(false);

    if (files.some((f) => f.name === fileName)) {
      alert(`File "${fileName}" already exists!`);
      return;
    }
    
    // Prevent duplicate HTML files
    if (fileName.endsWith('.html') && files.some((f) => f.name.endsWith('.html'))) {
      alert('HTML file already exists! Only one HTML file is allowed.');
      return;
    }
    
    // Prevent duplicate CSS files
    if (fileName.endsWith('.css') && files.some((f) => f.name.endsWith('.css'))) {
      alert('CSS file already exists! Only one CSS file is allowed.');
      return;
    }
    
    // Prevent duplicate JSX files
    if (fileName.endsWith('.jsx') && files.some((f) => f.name.endsWith('.jsx'))) {
      alert('JSX file already exists! Only one JSX file is allowed.');
      return;
    }
    
    const newFile = {
      name: fileName,
      language: findLanguage(fileName),
      content: findLanguageContent(fileName),
      active: true,
      default: false,
    };
    const updatedFiles = files.map((file) => ({ ...file, active: false }));
    setFiles([...updatedFiles, newFile]);
  };

  const handleFileClick = (clickedFileName) => {
    setFiles((prev) =>
      prev.map((f) => ({
        ...f,
        active: f.name === clickedFileName,
      })),
    );
  };

  const handleContentChange = (newValue) => {
    setFiles((prev) =>
      prev.map((file) => (file.active ? { ...file, content: newValue } : file)),
    );
    
    // If tests.js file is being updated, sync it back to the problem's tests array
    const activeFileObj = files.find((file) => file.active);
    if (activeFileObj && activeFileObj.name === 'tests.js' && selectedProblem) {
      updateTestsFromContent(newValue);
    }
    
    // Trigger auto-save when content changes
    if (selectedProblem) {
      autoSave();
    }
  };

  // Function to update problem's tests array from tests.js content
  const updateTestsFromContent = (testsContent) => {
    if (!selectedProblem) return;
    
    try {
      // Initialize tests array if it doesn't exist
      if (!selectedProblem.tests) {
        selectedProblem.tests = [];
      }
      
      // Simple conversion: treat entire content as one test
      if (testsContent.trim()) {
        selectedProblem.tests = [{
          test: 'tests.js',
          code: testsContent.trim()
        }];
      } else {
        // Clear tests if content is empty
        selectedProblem.tests = [];
      }
    } catch (error) {
      console.error('Error updating tests from content:', error);
      // Don't break the flow if parsing fails
    }
  };

  // Function to check if a file is a core executable file from the original problem data
  const isCoreExecutableFile = (fileName) => {
    if (!selectedProblem || !selectedProblem.files) return false;
    
    return selectedProblem.files.some(coreFile => coreFile.name === fileName);
  };

  const handleDeleteFile = (fileName) => {
    // Prevent deletion of core files (main executable files and tests.js)
    const isCoreFile = isCoreExecutableFile(fileName) || fileName === 'tests.js';
    
    // Prevent deletion of configuration files
    const configFiles = ['snippets.js', 'settings.json', 'package.json', 'README.md'];
    const isConfigFile = configFiles.includes(fileName);
    
    if (isCoreFile) {
      alert(`Cannot delete core file "${fileName}". Core files cannot be deleted.`);
      return;
    }
    
    if (isConfigFile) {
      alert(`Cannot delete configuration file "${fileName}". Configuration files cannot be deleted.`);
      return;
    }
    
    const fileToDelete = files.find((file) => file.name === fileName);
    const wasActive = fileToDelete?.active;
    const updatedFiles = files.filter((file) => file.name !== fileName);
    if (wasActive && updatedFiles.length > 0) {
      updatedFiles[0].active = true;
    }
    setFiles(updatedFiles);
  };

  const handleCreateNotesFile = () => {
    const existingNotesFile = files.find((f) => f.name === "index.md");
    if (existingNotesFile) {
      handleFileClick("index.md");
    } else {
      const newFile = {
        name: "index.md",
        language: findLanguage("index.md"),
        content: findLanguageContent("index.md"),
        active: true,
        default: false,
      };
      const updatedFiles = files.map((file) => ({ ...file, active: false }));
      setFiles([...updatedFiles, newFile]);
    }
  };

  return {
    inputRef,
    fileName,
    setFileName,
    files,
    setFiles,
    addFile,
    setAddFile,
    activeFile,
    handleAddFile,
    handleAddFileCompleted,
    handleFileClick,
    handleContentChange,
    handleDeleteFile,
    handleCreateNotesFile,
    setFilesFromExternal,
    saveProblem,
    hasStoredVersion,
    storageStatus,
  };
}
