// Local storage utilities for problem management

export const STORAGE_KEYS = {
  SOLVED_PROBLEMS: 'solvedProblems',
  PROBLEM_METADATA: 'problemMetadata',
  CONFIG_FILES: 'configFiles'
};

export function sanitizeProblemTitle(title) {
  return title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
}

export function getProblemStorageKey(problemTitle) {
  const sanitizedTitle = sanitizeProblemTitle(problemTitle);
  return `${STORAGE_KEYS.SOLVED_PROBLEMS}/${sanitizedTitle}`;
}

export function saveProblemToStorage(problemTitle, files, metadata = {}) {
  try {
    const storageKey = getProblemStorageKey(problemTitle);
    const problemData = {
      files: files.map(file => ({
        name: file.name,
        content: file.content,
        language: file.language
      })),
      metadata: {
        ...metadata,
        lastModified: new Date().toISOString(),
        problemTitle,
        version: '1.0.0'
      }
    };
    
    localStorage.setItem(storageKey, JSON.stringify(problemData));
    return true;
  } catch (error) {
    return false;
  }
}

export function loadProblemFromStorage(problemTitle) {
  try {
    const storageKey = getProblemStorageKey(problemTitle);
    const stored = localStorage.getItem(storageKey);
    
    if (!stored) return null;
    
    const problemData = JSON.parse(stored);
    return problemData;
  } catch (error) {
    return null;
  }
}

export function deleteProblemFromStorage(problemTitle) {
  try {
    const storageKey = getProblemStorageKey(problemTitle);
    localStorage.removeItem(storageKey);
    return true;
  } catch (error) {
    return false;
  }
}

export function getAllStoredProblems() {
  try {
    const problems = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith(STORAGE_KEYS.SOLVED_PROBLEMS)) {
        try {
          const problemData = JSON.parse(localStorage.getItem(key));
          problems.push({
            title: problemData.metadata.problemTitle,
            lastModified: problemData.metadata.lastModified,
            fileCount: problemData.files.length,
            storageKey: key
          });
        } catch (e) {
        }
      }
    });
    
    return problems.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
  } catch (error) {
    return [];
  }
}

export function hasProblemInStorage(problemTitle) {
  const storageKey = getProblemStorageKey(problemTitle);
  return localStorage.getItem(storageKey) !== null;
}

// Configuration files storage functions
export function saveConfigFilesToStorage(files) {
  try {
    const configData = {
      files: files.map(file => ({
        name: file.name,
        content: file.content,
        language: file.language,
        active: file.active,
        config: file.config || false
      })),
      lastModified: new Date().toISOString(),
      version: '1.0.0'
    };
    
    localStorage.setItem(STORAGE_KEYS.CONFIG_FILES, JSON.stringify(configData));
    return true;
  } catch (error) {
    return false;
  }
}

export function loadConfigFilesFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CONFIG_FILES);
    
    if (!stored) return null;
    
    const configData = JSON.parse(stored);
    return configData.files;
  } catch (error) {
    return null;
  }
}

export function hasConfigFilesInStorage() {
  return localStorage.getItem(STORAGE_KEYS.CONFIG_FILES) !== null;
}
