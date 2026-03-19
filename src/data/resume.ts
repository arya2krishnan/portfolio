export const personalInfo = {
  name: "Arya Krishnan",
  title: "Software Engineer",
  location: "San Francisco, CA",
  email: "aryakrishnan@berkeley.edu",
  phone: "(510)-309-4693",
  linkedin: "https://linkedin.com/in/arya2krishnan",
  github: "https://github.com/arya2krishnan",
};

export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  bullets: string[];
  logo?: string;
}

export const experiences: Experience[] = [
  {
    company: "Atlassian",
    location: "San Francisco, CA",
    role: "Software Engineer",
    period: "Jul 2024 - Present",
    bullets: [
      "Orchestrated the 0-to-1 development and GA launch of Atlassian Focus, scaling to 90+ Tier-1 Enterprise customers with sustained 4% WoW growth in MAUs.",
      "Architected an end-to-end Strategic Event Management platform using Java Spring Boot and GraphQL, automating executive-level resource allocation and saving 240 hours per planning cycle.",
      "Pioneered team-wide AI initiatives by integrating Cursor and RovoDev into the dev lifecycle, reducing manual coding tasks by 35% and mentoring the engineering org on AI-augmented workflows.",
      "Engineered high-impact features including 'AI Insights' and 'Custom Fields' for Focus Areas, leveraging Generative AI to synthesize project data.",
      "Owned full-stack feature delivery from backend API design to React frontend implementation, maintaining a high-velocity release schedule.",
      "Resolved high-priority Sev 2 and 3 incidents as on-call lead, preventing over $10,000 in operational losses.",
    ],
  },
  {
    company: "Atlassian",
    location: "San Francisco, CA",
    role: "Software Engineering Intern",
    period: "May 2023 - Aug 2023",
    bullets: [
      "Drove the migration of Enterprise Cloud Trial Licenses API to a new microservice; re-engineered code from Express JS to Koa JS.",
      "Set up Bitbucket CI/CD pipelines to deploy to dev, staging, and production environments; configured Docker containers and assets.",
      "Tackled React component design tickets and set up NGINX redirects for experiments on Buyer Experience on atlassian.com.",
    ],
  },
  {
    company: "Amazon AWS",
    location: "Berkeley, CA",
    role: "Software Development Engineering Intern",
    period: "Jan 2023 - Apr 2023",
    bullets: [
      "Designed and iterated over a new version of an internal EC2 API providing more granular service routing.",
      "New API maps EC2 resource IDs to zone-cell information, enhancing routing precision and optimizing operational efficiency of EC2 instances.",
    ],
  },
  {
    company: "Amazon AWS",
    location: "Seattle, WA",
    role: "Software Development Engineering Intern",
    period: "May 2022 - Aug 2022",
    bullets: [
      "Engineered a legacy data pipeline and UI workflow for an AWS EC2 internal tooling platform assisting 150+ customers.",
      "Built tools to view, modify, and verify configuration values using DynamoDB, Guice, and Mockito testing in NodeJS.",
      "Collaborated in a SCRUM development environment to create a comprehensive full-stack product.",
    ],
  },
  {
    company: "Venture Strategy Solutions",
    location: "Berkeley, CA",
    role: "Internal Vice President / Project Manager / Consultant",
    period: "Jan 2021 - May 2024",
    bullets: [
      "Board Member aiding executives with decision-making, training new members, and leading recruitment.",
      "Managed $63,000 in funds for community events and led DEI recruitment initiatives for URM applicants.",
      "Oversaw 5 consultants for fintech startup Pipe ($2B valuation) to devise a recurring revenue analytics product and go-to-market strategy.",
      "Engineered a cost-optimization model in Python for Imperfect Foods trained on 1.8M+ rows of delivery and shipping data.",
    ],
  },
];

export interface Project {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  link?: string;
  award?: string;
  logo?: string;
}

