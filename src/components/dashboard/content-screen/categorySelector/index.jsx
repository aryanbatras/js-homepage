import styles from "./index.module.sass";
import { categories } from "../store/categories";

export default function CategorySelector({ onCategorySelect }) {
  return (
    <div className={styles.categories}>
      <div className={styles.header}>
        <h1 className={styles.title}>Choose a Category</h1>
      </div>
      <div className={styles.categoryGrid}>
        {categories.map((category) => (
          <div 
            key={category.id} 
            className={styles.categoryCard}
            onClick={() => onCategorySelect(category.id)}
          >
            <h3 className={styles.categoryName}>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
