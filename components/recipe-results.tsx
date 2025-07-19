"use client"

import { useState } from "react"
import { RotateCcw, Clock, Users, ChefHat, Sparkles, TrendingUp, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AppHeader from "@/components/app-header"

interface RecipeResultsProps {
  ingredients: string[]
  onBack: () => void
  userData?: any
}

export default function RecipeResults({ ingredients, onBack, userData }: RecipeResultsProps) {
  const [currentRecipe, setCurrentRecipe] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showRating, setShowRating] = useState(true)
  const [userRating, setUserRating] = useState(0)

  // Mock generated recipe variants
  const recipeVariants = [
    {
      id: 1,
      title: "Mediterranean Veggie Omelette",
      time: "12 min",
      servings: 2,
      difficulty: "Easy",
      description: "A fluffy omelette with fresh Mediterranean flavors and herbs",
      instructions: [
        "Heat 2 tablespoons of olive oil in a non-stick pan over medium heat",
        "Whisk 4 eggs with salt and pepper in a bowl until well combined",
        "Add diced tomatoes and fresh spinach to the pan, cook for 2 minutes until wilted",
        "Pour in the whisked eggs and let them set for 3-4 minutes without stirring",
        "Add crumbled cheese on one half, fold omelette carefully and serve immediately",
      ],
      tips: "For extra fluffiness, add a splash of milk to the eggs before whisking",
      nutrition: { calories: 320, protein: "24g", carbs: "8g", fat: "22g" },
      isRecommended: userData?.recipeHistory?.some((r: any) => r.recipe === "Mediterranean Omelette" && r.rating >= 4),
    },
    {
      id: 2,
      title: "Spanish-Style Tortilla",
      time: "18 min",
      servings: 3,
      difficulty: "Medium",
      description: "A thick, hearty egg dish perfect for any meal of the day",
      instructions: [
        "Slice onions thinly and cook in olive oil until soft and golden",
        "Beat 6 eggs in a large bowl with salt and pepper",
        "Add cooked onions and grated cheese to the eggs, mix well",
        "Cook in the pan for 8 minutes over medium-low heat",
        "Flip carefully using a plate and cook for another 5 minutes until golden",
      ],
      tips: "Use a plate to help flip the tortilla safely - it takes practice!",
      nutrition: { calories: 280, protein: "18g", carbs: "12g", fat: "18g" },
      isRecommended: false,
    },
    {
      id: 3,
      title: "Cheesy Scrambled Eggs",
      time: "8 min",
      servings: 2,
      difficulty: "Easy",
      description: "Creamy, cheesy scrambled eggs with fresh herbs and vegetables",
      instructions: [
        "Whisk eggs with a splash of milk in a bowl",
        "Heat butter in a pan over low heat until melted",
        "Add eggs and stir gently as they cook, keeping heat low",
        "Add cheese and spinach in the last minute of cooking",
        "Season with salt, pepper and serve immediately with toast",
      ],
      tips: "Low heat is the secret to creamy, restaurant-quality scrambled eggs",
      nutrition: { calories: 290, protein: "20g", carbs: "4g", fat: "22g" },
      isRecommended: false,
    },
  ]

  const handleRegenerate = () => {
    setIsGenerating(true)
    setShowRating(false)
    setTimeout(() => {
      setCurrentRecipe((prev) => (prev + 1) % recipeVariants.length)
      setIsGenerating(false)
      setShowRating(true)
    }, 2000)
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
    setShowRating(false)
    // In real app, this would save to user's recipe history
  }

  const recipe = recipeVariants[currentRecipe]

  // Check if user has scanned these ingredients before
  const hasScannedBefore = userData?.scanHistory?.some((scan: any) =>
    scan.ingredients.every((ing: string) => ingredients.includes(ing)),
  )

  // Get smart suggestions based on user data
  const getSmartSuggestions = () => {
    if (!userData) return []

    const suggestions = []

    if (hasScannedBefore) {
      suggestions.push("You scanned these ingredients 2 days ago - want something different this time?")
    }

    if (userData.favoriteCuisine === "Italian" && recipe.title.includes("Mediterranean")) {
      suggestions.push(`Based on your love for ${userData.favoriteCuisine} cuisine, this recipe is perfect for you!`)
    }

    if (userData.averageCookTime === "18 min" && Number.parseInt(recipe.time) <= 20) {
      suggestions.push("This fits your usual cooking time preference perfectly!")
    }

    return suggestions
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <AppHeader
        onNavigate={(view) => {
          if (view === "landing") onBack()
          // Handle other navigation as needed
        }}
        userData={userData}
        currentView="results"
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Generated Recipe</h1>
          <p className="text-xl text-gray-600">Created from {ingredients.length} ingredients in your kitchen</p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
          {/* Mobile: Collapsible Ingredients & Info */}
          <div className="lg:hidden">
            <Card className="p-4">
              <details className="group" open>
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-gray-900">Your Ingredients ({ingredients.length})</h3>
                  <div className="text-gray-500 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="mt-4 space-y-4">
                  {/* Ingredients */}
                  <div className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <ChefHat className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">{ingredient}</span>
                        {userData?.favoriteIngredients?.includes(ingredient) && (
                          <div className="relative group/tooltip ml-auto">
                            <Heart className="w-4 h-4 text-red-500 fill-current" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Most used ingredient
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Quick Recipe Variants for Mobile */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2 text-sm">Other Ideas</h4>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {recipeVariants
                        .filter((_, index) => index !== currentRecipe)
                        .slice(0, 2)
                        .map((variant, index) => (
                          <div
                            key={variant.id}
                            className="flex-shrink-0 w-32 p-3 border border-gray-200 rounded-lg cursor-pointer hover:border-green-300 hover:bg-green-50 transition-colors"
                            onClick={() => setCurrentRecipe(recipeVariants.indexOf(variant))}
                          >
                            <h4 className="font-medium text-gray-900 text-xs mb-1 truncate">{variant.title}</h4>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              {variant.time}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </details>
            </Card>
          </div>

          {/* Desktop: Original Sidebar */}
          <div className="hidden lg:block space-y-6">
            {/* Your Ingredients */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Ingredients</h3>
              <div className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <ChefHat className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-gray-900">{ingredient}</span>
                    {userData?.favoriteIngredients?.includes(ingredient) && (
                      <div className="relative group/tooltip ml-auto">
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                          Most used ingredient
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Smart Suggestions */}
            {userData && (
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Smart Suggestions</h3>
                </div>
                <div className="space-y-3">
                  {getSmartSuggestions().map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{suggestion}</p>
                    </div>
                  ))}
                  {hasScannedBefore && (
                    <div className="mt-4 p-3 bg-white/60 rounded-lg">
                      <p className="text-xs text-gray-600">
                        <strong>Last time:</strong> You made Mediterranean Omelette and rated it 5 stars!
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Recipe Variants */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Ideas</h3>
              <div className="space-y-3">
                {recipeVariants
                  .filter((_, index) => index !== currentRecipe)
                  .slice(0, 2)
                  .map((variant, index) => (
                    <div
                      key={variant.id}
                      className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-green-300 hover:bg-green-50 transition-colors"
                      onClick={() => setCurrentRecipe(recipeVariants.indexOf(variant))}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-medium text-gray-900 text-sm">{variant.title}</h4>
                        {variant.isRecommended && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <Clock className="w-3 h-3" />
                        {variant.time}
                        <span>•</span>
                        <span>{variant.difficulty}</span>
                      </div>
                      <p className="text-xs text-gray-700">{variant.description}</p>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Generate New Recipe */}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white"
              onClick={handleRegenerate}
              disabled={isGenerating}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              {isGenerating ? "Generating..." : "Generate Different Recipe"}
            </Button>
          </div>

          {/* Main Content - Recipe Details */}
          <div className="lg:col-span-2 order-first lg:order-none">
            {isGenerating ? (
              <Card className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Generating your recipe...</h3>
                <p className="text-gray-600">Creating something delicious with your ingredients</p>
              </Card>
            ) : (
              <div className="space-y-8">
                {/* Recipe Header */}
                <Card className="overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-r from-green-400 to-orange-400">
                    <div className="absolute inset-0 bg-black/20"></div>
                    {recipe.isRecommended && (
                      <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                        ⭐ Recommended for you
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <ChefHat className="w-16 h-16 text-gray-700" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">{recipe.title}</h2>
                      <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>

                      <div className="flex justify-center gap-8 text-gray-600">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Clock className="w-5 h-5" />
                          </div>
                          <div className="font-semibold text-gray-900">{recipe.time}</div>
                          <div className="text-sm">Cook Time</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="w-5 h-5" />
                          </div>
                          <div className="font-semibold text-gray-900">{recipe.servings}</div>
                          <div className="text-sm">Servings</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <ChefHat className="w-5 h-5" />
                          </div>
                          <div className="font-semibold text-gray-900">{recipe.difficulty}</div>
                          <div className="text-sm">Difficulty</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Instructions */}
                <Card className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Instructions</h3>
                  <div className="space-y-6">
                    {recipe.instructions.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-1">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 leading-relaxed">{step}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Pro Tip & Nutrition */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Pro Tip</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{recipe.tips}</p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Nutrition Info</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Calories</div>
                        <div className="font-semibold text-gray-900">{recipe.nutrition.calories}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Protein</div>
                        <div className="font-semibold text-gray-900">{recipe.nutrition.protein}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Carbs</div>
                        <div className="font-semibold text-gray-900">{recipe.nutrition.carbs}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Fat</div>
                        <div className="font-semibold text-gray-900">{recipe.nutrition.fat}</div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Rating System - Moved here after user sees all recipe details */}
                {showRating && (
                  <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">How does this recipe look?</h3>
                      <div className="flex justify-center gap-4 mb-6">
                        <button
                          onClick={() => handleRating(5)}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/60 transition-colors"
                        >
                          <span className="text-3xl">😍</span>
                          <span className="text-sm font-medium text-gray-700">Love it</span>
                        </button>
                        <button
                          onClick={() => handleRating(4)}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/60 transition-colors"
                        >
                          <span className="text-3xl">😊</span>
                          <span className="text-sm font-medium text-gray-700">Good</span>
                        </button>
                        <button
                          onClick={() => handleRating(3)}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/60 transition-colors"
                        >
                          <span className="text-3xl">😐</span>
                          <span className="text-sm font-medium text-gray-700">Okay</span>
                        </button>
                        <button
                          onClick={() => handleRating(1)}
                          className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/60 transition-colors"
                        >
                          <span className="text-3xl">😞</span>
                          <span className="text-sm font-medium text-gray-700">Not for me</span>
                        </button>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="text-md font-medium text-gray-900 mb-3">Did you cook this?</h4>
                        <div className="flex justify-center gap-3">
                          <Button variant="outline" size="sm" className="bg-white">
                            <span className="mr-2">✅</span>
                            Yes, made it!
                          </Button>
                          <Button variant="outline" size="sm" className="bg-white">
                            <span className="mr-2">⏰</span>
                            Maybe later
                          </Button>
                          <Button variant="outline" size="sm" className="bg-white">
                            <span className="mr-2">❌</span>
                            No thanks
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
        {/* Mobile: Fixed Regenerate Button */}
        <div className="lg:hidden sticky bottom-4 z-10 mt-8">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white shadow-lg"
            onClick={handleRegenerate}
            disabled={isGenerating}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            {isGenerating ? "Generating..." : "Try Different Recipe"}
          </Button>
        </div>
      </main>
    </div>
  )
}
