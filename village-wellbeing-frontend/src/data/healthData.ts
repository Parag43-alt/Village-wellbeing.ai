
export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  image: string;
  availability: string[];
  languages: string[];
  experience: number;
}

export interface HealthCampaign {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  type: 'vaccination' | 'awareness' | 'checkup' | 'sanitation';
}

export interface MedicalRecord {
  id: string;
  date: string;
  doctorName: string;
  diagnosis: string;
  medicines: string[];
  followUp?: string;
  attachments?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  message: string;
  timestamp: string;
}

// Mock data for doctors
export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    specialty: 'General Physician',
    location: 'Primary Health Center, Bharatpur',
    image: '/placeholder.svg',
    availability: ['Monday', 'Wednesday', 'Friday'],
    languages: ['Hindi', 'English'],
    experience: 8
  },
  {
    id: '2',
    name: 'Dr. Meera Singh',
    specialty: 'Pediatrician',
    location: 'Community Health Center, Alwar',
    image: '/placeholder.svg',
    availability: ['Tuesday', 'Thursday', 'Saturday'],
    languages: ['Hindi', 'English', 'Rajasthani'],
    experience: 5
  },
  {
    id: '3',
    name: 'Dr. Anand Verma',
    specialty: 'General Surgeon',
    location: 'District Hospital, Jaipur',
    image: '/placeholder.svg',
    availability: ['Monday', 'Tuesday', 'Thursday'],
    languages: ['Hindi', 'English'],
    experience: 12
  },
  {
    id: '4',
    name: 'Dr. Lakshmi Devi',
    specialty: 'Gynecologist',
    location: 'Women\'s Health Center, Jodhpur',
    image: '/placeholder.svg',
    availability: ['Wednesday', 'Friday', 'Saturday'],
    languages: ['Hindi', 'English', 'Marwari'],
    experience: 10
  }
];

// Mock data for health campaigns
export const healthCampaigns: HealthCampaign[] = [
  {
    id: '1',
    title: 'Polio Vaccination Drive',
    description: 'Free polio vaccination for children under 5 years. Please bring your child\'s vaccination card.',
    date: '2025-06-15',
    location: 'All Primary Health Centers',
    image: '/placeholder.svg',
    type: 'vaccination'
  },
  {
    id: '2',
    title: 'Diabetes Awareness Camp',
    description: 'Learn about diabetes prevention, management, and free blood sugar testing.',
    date: '2025-06-20',
    location: 'Community Hall, Jaipur',
    image: '/placeholder.svg',
    type: 'awareness'
  },
  {
    id: '3',
    title: 'General Health Check-up',
    description: 'Free health check-up including blood pressure, BMI, and basic blood tests.',
    date: '2025-06-25',
    location: 'Mobile Medical Unit, Various Villages',
    image: '/placeholder.svg',
    type: 'checkup'
  },
  {
    id: '4',
    title: 'Clean Water and Sanitation Program',
    description: 'Information session on clean water practices and distribution of water purification tablets.',
    date: '2025-07-05',
    location: 'Village Panchayat Halls',
    image: '/placeholder.svg',
    type: 'sanitation'
  }
];

// Mock data for medical records
export const medicalRecords: MedicalRecord[] = [
  {
    id: '1',
    date: '2025-01-15',
    doctorName: 'Dr. Rajesh Kumar',
    diagnosis: 'Common Cold',
    medicines: [
      'Paracetamol 500mg - 1 tablet three times a day',
      'Cetirizine 10mg - 1 tablet at night'
    ],
    followUp: '2025-01-22'
  },
  {
    id: '2',
    date: '2025-03-10',
    doctorName: 'Dr. Meera Singh',
    diagnosis: 'Seasonal Flu',
    medicines: [
      'Azithromycin 500mg - 1 tablet daily for 3 days',
      'Paracetamol 650mg - SOS for fever'
    ],
    followUp: '2025-03-17'
  }
];

// Mock data for chat messages
export const initialChatMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'assistant',
    message: 'Hello! I am your virtual health assistant. How can I help you today?',
    timestamp: new Date().toISOString()
  }
];

// Common health queries and responses
export const healthFAQs: Record<string, string> = {
  'headache': 'Headaches can be caused by stress, dehydration, or eye strain. Try drinking water and resting in a dark, quiet room. If the pain is severe or persistent, please consult a doctor.',
  'fever': 'For mild fever (below 101°F or 38.3°C), rest and drink plenty of fluids. You can take paracetamol to reduce the fever. If the fever persists for more than 2 days or is very high, please consult a doctor immediately.',
  'cold': 'For common cold, rest, stay hydrated, and use steam inhalation. Over-the-counter medicines like paracetamol can help with symptoms. If symptoms worsen or last more than a week, please consult a doctor.',
  'cough': 'For dry cough, try honey with warm water or ginger tea. For wet cough, stay hydrated and use steam inhalation. If the cough lasts more than a week or is accompanied by chest pain, please consult a doctor.',
  'stomach ache': 'Stomach aches can be caused by indigestion, gas, or food poisoning. Try avoiding spicy foods and take small frequent meals. If the pain is severe or persistent, please consult a doctor.',
  'diarrhea': 'Stay hydrated with ORS (Oral Rehydration Solution) and avoid dairy products and spicy foods. If diarrhea persists for more than 2 days or is accompanied by fever, please consult a doctor.',
  'vomiting': 'Stay hydrated with small sips of water or ORS. Avoid solid foods until vomiting subsides. If vomiting persists for more than a day or is accompanied by severe abdominal pain, please consult a doctor.',
  'rash': 'Avoid scratching the rash and keep the area clean and dry. Apply calamine lotion if available. If the rash spreads or is accompanied by fever, please consult a doctor.',
  'back pain': 'Rest, apply ice or heat, and take over-the-counter pain relievers if needed. Maintain good posture. If the pain is severe, radiates to legs, or is accompanied by numbness, please consult a doctor.',
  'joint pain': 'Rest the joint, apply ice to reduce inflammation, and take over-the-counter pain relievers if needed. If the pain is severe, accompanied by swelling, or persists, please consult a doctor.',
  'pregnancy': 'If you think you might be pregnant, take a home pregnancy test and schedule an appointment with a healthcare provider for confirmation and prenatal care.',
  'diabetes': 'Symptoms of diabetes include increased thirst, frequent urination, hunger, fatigue, and blurred vision. If you experience these symptoms, please consult a doctor for proper diagnosis and treatment.',
  'hypertension': 'High blood pressure often has no symptoms. Regular check-ups are important. Maintain a healthy diet, exercise regularly, avoid smoking and excessive alcohol consumption.',
  'covid': 'Common symptoms include fever, cough, shortness of breath, fatigue, and loss of taste or smell. If you experience these symptoms, please isolate yourself and consult a doctor for testing and further guidance.'
};
