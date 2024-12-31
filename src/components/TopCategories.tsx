import './TopCategories.css';
import React, { useState } from 'react';

interface TopCategoriesProps {
  categories: string[];
}

const TopCategories: React.FC<TopCategoriesProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="category-selector-container">
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={'category_' + category}
            onClick={() => handleCategoryChange(category)}
            className={`category-button ${selectedCategory === category ? 'selected' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div className="selected-category">
          <h3>選択されたカテゴリ: {selectedCategory}</h3>
        </div>
      )}
    </div>
  );
};

export default TopCategories;
