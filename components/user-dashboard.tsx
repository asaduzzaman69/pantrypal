"use client"

import { useState } from "react"
import { ArrowLeft, TrendingUp, Award, Clock, Heart, Star, ChefHat, Target, Calendar, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface UserDashboardProps {
  onBack: () => void
  userData: any
}

export default function UserDashboard({ onBack, userData }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const achievements = [
    { id: 1, title: "First Recipe", description: "Generated your first recipe", earned: true, icon: "🎯" },
    { id: 2, title: "Week Warrior", description: "7 day cooking streak", earned: true, icon: "🔥" },
    { id: 3, title: "Ingredient Master", description: "Used 50+ different ingredients", earned: true, icon: "🌟" },
    { id: 4, title: "Quick Cook", description: "Made 10 recipes under 15 minutes", earned: false, icon: "⚡" },
    { id: 5, title: "Cuisine Explorer", description: "Tried 5 different cuisines", earned: false, icon: "🌍" },
  ]

  const recentActivity = [
    { date: "Today", recipe: "Mediterranean Omelette", rating: 5, cooked: true },
    { date: "Yesterday", recipe: "Garlic Chicken", rating: 4, cooked: true },
    { date: "2 days ago", recipe: "Spanish Tortilla", rating: 3, cooked: false },
    { date: "3 days ago", recipe: "Veggie Stir Fry", rating: 5, cooked: true },
  ]

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
              <span className="text-xl font-bold text-gray-900">Your Dashboard</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-orange-100 rounded-full flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {userData.name}!</h1>
              <p className="text-lg text-gray-600">You're on a {userData.streak} day cooking streak 🔥</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userData.recipesGenerated}</div>
                <div className="text-sm text-gray-600">Recipes Generated</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">This month</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userData.averageCookTime}</div>
                <div className="text-sm text-gray-600">Avg Cook Time</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Per recipe</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userData.favoriteCuisine}</div>
                <div className="text-sm text-gray-600">Favorite Cuisine</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Most cooked</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{userData.streak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Keep it up!</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-orange-100 rounded-lg flex items-center justify-center">
                        <ChefHat className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{activity.recipe}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {activity.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < activity.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      {activity.cooked && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Cooked ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorite Ingredients */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Favorite Ingredients</h3>
              <div className="space-y-3">
                {userData.favoriteIngredients.map((ingredient: string, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Achievements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                        achievement.earned ? "bg-yellow-100" : "bg-gray-100"
                      }`}
                    >
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                        {achievement.title}
                      </div>
                      <div className="text-xs text-gray-600">{achievement.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-4 text-sm">
                View all achievements
              </Button>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Zap className="w-4 h-4 mr-2" />
                  Scan New Ingredients
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  View Saved Recipes
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                  <Target className="w-4 h-4 mr-2" />
                  Update Preferences
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
