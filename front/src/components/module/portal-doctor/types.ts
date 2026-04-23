// components/doctor-portal/types.ts

export interface Doctor {
  id: number;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  licenseNumber: string;
  experience: number;
  avatar?: string;
  schedule: ScheduleType[];
}

export interface DoctorSchedule {
  day: string;
  start: string;
  end: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
  appointmentId?: number;
}

export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  alternativePhone?: string;
  address: string;
  birthDate: string;
  age: number;
  gender: "M" | "F";
  bloodType: string;
  allergies: string;
  medicalConditions: string;
  medications: string;
  emergencyContact?: string;
  profileImage?: string;
  createdAt: string;
  lastVisit?: string;
}

export interface Appointment {
  id: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  doctorId: number;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  type: "consultation" | "follow_up" | "emergency" | "exam" | "vaccination";
  status:
    | "scheduled"
    | "confirmed"
    | "in_progress"
    | "completed"
    | "cancelled"
    | "no_show";
  reason: string;
  symptoms?: string;
  diagnosis?: string;
  prescription?: Prescription;
  notes?: string;
  vitalSigns?: VitalSigns;
  createdAt: string;
}

export interface VitalSigns {
  bloodPressure?: string;
  heartRate?: number;
  temperature?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
  height?: number;
  bmi?: number;
  recordedAt: string;
}

export interface Prescription {
  id: number;
  patientId?: number;
  date: string;
  status?: string;
  medications: Medication[];
  patientName?: string;
  instructions?: string;
  followUpDate?: string;
}

export interface prescriptionsList {
  id: number;
  patientId: number;
  patientName: string;
  date: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    quantity: number;
  }[];
  status: string;
  followUpDate: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions?: string;
}

export interface MedicalRecord {
  id: number;
  patientId: number;
  date: string;
  doctorId: number;
  doctorName: string;
  type: string;
  diagnosis: string;
  prescription: {
    id: number;
    date: string;
    patientId: number;
    doctorId: number;
    doctorName: string;
    type: string;
    diagnosis: string;
    notes: string;
    medications: {
      name: string;
      dosage: string;
      frequency: string;
      duration: string;
      quantity: number;
    }[];
    status: string;
  };
  notes?: string;
}

// {
//   id: number;
//   patientId: number;
//   date: string;
//   doctorId: number;
//   doctorName: string;
//   type: "consultation" | "exam" | "procedure" | "vaccination";
//   diagnosis: string;
//   prescription?: Prescription;
//   notes: string;
//   attachments?: string[];

// }

export interface Exam {
  id: number;
  patientId: number;
  patientName: string;
  examType: string;
  requestedDate: string;
  performedDate?: string;
  result?: string;
  status: "pending" | "completed" | "cancelled";
  notes?: string;
}

export interface Statistics {
  totalPatients: number;
  todayAppointments: number;
  weeklyAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  pendingPrescriptions: number;
}

export type ScheduleType = {
  day: string;
  slots: {
    time: string;
    available: boolean;
  }[];
};
