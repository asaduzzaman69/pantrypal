"use client"

import { useState } from "react"
import { Camera, Zap, Clock, ChefHat, Sparkles, ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import CameraInterface from "@/components/camera-interface"
import RecipeResults from "@/components/recipe-results"
import UserPreferences from "@/components/user-preferences"
import UserDashboard from "@/components/user-dashboard"
import AppHeader from "@/components/app-header"

// Mock user data for demo
const mockUserData = {
  name: "Sarah",
  streak: 7,
  recipesGenerated: 12,
  favoriteIngredients: ["Eggs", "Tomatoes", "Cheese"],
  favoriteCuisine: "Italian",
  averageCookTime: "18 min",
  scanHistory: [
    { ingredients: ["Eggs", "Tomatoes", "Cheese"], date: "2024-01-15", time: "18:00" },
    { ingredients: ["Eggs", "Tomatoes", "Cheese"], date: "2024-01-17", time: "18:30" },
    { ingredients: ["Chicken", "Garlic", "Spinach"], date: "2024-01-16", time: "19:00" },
  ],
  recipeHistory: [
    { recipe: "Mediterranean Omelette", rating: 5, saved: true, cooked: true },
    { recipe: "Spanish Tortilla", rating: 4, saved: false, cooked: false },
    { recipe: "Garlic Chicken", rating: 5, saved: true, cooked: true },
  ],
}

export default function PantryPal() {
  const [currentView, setCurrentView] = useState<"landing" | "camera" | "preferences" | "results" | "dashboard">(
    "landing",
  )
  const [scannedIngredients, setScannedIngredients] = useState<string[]>([])

  const handleScanComplete = (ingredients: string[]) => {
    setScannedIngredients(ingredients)
    setCurrentView("results")
  }

  if (currentView === "camera") {
    return <CameraInterface onScanComplete={handleScanComplete} onBack={() => setCurrentView("landing")} />
  }

  if (currentView === "preferences") {
    return <UserPreferences onBack={() => setCurrentView("landing")} onSave={() => setCurrentView("landing")} />
  }

  if (currentView === "results") {
    return (
      <RecipeResults
        ingredients={scannedIngredients}
        onBack={() => setCurrentView("landing")}
        userData={mockUserData}
      />
    )
  }

  if (currentView === "dashboard") {
    return <UserDashboard onBack={() => setCurrentView("landing")} userData={mockUserData} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <AppHeader onNavigate={setCurrentView} userData={mockUserData} currentView={currentView} />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-12">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Recipe Generation
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Scan Your Fridge,
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-orange-500 block">
                    Cook Amazing
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Transform random ingredients into delicious meals in 30 seconds. No more food waste, no more "what's
                  for dinner?" stress.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white px-8 py-4 text-lg h-auto"
                onClick={() => setCurrentView("camera")}
              >
                <Camera className="w-6 h-6 mr-3" />
                Start Scanning
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg h-auto bg-white/80 backdrop-blur-sm">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">50k+</div>
                <div className="text-sm text-gray-600">Recipes Generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">£70</div>
                <div className="text-sm text-gray-600">Avg. Monthly Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">30s</div>
                <div className="text-sm text-gray-600">Scan to Recipe</div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            {/* Main Hero Image */}
            <div className="relative z-10">
              <div className="w-96 h-96 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-orange-400 rounded-full blur-3xl opacity-20"></div>
                <div className="relative w-full h-full bg-white rounded-full shadow-2xl overflow-hidden border-8 border-white">
                  <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="Fresh ingredients"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <>
              <div className="absolute top-8 -left-4 z-20">
                <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 transform rotate-[-8deg]">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl mb-3 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="Recipe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900">Pasta Primavera</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                    <Clock className="w-3 h-3" />
                    15 min
                  </div>
                </div>
              </div>

              <div className="absolute bottom-12 -right-8 z-20">
                <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 transform rotate-[12deg]">
                  <div className="w-16 h-16 bg-green-100 rounded-xl mb-3 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=64&width=64"
                      alt="Recipe"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900">Garden Salad</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                    <Clock className="w-3 h-3" />8 min
                  </div>
                </div>
              </div>
            </>

            <div className="absolute top-1/2 -right-12 z-20">
              <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 transform rotate-[6deg]">
                <div className="w-16 h-16 bg-yellow-100 rounded-xl mb-3 overflow-hidden">
                  <img src="/placeholder.svg?height=64&width=64" alt="Recipe" className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-sm text-gray-900">Spanish Tortilla</h3>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                  <Clock className="w-3 h-3" />
                  18 min
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-16 right-8 w-4 h-4 bg-orange-400 rounded-full opacity-60"></div>
            <div className="absolute bottom-24 left-12 w-6 h-6 bg-green-400 rounded-full opacity-40"></div>
            <div className="absolute top-1/3 left-8 w-3 h-3 bg-yellow-400 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How PantryPal Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to transform your ingredients into amazing meals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Scan Ingredients</h3>
              <p className="text-gray-600 leading-relaxed">
                Point your camera at your fridge or pantry. Our AI instantly recognizes your ingredients.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Generate Recipe</h3>
              <p className="text-gray-600 leading-relaxed">
                Get a personalized recipe in 30 seconds, tailored to your dietary preferences and time constraints.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Start Cooking</h3>
              <p className="text-gray-600 leading-relaxed">
                Follow step-by-step instructions and create delicious meals with what you already have.
              </p>
            </div>
          </div>
        </div>

        {/* Premium Section */}
        <div className="py-20">
          <div className="bg-gradient-to-r from-green-500 to-orange-500 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Ready to Never Waste Food Again?</h2>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Join thousands of home cooks who've transformed their kitchens with PantryPal
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg h-auto"
                  onClick={() => setCurrentView("camera")}
                >
                  <Camera className="w-6 h-6 mr-3" />
                  Start Scanning Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg h-auto bg-transparent"
                >
                  Upgrade to Pro - £3.99/mo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
