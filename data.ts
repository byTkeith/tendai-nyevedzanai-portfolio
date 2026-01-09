
import { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  name: "Tendai K. Nyevedzanai",
  title: "Software Engineer & Solutions Consultant",
  summary: "High-value Software Engineer specializing in bridging legacy business systems with modern AI architectures. Proven track record in delivering measurable ROI, including 20% revenue preservation and 40% efficiency gains through strategic software consultancy and full-stack engineering.",
  yearsOfExperience: "Professional Engineering & Consultancy",
  skills: {
    programming: ["Python (Django)", "Java", "C#", "JavaScript (React)", "SQL"],
    erp: ["SAP S/4HANA Private Cloud Practitioner", "SAP HR/Payroll", "S4HANA Process Optimization"],
    tools: ["REST Framework", "Google Cloud API", "Vercel", "Git", "PostgreSQL", "Tailwind CSS"],
    business: ["Process Improvement", "ROI Analysis", "Workflow Automation", "Problem Analysis", "Technical Consultancy"]
  },
  experience: [
    {
      id: "aos",
      role: "Software Engineer",
      company: "Art of Scale",
      location: "Cape Town",
      duration: "April 2025 - November 2025",
      isCurrent: true,
      description: [
        "Architecting Python-based automation frameworks for high-growth SMEs.",
        "Optimizing complex business logic to handle scalable data structures.",
        "Consulting on digital transformation roadmaps for industrial stakeholders.",
        "Implementing automated reporting tools to track key performance indicators across distributed teams."
      ]
    },
    {
      id: "paint",
      role: "Solutions Consultant (NDA)",
      company: "SEAT",
      location: "Remote",
      duration: "October 2025",
      description: [
        "Preserved 20% of annual revenue by engineering a mission-critical API to migrate legacy flat-files to MySQL.",
        "Eliminated data silos that previously hindered decision-making and live analysis.",
        "Improved executive decision-making turnaround time by providing a live, queryable database environment."
      ]
    },
    {
      id: "cct",
      role: "Project Lead (Consultancy)",
      company: "City of Cape Town",
      location: "Cape Town",
      duration: "2025",
      description: [
        "Led process improvement analysis focusing on deep-seated workflow bottlenecks.",
        "Redesigned the SAP HR sick leave workflow, cutting turnaround time by 40% for city-wide personnel management.",
        "Applied problem analysis principles as a software consultant to resolve monthly backlogs."
      ]
    },
    {
      id: "sozo",
      role: "Software Engineer Intern",
      company: "SOZO Labs",
      location: "Stellenbosch",
      duration: "2024",
      description: [
        "Developed interactive game mechanics and backend logic for educational platforms.",
        "Optimized software performance for educational media in an Agile environment.",
        "Engineered Twitch-integrated social gaming elements, improving user engagement metrics."
      ],
      link: "https://tenke-keith.itch.io/on-edge",
      linkText: "View Game on Itch.io"
    },
    {
      id: "GLAMMYS EXECUTIVE SUITES",
      role: "Web Development Intern",
      company: "GLAMMYS PRY(LTD)",
      location: "Sandton",
      duration: "2024",
      description: [
        "Designed and deployed an AI-driven guest relations engine reducing manual inquiry response time.",
        "Engineered a secure administrative dashboard for price, description, and inventory management.",
        "Modernized the brand's digital presence with a mobile-first, refined UI compliant with current industry standards."
      ]
    }
  ],
  projects: [
    {
      id: "ai-reader",
      title: "AI Literacy & Pronunciation Tutor",
      description: "Capstone project assisting in literacy improvement. Uses Levenshtein distance for phoneme matching to provide real-time pronunciation feedback. Developed with Django and React.",
      tags: ["Django", "React", "RESTful", "Levenshtein Distance"],
      metrics: ["Real-time Phoneme Matching", "NLP Integration"],
      image: "/images/ai-reader.jpeg",
      github: "https://github.com/byTkeith"
    },
    {
      id: "biometric",
      title: "Guest Biometric Submission App",
      description: "Automated biometric and ID form completion app for building management. Cut wait times by 40%. Implemented Google API diversion for traffic management after HTTP portal changes.",
      tags: ["JavaScript", "Google API", "Vercel", "Automation"],
      metrics: ["40% Wait Time Reduction", "Building Mgmt Automation"],
      image: "/images/biometric.jpeg",
      link: "https://tenke-inginuity-guest-registration.vercel.app/"
    },
    {
      id: "ai-accommodation",
      title: "AI Guest Relations Engine",
      description: "A refined accommodation website featuring an AI engine where guests receive intelligent, instant replies about booking and facilities.",
      tags: ["AI Engine", "Secure Login", "Admin Dashboard"],
      metrics: ["Secure Price Management", "Automated Guest Support"],
      image: "/images/accommodation.jpeg",
      link: "https://glammys-website.vercel.app/"
    },
    {
      id: "proj-mgmt-csharp",
      title: "Enterprise Project Management Tool",
      description: "Custom management tool using C#, Next.js, and MySQL to track employees, resource allocation, and automated salary/payroll tracking.",
      tags: ["C#", "Next.js", "MySQL", "Salary Tracking"],
      metrics: ["Employee Allocation", "Payroll Automation"]
    },
    {
      id: "hotel-mgmt",
      title: "Hotel Management & Booking System",
      description: "Robust hotel system for handling real-time bookings, guest allocation, and comprehensive service management.",
      tags: ["Full Stack", "Hospitality", "Booking Engine"],
      metrics: ["Booking Logic", "Service Tracking"]
    }
  ],
  certifications: [
    { id: "c1", name: "SAP S/4HANA Private Cloud Practitioner", issuer: "SAP", date: "2025" },
    { id: "c2", name: "S4HANA Training", issuer: "SAP", date: "2025" },
    { id: "c3", name: "Advanced SQL for Data Science", issuer: "UCT", date: "2024" }
  ],
  honors: [
    { id: "h1", title: "20% Revenue Preservation", description: "Recognized for high-impact legacy system migration and API implementation for SEAT.", date: "2025" },
    { id: "h2", title: "Process Improvement Excellence", description: "Lead consultant for City of Cape Town workflow optimization cutting turnaround by 40%.", date: "2024" }
  ],
  socials: {
    github: "https://github.com/byTkeith",
    linkedin: "https://www.linkedin.com/in/tendai-nyevedzanai-261007232/",
    email: "keithsolo.sav@gmail.com",
    profileImage: "/images/me.jpeg"
  }
};
