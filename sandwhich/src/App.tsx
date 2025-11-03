import { useState } from 'react'
import './App.css'
import { BackgroundGradientAnimation } from './components/BackgroundGradientAnimation'
import { FinishedSandwichOverlay } from './components/FinishedSandwichOverlay'

interface Ingredient {
  id: string
  name: string
  color: string
  category: 'bread' | 'protein' | 'vegetable' | 'sauce' | 'cheese'
}

const availableIngredients: Ingredient[] = [
  // Breads
  { id: 'white-bread', name: 'White Bread', color: '#F5DEB3', category: 'bread' },
  { id: 'wheat-bread', name: 'Wheat Bread', color: '#D2B48C', category: 'bread' },
  { id: 'sourdough', name: 'Sourdough', color: '#DEB887', category: 'bread' },
  { id: 'rye-bread', name: 'Rye Bread', color: '#8B4513', category: 'bread' },
  { id: 'bagel', name: 'Bagel', color: '#F4A460', category: 'bread' },
  { id: 'pita', name: 'Pita', color: '#FAEBD7', category: 'bread' },
  { id: 'ciabatta', name: 'Ciabatta', color: '#E6D3A3', category: 'bread' },
  { id: 'baguette', name: 'Baguette', color: '#F5DEB3', category: 'bread' },
  
  // Proteins
  { id: 'turkey', name: 'Turkey', color: '#D2691E', category: 'protein' },
  { id: 'ham', name: 'Ham', color: '#FF69B4', category: 'protein' },
  { id: 'chicken', name: 'Chicken', color: '#FFE4B5', category: 'protein' },
  { id: 'roast-beef', name: 'Roast Beef', color: '#8B4513', category: 'protein' },
  { id: 'pastrami', name: 'Pastrami', color: '#A0522D', category: 'protein' },
  { id: 'salami', name: 'Salami', color: '#DC143C', category: 'protein' },
  { id: 'pepperoni', name: 'Pepperoni', color: '#FF4500', category: 'protein' },
  { id: 'bacon', name: 'Bacon', color: '#D2691E', category: 'protein' },
  { id: 'prosciutto', name: 'Prosciutto', color: '#CD5C5C', category: 'protein' },
  { id: 'tuna', name: 'Tuna', color: '#F0E68C', category: 'protein' },
  { id: 'salmon', name: 'Smoked Salmon', color: '#FFA07A', category: 'protein' },
  { id: 'egg', name: 'Fried Egg', color: '#FFFACD', category: 'protein' },
  { id: 'tofu', name: 'Grilled Tofu', color: '#F5F5DC', category: 'protein' },
  { id: 'tempeh', name: 'Tempeh', color: '#D2B48C', category: 'protein' },
  
  // Vegetables
  { id: 'lettuce', name: 'Lettuce', color: '#90EE90', category: 'vegetable' },
  { id: 'spinach', name: 'Spinach', color: '#228B22', category: 'vegetable' },
  { id: 'arugula', name: 'Arugula', color: '#32CD32', category: 'vegetable' },
  { id: 'tomato', name: 'Tomato', color: '#FF6347', category: 'vegetable' },
  { id: 'cucumber', name: 'Cucumber', color: '#98FB98', category: 'vegetable' },
  { id: 'red-onion', name: 'Red Onion', color: '#8B008B', category: 'vegetable' },
  { id: 'white-onion', name: 'White Onion', color: '#F5F5DC', category: 'vegetable' },
  { id: 'bell-pepper', name: 'Bell Pepper', color: '#FF4500', category: 'vegetable' },
  { id: 'pickles', name: 'Pickles', color: '#9ACD32', category: 'vegetable' },
  { id: 'jalapenos', name: 'Jalapeños', color: '#228B22', category: 'vegetable' },
  { id: 'avocado', name: 'Avocado', color: '#6B8E23', category: 'vegetable' },
  { id: 'sprouts', name: 'Sprouts', color: '#ADFF2F', category: 'vegetable' },
  { id: 'mushrooms', name: 'Mushrooms', color: '#D2B48C', category: 'vegetable' },
  { id: 'olives', name: 'Olives', color: '#556B2F', category: 'vegetable' },
  { id: 'sun-dried-tomato', name: 'Sun-Dried Tomato', color: '#8B0000', category: 'vegetable' },
  { id: 'roasted-peppers', name: 'Roasted Peppers', color: '#FF6347', category: 'vegetable' },
  
  // Cheeses
  { id: 'cheddar', name: 'Cheddar', color: '#FFA500', category: 'cheese' },
  { id: 'swiss', name: 'Swiss', color: '#FFFFE0', category: 'cheese' },
  { id: 'mozzarella', name: 'Mozzarella', color: '#FFFAF0', category: 'cheese' },
  { id: 'provolone', name: 'Provolone', color: '#F5F5DC', category: 'cheese' },
  { id: 'pepper-jack', name: 'Pepper Jack', color: '#FFF8DC', category: 'cheese' },
  { id: 'brie', name: 'Brie', color: '#F5F5DC', category: 'cheese' },
  { id: 'goat-cheese', name: 'Goat Cheese', color: '#FFFAF0', category: 'cheese' },
  { id: 'blue-cheese', name: 'Blue Cheese', color: '#E6E6FA', category: 'cheese' },
  { id: 'feta', name: 'Feta', color: '#F0F8FF', category: 'cheese' },
  { id: 'cream-cheese', name: 'Cream Cheese', color: '#FFFAF0', category: 'cheese' },
  
  // Sauces & Spreads
  { id: 'mayo', name: 'Mayonnaise', color: '#FFFACD', category: 'sauce' },
  { id: 'mustard', name: 'Yellow Mustard', color: '#FFDB58', category: 'sauce' },
  { id: 'dijon', name: 'Dijon Mustard', color: '#DAA520', category: 'sauce' },
  { id: 'honey-mustard', name: 'Honey Mustard', color: '#FFD700', category: 'sauce' },
  { id: 'ranch', name: 'Ranch', color: '#F5F5DC', category: 'sauce' },
  { id: 'caesar', name: 'Caesar', color: '#FFFACD', category: 'sauce' },
  { id: 'thousand-island', name: 'Thousand Island', color: '#FFA500', category: 'sauce' },
  { id: 'italian', name: 'Italian Dressing', color: '#DAA520', category: 'sauce' },
  { id: 'pesto', name: 'Pesto', color: '#228B22', category: 'sauce' },
  { id: 'hummus', name: 'Hummus', color: '#F4A460', category: 'sauce' },
  { id: 'guacamole', name: 'Guacamole', color: '#6B8E23', category: 'sauce' },
  { id: 'chipotle-mayo', name: 'Chipotle Mayo', color: '#CD853F', category: 'sauce' },
  { id: 'bbq-sauce', name: 'BBQ Sauce', color: '#A0522D', category: 'sauce' },
  { id: 'hot-sauce', name: 'Hot Sauce', color: '#FF4500', category: 'sauce' },
  { id: 'sriracha', name: 'Sriracha', color: '#FF6347', category: 'sauce' },
  { id: 'buffalo', name: 'Buffalo Sauce', color: '#FF4500', category: 'sauce' },
  { id: 'oil-vinegar', name: 'Oil & Vinegar', color: '#FFE4B5', category: 'sauce' },
]

