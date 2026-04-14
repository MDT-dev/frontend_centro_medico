// components/doctor-portal/DoctorSchedule.tsx

"use client";

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorSchedule as ScheduleType, TimeSlot, Appointment } from "./types";
import {
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  AlertCircle,
  CheckCircle,
  Clock as ClockIcon,
  User,
  Stethoscope,
  Briefcase,
  Coffee,
  Utensils,
} from "lucide-react";

interface DoctorScheduleProps {
  schedule: any[];
  appointments: Appointment[];
  onUpdateSchedule: (schedule: ScheduleType[]) => void;
  onAddTimeSlot: (day: string, time: string) => void;
  onRemoveTimeSlot: (day: string, time: string) => void;
  onSetDayOff: (day: string, isDayOff: boolean) => void;
}

const daysOfWeek = [
  { value: "monday", label: "Segunda-feira", short: "Seg" },
  { value: "tuesday", label: "Terça-feira", short: "Ter" },
  { value: "wednesday", label: "Quarta-feira", short: "Qua" },
  { value: "thursday", label: "Quinta-feira", short: "Qui" },
  { value: "friday", label: "Sexta-feira", short: "Sex" },
  { value: "saturday", label: "Sábado", short: "Sáb" },
  { value: "sunday", label: "Domingo", short: "Dom" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
];

export function DoctorSchedule({
  schedule,
  appointments,
  onUpdateSchedule,
  onAddTimeSlot,
  onRemoveTimeSlot,
  onSetDayOff,
}: DoctorScheduleProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());
  const [showAddSlotDialog, setShowAddSlotDialog] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState("");
  const [viewMode, setViewMode] = useState<"week" | "day">("week");
  const [selectedViewDay, setSelectedViewDay] = useState<string>(daysOfWeek[0].value);

  const getScheduleForDay = (day: string) => {
    return schedule.find(s => s.day === day);
  };

  const isDayOff = (day: string) => {
    const daySchedule = getScheduleForDay(day);
    return !daySchedule || daySchedule.slots.length === 0;
  };

  const getAppointmentsForDay = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(a => a.date === dateStr);
  };

  const getAppointmentsForTime = (day: string, time: string) => {
    // This would need proper date mapping in real implementation
    return appointments.filter(a => a.time === time);
  };

  const handleAddSlot = () => {
    if (selectedDay && selectedTime) {
      onAddTimeSlot(selectedDay, selectedTime);
      setShowAddSlotDialog(false);
      setSelectedDay("");
      setSelectedTime("");
    }
  };

  const handleToggleDayOff = (day: string) => {
    const currentOff = isDayOff(day);
    onSetDayOff(day, !currentOff);
  };

  const getWeekDates = () => {
    const start = new Date(currentWeekStart);
    const monday = new Date(start);
    monday.setDate(start.getDate() - start.getDay() + (start.getDay() === 0 ? -6 : 1));
    
    return daysOfWeek.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      return date;
    });
  };

  const weekDates = getWeekDates();

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newDate);
  };

  const goToToday = () => {
    setCurrentWeekStart(new Date());
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">Meu Horário</h2>
          <p className="text-sm text-slate-500">Gerencie seus horários de atendimento</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={goToToday}>
            Hoje
          </Button>
          <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={goToNextWeek}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "week" | "day")} className="w-full">
        <TabsList className="grid w-full max-w-xs grid-cols-2">
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="day">Dia</TabsTrigger>
        </TabsList>

        {/* Week View */}
        <TabsContent value="week" className="mt-4">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header */}
                <div className="grid grid-cols-8 border-b bg-slate-50">
                  <div className="p-3 font-semibold text-center text-slate-600">Horário</div>
                  {daysOfWeek.map((day, idx) => (
                    <div key={day.value} className="p-3 text-center">
                      <p className="font-semibold">{day.short}</p>
                      <p className="text-xs text-slate-400">{formatDate(weekDates[idx])}</p>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 border-b hover:bg-slate-50">
                    <div className="p-2 text-sm font-medium text-slate-600 text-center border-r">
                      {time}
                    </div>
                    {daysOfWeek.map((day, idx) => {
                      const daySchedule = getScheduleForDay(day.value);
                      const hasSlot = daySchedule?.slots.some((s: { time: any; }) => s.time === time);
                      const isOff = isDayOff(day.value);
                      const appointmentsAtTime = getAppointmentsForDay(weekDates[idx]).filter(a => a.time === time);
                      
                      return (
                        <div key={day.value} className="p-1 border-r last:border-r-0">
                          {!isOff && hasSlot ? (
                            <div className={`p-2 rounded-lg text-center text-sm ${
                              appointmentsAtTime.length > 0 
                                ? "bg-teal-100 text-teal-700 cursor-pointer" 
                                : "bg-green-100 text-green-700"
                            }`}>
                              {appointmentsAtTime.length > 0 ? (
                                <div className="space-y-1">
                                  <div className="flex items-center justify-center gap-1 text-xs">
                                    <User className="h-3 w-3" />
                                    <span>{appointmentsAtTime[0].patientName.split(' ')[0]}</span>
                                  </div>
                                  <p className="text-xs">{appointmentsAtTime.length} consulta(s)</p>
                                </div>
                              ) : (
                                <span className="text-xs">Disponível</span>
                              )}
                            </div>
                          ) : isOff ? (
                            <div className="p-2 bg-red-50 rounded-lg text-center text-xs text-red-400">
                              Folga
                            </div>
                          ) : (
                            <div className="p-2 bg-slate-50 rounded-lg text-center text-xs text-slate-400">
                              -
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Day View */}
        <TabsContent value="day" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Day Selection */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Selecionar Dia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {daysOfWeek.map((day) => (
                  <Button
                    key={day.value}
                    variant={selectedViewDay === day.value ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setSelectedViewDay(day.value)}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {day.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Schedule for Selected Day */}
            <Card className="border-0 shadow-lg lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-teal-600" />
                    {daysOfWeek.find(d => d.value === selectedViewDay)?.label}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      setSelectedDay(selectedViewDay);
                      setShowAddSlotDialog(true);
                    }}>
                      <Plus className="h-4 w-4 mr-1" />
                      Adicionar Horário
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleDayOff(selectedViewDay)}
                    >
                      {isDayOff(selectedViewDay) ? (
                        <Sun className="h-4 w-4 mr-1" />
                      ) : (
                        <Moon className="h-4 w-4 mr-1" />
                      )}
                      {isDayOff(selectedViewDay) ? "Ativar" : "Marcar Folga"}
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {isDayOff(selectedViewDay) ? "Dia de folga - Sem atendimentos" : "Horários de atendimento"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isDayOff(selectedViewDay) ? (
                  <div className="space-y-3">
                    {getScheduleForDay(selectedViewDay)?.slots.map((slot: { time: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; appointmentId: any; }, idx: Key | null | undefined) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <ClockIcon className="h-5 w-5 text-teal-500" />
                          <span className="font-medium">{slot.time}</span>
                          {slot.appointmentId && (
                            <Badge className="bg-teal-100 text-teal-700 ml-2">
                              Ocupado
                            </Badge>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => onRemoveTimeSlot(selectedViewDay, slot.time)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {(!getScheduleForDay(selectedViewDay) || getScheduleForDay(selectedViewDay)?.slots.length === 0) && (
                      <div className="text-center py-8 text-slate-500">
                        <Clock className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p>Nenhum horário configurado</p>
                        <Button variant="link" onClick={() => {
                          setSelectedDay(selectedViewDay);
                          setShowAddSlotDialog(true);
                        }}>
                          Adicionar horário
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Sun className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                    <p className="text-slate-500">Dia de folga</p>
                    <Button variant="link" onClick={() => handleToggleDayOff(selectedViewDay)}>
                      Ativar atendimentos
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Time Slot Dialog */}
      <Dialog open={showAddSlotDialog} onOpenChange={setShowAddSlotDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Horário</DialogTitle>
            <DialogDescription>
              Adicione um novo horário para {daysOfWeek.find(d => d.value === selectedDay)?.label}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Horário</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar horário" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => {
                    const existing = getScheduleForDay(selectedDay)?.slots.some((s: { time: string; }) => s.time === slot);
                    return (
                      <SelectItem key={slot} value={slot} disabled={existing}>
                        {slot} {existing && "(já adicionado)"}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSlotDialog(false)}>Cancelar</Button>
            <Button onClick={handleAddSlot}>Adicionar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}