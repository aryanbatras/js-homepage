// Local storage utilities for problem management

export const STORAGE_KEYS = {
  SOLVED_PROBLEMS: 'solvedProblems',
  PROBLEM_METADATA: 'problemMetadata'
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
    console.error('Failed to save problem to storage:', error);
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
    console.error('Failed to load problem from storage:', error);
    return null;
  }
}

export function deleteProblemFromStorage(problemTitle) {
  try {
    const storageKey = getProblemStorageKey(problemTitle);
    localStorage.removeItem(storageKey);
    return true;
  } catch (error) {
    console.error('Failed to delete problem from storage:', error);
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
          console.error(`Failed to parse stored problem at ${key}:`, e);
        }
      }
    });
    
    return problems.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
  } catch (error) {
    console.error('Failed to get all stored problems:', error);
    return [];
  }
}

export function hasProblemInStorage(problemTitle) {
  const storageKey = getProblemStorageKey(problemTitle);
  return localStorage.getItem(storageKey) !== null;
}
