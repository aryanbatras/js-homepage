import styles from "./index.module.sass";
import { useState } from "react";

export default function CategorySelector({ onCategorySelect }) {
  const [problemType, setProblemType] = useState('console');

  const consoleCategories = [
    { id: 'react-js', name: 'React.js' },
    { id: 'leetcode', name: 'LeetCode' },
    { id: 'core-javascript', name: 'Core JavaScript' },
    { id: 'javascript-interview', name: 'JavaScript Interview' },
    { id: 'react-hooks', name: 'React Hooks' },
    { id: 'react-performance', name: 'React Performance' },
    { id: 'react-patterns', name: 'React Patterns' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'node-js', name: 'Node.js' },
    { id: 'algorithms', name: 'Algorithms' },
    { id: 'data-structures', name: 'Data Structures' },
    { id: 'system-design', name: 'System Design' },
    { id: 'css-styling', name: 'CSS & Styling' },
    { id: 'web-apis', name: 'Web APIs' },
    { id: 'testing', name: 'Testing' },
    { id: 'async-programming', name: 'Async Programming' },
    { id: 'functional-programming', name: 'Functional Programming' },
    { id: 'security', name: 'Security' },
    { id: 'database', name: 'Database' }
  ];

  const previewCategories = [
    { id: 'html-css', name: 'HTML & CSS' },
    { id: 'dom-manipulation', name: 'DOM Manipulation' },
    { id: 'responsive-design', name: 'Responsive Design' },
    { id: 'css-animations', name: 'CSS Animations' },
    { id: 'javascript-ui', name: 'JavaScript UI' },
    { id: 'web-components', name: 'Web Components' },
    { id: 'canvas-graphics', name: 'Canvas Graphics' },
    { id: 'svg-graphics', name: 'SVG Graphics' },
    { id: 'css-layouts', name: 'CSS Layouts' },
    { id: 'interactive-forms', name: 'Interactive Forms' }
  ];

  const categories = problemType === 'console' ? consoleCategories : previewCategories;

  return (
    <div className={styles.categories}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose a Category</h1>
        
        <div className={styles.problemTypeNav}>
          <button 
            className={`${styles.problemTypeButton} ${problemType === 'console' ? styles.active : ''}`}
            onClick={() => setProblemType('console')}
          >
            Console Problems
          </button>
          <button 
            className={`${styles.problemTypeButton} ${problemType === 'preview' ? styles.active : ''}`}
            onClick={() => setProblemType('preview')}
          >
            Preview Problems
          </button>
        </div>
      </div>
      
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <div 
            key={category.id} 
            className={styles.categoryCard}
            onClick={() => onCategorySelect(category.id, problemType)}
          >
            <h3 className={styles.categoryName}>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
