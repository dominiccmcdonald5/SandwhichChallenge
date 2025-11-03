import React from 'react';

interface Ingredient {
  id: string;
  name: string;
  color: string;
  category: 'bread' | 'protein' | 'vegetable' | 'sauce' | 'cheese';
}

interface FinishedSandwichOverlayProps {
  ingredients: Ingredient[];
  onStartNew: () => void;
  onContinueEditing: () => void;
}

export const FinishedSandwichOverlay: React.FC<FinishedSandwichOverlayProps> = ({
  ingredients,
  onStartNew,
  onContinueEditing,
}) => {
  return (
    <div className="sandwich-overlay">
      <div className="overlay-backdrop" onClick={onContinueEditing} />
      <div className="finished-sandwich-container">
        {/* Sparkle animations */}
        <div className="sparkles">
          <div className="sparkle sparkle-1">✨</div>
          <div className="sparkle sparkle-2">⭐</div>
          <div className="sparkle sparkle-3">✨</div>
          <div className="sparkle sparkle-4">🌟</div>
          <div className="sparkle sparkle-5">✨</div>
          <div className="sparkle sparkle-6">⭐</div>
          <div className="sparkle sparkle-7">✨</div>
          <div className="sparkle sparkle-8">🌟</div>
        </div>

        <div className="finished-sandwich-content">
          <h2 className="celebration-title">🎉 Sandwich Complete! 🎉</h2>
          
          <div className="finished-sandwich-display">
            <div className="finished-sandwich">
              {ingredients.map((ingredient, index) => (
                <div
                  key={`${ingredient.id}-${index}`}
                  className={`finished-ingredient ${ingredient.category}`}
                  style={{ backgroundColor: ingredient.color }}
                  title={ingredient.name}
                >
                  <span className="finished-ingredient-name">{ingredient.name}</span>
                </div>
              )).reverse()}
            </div>
          </div>

          <div className="sandwich-summary">
            <h3>Your Creation:</h3>
            <div className="ingredient-count">
              <span className="count-item">🍞 {ingredients.filter(i => i.category === 'bread').length} Bread</span>
              <span className="count-item">🥩 {ingredients.filter(i => i.category === 'protein').length} Protein</span>
              <span className="count-item">🥬 {ingredients.filter(i => i.category === 'vegetable').length} Vegetables</span>
              <span className="count-item">🧀 {ingredients.filter(i => i.category === 'cheese').length} Cheese</span>
              <span className="count-item">🥄 {ingredients.filter(i => i.category === 'sauce').length} Sauces</span>
            </div>
          </div>

          <div className="celebration-buttons">
            <button onClick={onStartNew} className="celebration-btn new-sandwich">
              🆕 Start New Sandwich
            </button>
            <button onClick={onContinueEditing} className="celebration-btn continue-editing">
              ✏️ Continue Editing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};