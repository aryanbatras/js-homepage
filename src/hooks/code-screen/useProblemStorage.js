
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  saveProblemToStorage, 
  loadProblemFromStorage, 
  hasProblemInStorage,
  getAllStoredProblems,
  sanitizeProblemTitle 
} from '../../utils/storage/problemStorage';

export function useProblemStorage(selectedProblem, files) {
  const [storageStatus, setStorageStatus] = useState({
    isSaving: false,
    isLoading: false,
    lastSaved: null,
    hasStoredVersion: false
  });
  
  const [allStoredProblems, setAllStoredProblems] = useState([]);
  const saveTimeoutRef = useRef(null);

  // Check if problem has stored version
  useEffect(() => {
    if (selectedProblem) {
      const hasStored = hasProblemInStorage(selectedProblem.title);
      setStorageStatus(prev => ({ ...prev, hasStoredVersion: hasStored }));
    }
  }, [selectedProblem]);

  // Load all stored problems for overview
  useEffect(() => {
    const problems = getAllStoredProblems();
    setAllStoredProblems(problems);
  }, []);

  // Auto-save to localStorage with debouncing
  const autoSave = useCallback(() => {
    if (!selectedProblem || !files.length) return;

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout for auto-save (2 seconds delay)
    saveTimeoutRef.current = setTimeout(() => {
      setStorageStatus(prev => ({ ...prev, isSaving: true }));
      
      const success = saveProblemToStorage(selectedProblem.title, files, {
        autoSave: true,
        fileCount: files.length
      });

      if (success) {
        setStorageStatus(prev => ({
          ...prev,
          isSaving: false,
          lastSaved: new Date()
        }));
        
        // Update the stored problems list
        setAllStoredProblems(getAllStoredProblems());
      } else {
        setStorageStatus(prev => ({ ...prev, isSaving: false }));
      }
    }, 2000);
  }, [selectedProblem, files]);

  // Manual save
  const saveProblem = useCallback(() => {
    if (!selectedProblem || !files.length) return false;

    setStorageStatus(prev => ({ ...prev, isSaving: true }));
    
    const success = saveProblemToStorage(selectedProblem.title, files, {
      manualSave: true,
      fileCount: files.length
    });

    if (success) {
      setStorageStatus(prev => ({
        ...prev,
        isSaving: false,
        lastSaved: new Date()
      }));
      
      // Update the stored problems list
      setAllStoredProblems(getAllStoredProblems());
    } else {
      setStorageStatus(prev => ({ ...prev, isSaving: false }));
    }

    return success;
  }, [selectedProblem, files]);

  // Load problem from storage
  const loadProblem = useCallback(() => {
    if (!selectedProblem) return null;

    setStorageStatus(prev => ({ ...prev, isLoading: true }));
    
    const problemData = loadProblemFromStorage(selectedProblem.title);
    
    setStorageStatus(prev => ({
      ...prev,
      isLoading: false,
      hasStoredVersion: !!problemData
    }));

    return problemData;
  }, [selectedProblem]);

  // Check if current files differ from stored version
  const hasUnsavedChanges = useCallback(() => {
    if (!selectedProblem) return false;
    
    const storedData = loadProblemFromStorage(selectedProblem.title);
    if (!storedData) return true; // No stored version means current is unsaved

    // Compare file contents
    const currentFilesMap = new Map(files.map(f => [f.name, f.content]));
    const storedFilesMap = new Map(storedData.files.map(f => [f.name, f.content]));

    // Check if any files differ
    for (const [name, content] of currentFilesMap) {
      if (storedFilesMap.get(name) !== content) return true;
    }

    // Check if any stored files are missing in current
    for (const [name] of storedFilesMap) {
      if (!currentFilesMap.has(name)) return true;
    }

    return false;
  }, [selectedProblem, files]);

  // Get problem metadata
  const getProblemMetadata = useCallback(() => {
    if (!selectedProblem) return null;
    
    const storedData = loadProblemFromStorage(selectedProblem.title);
    return storedData?.metadata || null;
  }, [selectedProblem]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    // Status
    storageStatus,
    allStoredProblems,
    hasUnsavedChanges: hasUnsavedChanges(),
    
    // Actions
    autoSave,
    saveProblem,
    loadProblem,
    getProblemMetadata,
    
    // Computed
    problemTitle: selectedProblem?.title ? sanitizeProblemTitle(selectedProblem.title) : null,
    hasStoredVersion: storageStatus.hasStoredVersion
  };
}
