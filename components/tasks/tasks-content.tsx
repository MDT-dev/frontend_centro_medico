"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Filter, Calendar, Tag } from "lucide-react"
import { useState } from "react"

const tasks = [
  {
    id: 1,
    title: "Consulta - Hipertensão em seguimento",
    project: "Maria Santos",
    priority: "High",
    dueDate: "Nov 22, 2024",
    completed: false,
    tags: ["Hipertensão", "Seguimento"],
  },
  {
    id: 2,
    title: "Consulta - Vacinação infantil",
    project: "João Silva",
    priority: "High",
    dueDate: "Nov 22, 2024",
    completed: false,
    tags: ["Vacinação", "Infantil"],
  },
  {
    id: 3,
    title: "Consulta - Exame pré-natal",
    project: "Ana Pereira",
    priority: "High",
    dueDate: "Nov 21, 2024",
    completed: true,
    tags: ["Pré-natal"],
  },
  {
    id: 4,
    title: "Consulta - Acompanhamento diabetes",
    project: "Carlos Neto",
    priority: "Medium",
    dueDate: "Nov 23, 2024",
    completed: false,
    tags: ["Diabetes", "Acompanhamento"],
  },
  {
    id: 5,
    title: "Consulta - Doença respiratória",
    project: "Rosa Gomes",
    priority: "High",
    dueDate: "Nov 22, 2024",
    completed: false,
    tags: ["Respiratória", "Urgente"],
  },
  {
    id: 6,
    title: "Consulta - Triagem saúde materna",
    project: "Joana Costa",
    priority: "Medium",
    dueDate: "Nov 24, 2024",
    completed: false,
    tags: ["Materna", "Triagem"],
  },
]

export function TasksContent() {
  const [filter, setFilter] = useState("all")

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
        ? tasks.filter((t) => t.completed)
        : tasks.filter((t) => !t.completed)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search tasks..." className="pl-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Calendar className="w-4 h-4" />
            Date
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")} size="sm">
          All ({tasks.length})
        </Button>
        <Button variant={filter === "active" ? "default" : "outline"} onClick={() => setFilter("active")} size="sm">
          Active ({tasks.filter((t) => !t.completed).length})
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
          size="sm"
        >
          Completed ({tasks.filter((t) => t.completed).length})
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task, index) => (
          <Card
            key={task.id}
            className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              <Checkbox checked={task.completed} className="mt-1" />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <h3 className={`font-semibold text-foreground ${task.completed ? "line-through opacity-60" : ""}`}>
                    {task.title}
                  </h3>
                  <Badge
                    variant={
                      task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                    }
                    className="shrink-0"
                  >
                    {task.priority}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {task.project}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {task.dueDate}
                  </span>
                </div>
                <div className="flex gap-2">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
