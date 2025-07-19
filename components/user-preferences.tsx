"use client"

import { useState } from "react"
import { ArrowLeft, Check, X, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

interface UserPreferencesProps {
  onBack: () => void
  onSave: () => void
}

export default function UserPreferences({ onBack, onSave }: UserPreferencesProps) {
  const [selectedDiets, setSelectedDiets] = useState<string[]>(["Vegetarian"])
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([])
  const [maxCookTime, setMaxCookTime] = useState("30")
  const [skillLevel, setSkillLevel] = useState("Intermediate")
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["Budget-Friendly"])
  const [selectedDishTypes, setSelectedDishTypes] = useState<string[]>(["Brunch"])

  const dietaryOptions = ["Keto", "Paleo", "Vegan", "Vegetarian", "Mediterranean", "Low-Carb"]
  const allergyOptions = ["Gluten", "Dairy", "Nuts", "Soy", "Fish", "Shellfish", "Eggs"]
  const timeOptions = ["Under 15 min", "Under 30 min", "Under 60 min", "60+ min"]
  const goalOptions = ["Eat Healthy", "Budget-Friendly", "Plan Better", "Learn to Cook", "Quick & Easy", "Weight Loss"]
  const dishOptions = ["Breakfast", "Brunch", "Lunch", "Dinner", "Appetizers", "Snack", "Dessert", "Drinks"]

  const toggleSelection = (item: string, list: string[], setter: (list: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter((i) => i !== item))
    } else {
      setter([...list, item])
    }
  }

  const handleSave = () => {
    onSave()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="hover:bg-gray-100">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PantryPal</span>
            </div>
          </div>
          <Button
            size="sm"
            onClick={handleSave}
            className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600"
          >
            <Check className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Recipe Preferences</h1>
          <p className="text-xl text-gray-600">Customize your recipe recommendations</p>
        </div>

        <div className="space-y-8">
          {/* Time Preferences */}
          <Card className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Cooking Time</h3>
            <p className="text-gray-600 mb-6">How much time do you usually have for cooking?</p>
            <div className="flex flex-wrap gap-3">
              {timeOptions.map((time) => (
                <Badge
                  key={time}
                  variant={maxCookTime === time ? "default" : "outline"}
                  className={`cursor-pointer px-6 py-3 text-sm ${
                    maxCookTime === time
                      ? "bg-yellow-400 text-gray-900 hover:bg-yellow-500 border-yellow-400"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => setMaxCookTime(time)}
                >
                  {time}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Dietary Preferences */}
          <Card className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Dietary Preferences</h3>
            <p className="text-gray-600 mb-6">Do you follow any of these diets?</p>
            <div className="flex flex-wrap gap-3">
              {dietaryOptions.map((diet) => (
                <Badge
                  key={diet}
                  variant={selectedDiets.includes(diet) ? "default" : "outline"}
                  className={`cursor-pointer px-6 py-3 text-sm ${
                    selectedDiets.includes(diet)
                      ? "bg-green-500 text-white hover:bg-green-600 border-green-500"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => toggleSelection(diet, selectedDiets, setSelectedDiets)}
                >
                  {diet}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Allergies */}
          <Card className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Allergies & Intolerances</h3>
            <p className="text-gray-600 mb-6">Select any ingredients you need to avoid</p>
            <div className="flex flex-wrap gap-3">
              {allergyOptions.map((allergy) => (
                <Badge
                  key={allergy}
                  variant={selectedAllergies.includes(allergy) ? "default" : "outline"}
                  className={`cursor-pointer px-6 py-3 text-sm ${
                    selectedAllergies.includes(allergy)
                      ? "bg-red-500 text-white hover:bg-red-600 border-red-500"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => toggleSelection(allergy, selectedAllergies, setSelectedAllergies)}
                >
                  {allergy}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Cooking Goals */}
          <Card className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Cooking Goals</h3>
            <p className="text-gray-600 mb-6">What are you hoping to achieve?</p>
            <div className="flex flex-wrap gap-3">
              {goalOptions.map((goal) => (
                <Badge
                  key={goal}
                  variant={selectedGoals.includes(goal) ? "default" : "outline"}
                  className={`cursor-pointer px-6 py-3 text-sm ${
                    selectedGoals.includes(goal)
                      ? "bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => toggleSelection(goal, selectedGoals, setSelectedGoals)}
                >
                  {goal}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Dish Types */}
          <Card className="p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Preferred Meal Types</h3>
            <p className="text-gray-600 mb-6">What types of dishes do you enjoy most?</p>
            <div className="flex flex-wrap gap-3">
              {dishOptions.map((dish) => (
                <Badge
                  key={dish}
                  variant={selectedDishTypes.includes(dish) ? "default" : "outline"}
                  className={`cursor-pointer px-6 py-3 text-sm ${
                    selectedDishTypes.includes(dish)
                      ? "bg-blue-500 text-white hover:bg-blue-600 border-blue-500"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => toggleSelection(dish, selectedDishTypes, setSelectedDishTypes)}
                >
                  {dish}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-8">
            <Button
              variant="outline"
              className="px-8 py-3 bg-white"
              onClick={() => {
                setSelectedDiets([])
                setSelectedAllergies([])
                setSelectedGoals([])
                setSelectedDishTypes([])
                setMaxCookTime("30")
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
            <Button
              size="lg"
              className="px-12 py-3 bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white"
              onClick={handleSave}
            >
              <Check className="w-5 h-5 mr-2" />
              Save Preferences
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
