import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';
import { problemsByCategory } from '../../../store/categories';
import styles from './index.module.sass';
import { FaSearch, FaFolder, FaCode, FaEye } from 'react-icons/fa';

export default function Search({ isOpen, onClose, onCategorySelect, onProblemSelect }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null);

  // Flatten all problems with their category information
  const allProblems = [];
  Object.entries(problemsByCategory).forEach(([categoryId, problems]) => {
    const categoryName = categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const categoryType = ['html-css', 'dom-manipulation', 'css-animations', 'javascript-ui', 'responsive-design', 'web-components', 'canvas-graphics', 'svg-graphics', 'css-layouts', 'interactive-forms'].includes(categoryId) ? 'preview' : 'console';
    
    problems.forEach((problem, index) => {
      allProblems.push({
        ...problem,
        categoryId,
        categoryName,
        categoryType,
        problemIndex: index,
        searchableText: `${problem.title} ${problem.description} ${categoryName}`.toLowerCase()
      });
    });
  });

  const fuse = new Fuse(allProblems, {
    keys: [
      { name: 'title', weight: 0.6 },
      { name: 'description', weight: 0.3 },
      { name: 'categoryName', weight: 0.1 }
    ],
    threshold: 0.3,
    includeScore: true
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSearchResults([]);
    } else {
      const results = fuse.search(searchTerm);
      setSearchResults(results.map(result => result.item));
    }
  }, [searchTerm]);

  const handleProblemClick = (problem) => {
    onProblemSelect(problem.categoryId, problem.problemIndex);
    onClose();
    setSearchTerm('');
  };

  const getTypeIcon = (type) => {
    return type === 'preview' ? <FaEye /> : <FaCode />;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.searchOverlay}>
      <div className={styles.searchModal}>
        <div className={styles.searchHeader}>
          <div className={styles.searchInputContainer}>
            <FaSearch className={styles.searchIcon} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search problems... (Ctrl+K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className={styles.searchResults}>
          {searchResults.length === 0 && searchTerm.trim() !== '' ? (
            <div className={styles.noResults}>
              No problems found
            </div>
          ) : (
            searchResults.map((problem, index) => (
              <div
                key={`${problem.categoryId}-${problem.problemIndex}`}
                className={styles.resultItem}
                onClick={() => handleProblemClick(problem)}
              >
                <div className={styles.problemIcon}>
                  {getTypeIcon(problem.categoryType)}
                </div>
                <div className={styles.problemInfo}>
                  <div className={styles.problemTitle}>
                    {problem.title}
                  </div>
                  <div className={styles.problemDescription}>
                    {problem.description}
                  </div>
                  <div className={styles.problemMeta}>
                    <span className={styles.categoryInfo}>
                      <FaFolder />
                      {problem.categoryName}
                    </span>
                    <span className={styles.problemType}>
                      {problem.categoryType}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className={styles.searchFooter}>
          <div className={styles.keyboardHint}>
            <kbd>Ctrl</kbd> + <kbd>K</kbd> to open • <kbd>Esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
