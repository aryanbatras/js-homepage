import styles from "./index.module.sass";
import { categories } from "../store/categories";

export default function CategorySelector({ onCategorySelect }) {
  return (
    <div className={styles.categories}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose a Category</h1>
        <p className={styles.subtitle}>Select the type of problems you want to practice</p>
      </div>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <div 
            key={category.id} 
            className={styles.categoryCard}
            onClick={() => onCategorySelect(category.id)}
            style={{ borderColor: category.color }}
          >
            <div className={styles.categoryIcon} style={{ color: category.color }}>
              {category.icon}
            </div>
            <h3 className={styles.categoryName}>{category.name}</h3>
            <p className={styles.categoryDescription}>{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
