// components/patient-portal/PatientPortalLayout.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Home,
  Calendar,
  User,
  LogOut,
  Bell,
  Menu,
  X,
  Heart,
  Plus,
  Pill,
  HelpCircle,
  File,
} from "lucide-react";

interface NavItem {
  name: string;
  icon: any;
  id: string;
}

interface PatientPortalLayoutProps {
  children: React.ReactNode;
  patientName: string;
  patientEmail: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
}

const navigation: NavItem[] = [
  { name: "Dashboard", icon: Home, id: "dashboard" },
  { name: "Minhas Consultas", icon: Calendar, id: "appointments" },
  { name: "Marcar Consulta", icon: Plus, id: "schedule" },
  { name: "Faturas", icon: File, id: "invoices" },
  { name: "Prescrições", icon: Pill, id: "prescriptions" },
  { name: "Meu Perfil", icon: User, id: "profile" },
];

export function PatientPortalLayout({
  children,
  patientName,
  patientEmail,
  activeTab,
  onTabChange,
  onLogout,
}: PatientPortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white shadow-lg"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                 Mwanganza
                </h1>
                <p className="text-xs text-slate-400">Portal do Paciente</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <AvatarFallback className="text-lg">{getInitials(patientName)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-800">{patientName}</p>
                <p className="text-xs text-slate-500">{patientEmail}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                  onClick={() => {
                    onTabChange(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-slate-800">
                Olá, {patientName.split(' ')[0]}! 👋
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Bem-vindo ao seu portal de saúde
              </p>
            </div>
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  2
                </span>
              </Button>
              <Button variant="outline" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}