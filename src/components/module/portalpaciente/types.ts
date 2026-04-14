// components/patient-portal/types.ts

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  alternativePhone?: string;
  address: string;
  birthDate: string;
  age: number;
  bloodType: string;
  allergies: string;
  medicalConditions: string;
  medications: string;
  emergencyContact?: string;
  profileImage?: string;
  createdAt: string;
}

export interface Appointment {
  id: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: "scheduled" | "confirmed" | "in_progress" | "completed" | "cancelled";
  location: string;
  reason: string;
  diagnosis?: string;
  prescription?: string;
  notes?: string;
}

export interface Prescription {
  id: number;
  date: string;
  doctor: string;
  medications: Medication[];
  status: "active" | "expired" | "completed";
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Invoice {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  paymentDate?: string;
  paymentMethod?: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  available: boolean;
}

export interface Exam {
  id: number;
  name: string;
  price: number;
  preparation: string;
}