"use client"

import { useState } from "react"
import { ArrowLeft, Camera, RotateCcw, Zap, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CameraInterfaceProps {
  onScanComplete: (ingredients: string[]) => void
  onBack: () => void
}

export default function CameraInterface({ onScanComplete, onBack }: CameraInterfaceProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [detectedIngredients, setDetectedIngredients] = useState<string[]>([])
  const [scanProgress, setScanProgress] = useState(0)

  const mockIngredients = [
    "Eggs",
    "Tomatoes",
    "Cheese",
    "Onions",
    "Bell Peppers",
    "Milk",
    "Bread",
    "Spinach",
    "Garlic",
    "Olive Oil",
  ]

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    setDetectedIngredients([])

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)

          // Simulate detected ingredients
          const randomIngredients = mockIngredients
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 4) + 3)

          setDetectedIngredients(randomIngredients)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleFindRecipes = () => {
    onScanComplete(detectedIngredients)
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-orange-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">PantryPal Scanner</span>
          </div>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <RotateCcw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Camera Viewfinder */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Mock camera background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[url('/placeholder.svg?height=800&width=600')] bg-cover bg-center"></div>
          </div>
        </div>

        {/* Scanning overlay */}
        {isScanning && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/20 to-transparent animate-pulse">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-80 h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-orange-400 transition-all duration-200"
                  style={{ width: `${scanProgress}%` }}
                ></div>
              </div>
              <div className="text-center mt-6">
                <div className="text-2xl font-semibold">Scanning ingredients...</div>
                <div className="text-lg text-gray-300">{scanProgress}% complete</div>
              </div>
            </div>
          </div>
        )}

        {/* Viewfinder frame */}
        <div className="relative w-96 h-96 border-2 border-white/50 rounded-3xl">
          <div className="absolute -top-1 -left-1 w-12 h-12 border-t-4 border-l-4 border-green-400 rounded-tl-2xl"></div>
          <div className="absolute -top-1 -right-1 w-12 h-12 border-t-4 border-r-4 border-green-400 rounded-tr-2xl"></div>
          <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-4 border-l-4 border-green-400 rounded-bl-2xl"></div>
          <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-4 border-r-4 border-green-400 rounded-br-2xl"></div>

          {/* Center crosshair */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 border-2 border-white/70 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Detected ingredients */}
        {detectedIngredients.length > 0 && (
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-6">
            <div className="bg-black/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-green-400" />
                <span className="text-xl font-semibold">Ingredients Detected</span>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {detectedIngredients.map((ingredient, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2 text-sm"
                  >
                    {ingredient}
                  </Badge>
                ))}
              </div>
              <Button
                onClick={handleFindRecipes}
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-orange-500 hover:from-green-600 hover:to-orange-600 text-white py-4"
              >
                Generate Recipe ({detectedIngredients.length} ingredients)
              </Button>
            </div>
          </div>
        )}

        {/* Scan button */}
        {!isScanning && detectedIngredients.length === 0 && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <Button
              size="lg"
              onClick={startScan}
              className="w-24 h-24 rounded-full bg-white text-black hover:bg-gray-100 shadow-2xl"
            >
              <Camera className="w-12 h-12" />
            </Button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-gray-300">
        <p className="text-lg">Position ingredients within the frame and tap the camera button</p>
      </div>
    </div>
  )
}