function App() {
  const [sandwichIngredients, setSandwichIngredients] = useState<Ingredient[]>([
    availableIngredients.find(i => i.id === 'white-bread')!
  ])
  const [showFinishedSandwich, setShowFinishedSandwich] = useState(false)

  // Check if sandwich is complete (has at least 2 bread pieces)
  const breadCount = sandwichIngredients.filter(ing => ing.category === 'bread').length
  const isComplete = breadCount >= 2

  const finishSandwich = () => {
    setShowFinishedSandwich(true)
  }

  const startNewSandwich = () => {
    setSandwichIngredients([availableIngredients.find(i => i.id === 'white-bread')!])
    setShowFinishedSandwich(false)
  }

  const continueEditing = () => {
    setShowFinishedSandwich(false)
  }

  const addIngredient = (ingredient: Ingredient) => {
    if (ingredient.category === 'bread') {
      // Always add bread to the top (end) of the sandwich
      setSandwichIngredients(prev => [...prev, ingredient])
    } else {
      // Add other ingredients before the last bread (if it exists)
      const lastBreadIndex = sandwichIngredients.length - 1
      const hasTopBread = sandwichIngredients[lastBreadIndex]?.category === 'bread'
      
      if (hasTopBread && sandwichIngredients.length > 1) {
        // Insert before the last bread
        const newIngredients = [...sandwichIngredients]
        newIngredients.splice(lastBreadIndex, 0, ingredient)
        setSandwichIngredients(newIngredients)
      } else {
        // No top bread yet, just add to the end
        setSandwichIngredients(prev => [...prev, ingredient])
      }
    }
  }

  const removeLastIngredient = () => {
    if (sandwichIngredients.length > 1) {
      setSandwichIngredients(prev => prev.slice(0, -2).concat(prev.slice(-1)))
    }
  }

  const clearSandwich = () => {
    setSandwichIngredients([availableIngredients.find(i => i.id === 'white-bread')!])
  }

  const groupedIngredients = availableIngredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = []
    }
    acc[ingredient.category].push(ingredient)
    return acc
  }, {} as Record<string, Ingredient[]>)

  // Function to determine if text should be dark or light based on background color
  const getTextColor = (backgroundColor: string) => {
    // List of light colors that need dark text
    const lightColors = [
      '#F5DEB3', '#FAEBD7', '#E6D3A3', '#FFE4B5', '#F0E68C', 
      '#FFFACD', '#F5F5DC', '#FFFFE0', '#F5F5DC', '#FFFAF0',
      '#FFF8DC', '#F0F8FF', '#ADFF2F', '#F4A460', '#FFD700',
      '#FFDB58', '#DAA520', '#FFE4B5'
    ]
    
    return lightColors.includes(backgroundColor) ? '#333' : '#fff'
  }

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(108, 0, 162)"
      gradientBackgroundEnd="rgb(0, 17, 82)"
      firstColor="138, 43, 226"
      secondColor="147, 112, 219"
      thirdColor="186, 85, 211"
      fourthColor="221, 160, 221"
      fifthColor="238, 130, 238"
      pointerColor="75, 0, 130"
      size="80%"
      blendingValue="multiply"
      interactive={true}
    >
      <div className="sandwich-builder">
        <h1>🥪 Sandwich Builder</h1>
        
        <div className="main-content">
          <div className="sandwich-display">
            <div className="sandwich">
              {sandwichIngredients.map((ingredient, index) => (
                <div
                  key={`${ingredient.id}-${index}`}
                  className={`ingredient ${ingredient.category}`}
                  style={{ backgroundColor: ingredient.color }}
                  title={ingredient.name}
                >
                  <span className="ingredient-name">{ingredient.name}</span>
                </div>
              )).reverse()}
            </div>
            
            <div className="sandwich-controls">
              <button onClick={removeLastIngredient} className="control-btn remove">
                Remove Last
              </button>
              <button onClick={clearSandwich} className="control-btn clear">
                Clear All
              </button>
              {isComplete && (
                <button onClick={finishSandwich} className="control-btn finish">
                  🎉 Finish Sandwich
                </button>
              )}
            </div>
          </div>

          <div className="ingredients-panel">
            <h2>Available Ingredients</h2>
            {Object.entries(groupedIngredients).map(([category, ingredients]) => (
              <div key={category} className="ingredient-category">
                <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <div className="ingredient-buttons">
                  {ingredients.map(ingredient => (
                    <button
                      key={ingredient.id}
                      className="ingredient-btn"
                      style={{ 
                        backgroundColor: ingredient.color,
                        color: getTextColor(ingredient.color),
                        textShadow: getTextColor(ingredient.color) === '#333' 
                          ? '1px 1px 2px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.5)' 
                          : '1px 1px 2px rgba(0,0,0,0.8), 0 0 4px rgba(0,0,0,0.3)'
                      }}
                      onClick={() => addIngredient(ingredient)}
                    >
                      {ingredient.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {showFinishedSandwich && (
        <FinishedSandwichOverlay
          ingredients={sandwichIngredients}
          onStartNew={startNewSandwich}
          onContinueEditing={continueEditing}
        />
      )}
    </BackgroundGradientAnimation>
  )
}

export default App