export const projects: Project[] = [
  {
    name: "OddsOn",
    tagline: "Peer-to-Peer Challenge App",
    logo: "/images/oddson.png",
    description:
      "Social challenge app built with React Native + Expo where friends create and share custom challenges. Serverless backend on AWS Amplify Gen 2 with multi-environment deployment, Twilio Verify auth, and OpenAI-powered challenge generation from live sports APIs.",
    tech: ["React Native", "Expo", "AWS Amplify", "GraphQL", "Twilio", "OpenAI"],
    link: "https://www.oddson.app/",
  },
  {
    name: "Cafe Gough",
    tagline: "Point of Sale System",
    logo: "/images/react-pos.png",
    description:
      "Full-stack POS web app for a home cafe featuring dynamic ordering, cart management via Zustand, real-time shop status, Firebase backend with image uploads, admin auth, and automated SMS notifications via Twilio.",
    tech: ["React", "Node.js", "Firebase", "Zustand", "Twilio", "GitHub Actions"],
    link: "https://cafe-pos-gough.web.app/pos",
  },
  {
    name: "PubGolfer",
    tagline: "AI-Powered Pub Golf",
    logo: "/images/pubgolfer.png",
    description:
      "Real-time multiplayer pub golf game with Firebase Realtime Database. Multi-stage Gemini pipeline with Google Search grounding to discover bars, curate themed routes, and assign drink challenges.",
    tech: ["TypeScript", "Firebase", "Gemini AI", "Google Search"],
    link: "https://www.pubgolfer.com/",
  },
  {
    name: "Chat App Template",
    tagline: "Open-Source MERN Chat",
    description:
      "Open-source MERN stack chat application template, currently being used to develop an online chat-based version of the card game Taboo.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    link: "https://github.com/arya2krishnan/chat-skeleton",
  },
  {
    name: "COVID-19 Predictor Bot",
    tagline: "Discord Bot",
    description:
      "Bot using multiple regression to predict daily COVID-19 cases and an estimated end date. Used by 100+ users across 10+ Discord servers.",
    tech: ["Python", "Discord.py", "Machine Learning"],
    link: "https://github.com/arya2krishnan/covidPredictorBot",
    award: "UC Berkeley IEEE Open Hacks - 3rd Place",
  },
];

export interface Skill {
  name: string;
  proficient: boolean;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", proficient: true },
      { name: "Java", proficient: true },
      { name: "TypeScript", proficient: true },
      { name: "Kotlin", proficient: true },
      { name: "C#", proficient: false },
      { name: "SQL", proficient: false },
      { name: "Swift", proficient: false },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "React", proficient: true },
      { name: "Node.js", proficient: true },
      { name: "GraphQL", proficient: true },
      { name: "Express", proficient: true },
      { name: "Koa.js", proficient: true },
      { name: "React Native", proficient: false },
      { name: "Spring Boot", proficient: false },
    ],
  },
  {
    category: "Cloud & Infrastructure",
    skills: [
      { name: "AWS", proficient: true },
      { name: "GCP", proficient: true },
      { name: "Azure", proficient: true },
      { name: "Docker", proficient: true },
      { name: "Firebase", proficient: true },
      { name: "MongoDB", proficient: true },
    ],
  },
  {
    category: "AI & Tools",
    skills: [
      { name: "Gemini", proficient: true },
      { name: "Claude", proficient: true },
      { name: "Codex", proficient: true },
      { name: "Git", proficient: true },
    ],
  },
];

export const education = {
  school: "University of California, Berkeley",
  degrees: ["B.A. Computer Science", "B.A. Economics"],
  graduation: "May 2024",
  coursework: [
    "AI and Machine Learning",
    "Computer Security",
    "Efficient Algorithms",
    "Data Structures",
    "Discrete Math & Probability",
    "Data Science",
    "Machine Structures",
    "Operating Systems",
    "Econometrics",
    "Behavioral Economics",
    "Financial Economics",
    "Public Economics",
  ],
};

export interface Hobby {
  name: string;
  icon: string;
}

export const hobbies: Hobby[] = [
  { name: "DJing", icon: "disc" },
  { name: "Music Production", icon: "music" },
  { name: "Coffee", icon: "coffee" },
  { name: "Cooking", icon: "cooking" },
  { name: "Hiking", icon: "mountain" },
  { name: "Drums & Guitar", icon: "guitar" },
  { name: "Basketball", icon: "basketball" },
  { name: "Swimming", icon: "waves" },
];

export interface TravelDestination {
  location: string;
  country: string;
  placeholder: string;
}

export const travels: TravelDestination[] = [
  { location: "Tokyo, Kyoto & Osaka", country: "Japan", placeholder: "Travel photo placeholder" },
  { location: "Phuket", country: "Thailand", placeholder: "Travel photo placeholder" },
  { location: "Kuala Lumpur", country: "Malaysia", placeholder: "Travel photo placeholder" },
  { location: "Singapore", country: "Singapore", placeholder: "Travel photo placeholder" },
  { location: "Bali", country: "Indonesia", placeholder: "Travel photo placeholder" },
  { location: "Chennai & Bangalore", country: "India", placeholder: "Travel photo placeholder" },
  { location: "New York", country: "USA", placeholder: "Travel photo placeholder" },
  { location: "Chicago", country: "USA", placeholder: "Travel photo placeholder" },
  { location: "San Francisco", country: "USA", placeholder: "Travel photo placeholder" },
  { location: "Seattle", country: "USA", placeholder: "Travel photo placeholder" },
  { location: "Manuel Antonio", country: "Costa Rica", placeholder: "Travel photo placeholder" },
  { location: "Hawaii", country: "USA", placeholder: "Travel photo placeholder" },
];
