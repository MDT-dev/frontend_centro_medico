// components/doctor-portal/DoctorPortalLayout.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Pill,
  Clock,
  LogOut,
  Bell,
  Menu,
  X,
  Stethoscope,
  Settings,
  HelpCircle,
  Activity,
  UserCog,
} from "lucide-react";
import { DropdownMenuProfile } from "@/components/ui-system/dropdown-profile";

interface NavItem {
  name: string;
  icon: any;
  id: string;
}

interface DoctorPortalLayoutProps {
  children: React.ReactNode;
  doctorName: string;
  doctorSpecialty: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
}

const navigation: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { name: "Minhas Consultas", icon: Calendar, id: "appointments" },
  { name: "Pacientes", icon: Users, id: "patients" },
  { name: "Prontuários", icon: FileText, id: "records" },
  { name: "Prescrições", icon: Pill, id: "prescriptions" },
  { name: "Meu Horário", icon: Clock, id: "schedule" },
];

export function DoctorPortalLayout({
  children,
  doctorName,
  doctorSpecialty,
  activeTab,
  onTabChange,
  onLogout,
}: DoctorPortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-emerald-50">
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
              <div className="p-2 bg-gradient-to-r from-teal-600 to-emerald-700 rounded-xl shadow-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-700 to-emerald-800 bg-clip-text text-transparent">
                 Mwanganza
                </h1>
                <p className="text-xs text-slate-400">Portal do Médico</p>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
                <AvatarFallback className="text-lg">{getInitials(doctorName)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-slate-800">{doctorName}</p>
                <p className="text-xs text-teal-600 font-medium">{doctorSpecialty}</p>
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
                      ? "bg-gradient-to-r from-teal-600 to-emerald-700 text-white"
                      : "text-slate-600 hover:text-teal-600"
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

          {/* Bottom Actions */}
          <div className="p-4 border-t space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-slate-600 hover:text-teal-600"
            >
              <Settings className="h-5 w-5" />
              Configurações
            </Button>
           
            <DropdownMenuProfile/>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="hidden lg:block">
              <h1 className="text-2xl font-bold text-slate-800">
                Bem-vindo, Dr(a). {doctorName.split(' ')[1]}! 👨‍⚕️
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Gerencie suas consultas, pacientes e prescrições
              </p>
            </div>
            <div className="flex items-center gap-2 ml-auto lg:ml-0">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                  3
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