export interface Experience {
  position: string;
  company: string;
  start: string;
  end: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
}

export interface Organization {
  name: string;
  role: string;
  start: string;
  end: string;
  description: string;
}

export interface Project {
  name: string;
  role: string;
  description: string;
  link?: string;
}

export interface CVData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: string[];
  certifications: Certification[];
  organizations: Organization[];
  projects: Project[];
  languages: { name: string; level: string }[];
}

/** Demo data pre-filled in step 1 so users see a "finished" CV immediately. */
export const DEMO_CV: CVData = {
  fullName: "Sari Ramadhani",
  jobTitle: "Admin Staff",
  email: "sari@email.com",
  phone: "0812-3456-7890",
  city: "Bandung",
  summary:
    "Lulusan administrasi dengan pengalaman magang di perusahaan logistik. Terbiasa mengelola dokumen dan data dengan teliti.",
  experiences: [
    {
      position: "Admin Intern",
      company: "PT Nusantara Logistik",
      start: "2023-01",
      end: "2023-06",
      description:
        "Mengelola arsip 300+ dokumen dan memangkas waktu pelaporan mingguan dari 4 jam menjadi 90 menit.",
    },
  ],
  education: [
    {
      school: "Politeknik Negeri Bandung",
      degree: "D3 Administrasi Bisnis",
      start: "2020",
      end: "2023",
    },
  ],
  skills: ["Excel", "Input Data", "Arsip Digital", "Google Workspace"],
  // Step "Tambahan" is optional: demo keeps it empty so users see the skip-friendly
  // empty state, but the shapes are ready.
  certifications: [],
  organizations: [],
  projects: [],
  languages: [],
};

export const EMPTY_CV: CVData = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  city: "",
  summary: "",
  experiences: [],
  education: [],
  skills: [],
  certifications: [],
  organizations: [],
  projects: [],
  languages: [],
};

/** Start with demo data; user edits or clears it. */
export function initialCV(): CVData {
  return JSON.parse(JSON.stringify(DEMO_CV));
}
