"use client"

import { useState } from "react"
import { Bell, ChefHat, Settings, User, LogOut, TrendingUp, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ViewType = "landing" | "camera" | "preferences" | "results" | "dashboard"

interface AppHeaderProps {
  onNavigate: (view: ViewType) => void
  userData?: any
  currentView: ViewType
}

export default function AppHeader({ onNavigate, userData, currentView }: AppHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)

  // Smart notifications based on user patterns
  const notifications = userData
    ? [
        {
          id: 1,
          type: "reminder",
          icon: Clock,
          title: "Haven't cooked in 3 days",
          message: "Your spinach expires tomorrow - here's a quick recipe!",
          time: "2h ago",
          urgent: true,
        },
        {
          id: 2,
          type: "suggestion",
          icon: TrendingUp,
          title: "Try something new",
          message: "You've been cooking Italian a lot - explore Asian cuisine?",
          time: "1d ago",
          urgent: false,
        },
        {
          id: 3,
          type: "achievement",
          icon: TrendingUp,
          title: "Cooking streak milestone!",
          message: "7 days in a row! You're on fire 🔥",
          time: "2d ago",
          urgent: false,
        },
        {
          id: 4,
          type: "tip",
          icon: AlertCircle,
          title: "Ingredient tip",
          message: "Your eggs work great in Mediterranean dishes",
          time: "3d ago",
          urgent: false,
        },
      ]
    : []

  const unreadCount = notifications.filter((n) => n.urgent).length

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("landing")}>
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-orange-500 rounded-xl flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-900">PantryPal</span>
        </div>

        {/* Navigation & User Actions */}
        <div className="flex items-center gap-4">
          {currentView === "landing" && (
            <>
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                How it works
              </Button>
              <Button
                variant="ghost"
                onClick={() => onNavigate("preferences")}
                className="text-gray-600 hover:text-gray-900"
              >
                Settings
              </Button>
            </>
          )}

          {/* Notifications */}
          {userData && (
            <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="p-3 border-b">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-600">{unreadCount} new updates</p>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-3 border-b last:border-b-0 hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            notification.urgent ? "bg-red-100" : "bg-blue-100"
                          }`}
                        >
                          <notification.icon
                            className={`w-4 h-4 ${notification.urgent ? "text-red-600" : "text-blue-600"}`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                            {notification.urgent && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-sm">
                    View all notifications
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* User Menu */}
          {userData ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-10 h-10 rounded-full p-0 bg-gradient-to-r from-green-100 to-orange-100"
                >
                  <span className="text-lg">👤</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="p-3 border-b">
                  <p className="font-medium text-gray-900">Welcome back, {userData.name}!</p>
                  <p className="text-sm text-gray-600">{userData.streak} day cooking streak 🔥</p>
                </div>
                <DropdownMenuItem onClick={() => onNavigate("dashboard")}>
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate("preferences")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
