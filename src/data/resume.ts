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

export interface TravelPhoto {
  src: string;
  alt: string;
  type: "image" | "video";
}

export interface TravelDestination {
  location: string;
  country: string;
  photos: TravelPhoto[];
}

const BLOB = "https://x2gu29gptmtx0gyc.public.blob.vercel-storage.com";

export const travels: TravelDestination[] = [
  {
    location: "Tokyo, Kyoto & Osaka", country: "Japan", photos: [
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/1.jpg`, alt: "Japan 1", type: "image" },
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/2.jpg`, alt: "Japan 2", type: "image" },
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/3.jpg`, alt: "Japan 3", type: "image" },
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/4.jpg`, alt: "Japan 4", type: "image" },
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/5.jpg`, alt: "Japan 5", type: "image" },
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/6.jpg`, alt: "Japan 6", type: "image" },
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/7.jpg`, alt: "Japan 7", type: "image" },
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/8.jpg`, alt: "Japan 8", type: "image" },
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/9.MP4.mp4`, alt: "Japan video 1", type: "video" },
      { src: `${BLOB}/travel/tokyo_kyoto_osaka/10.MP4.mp4`, alt: "Japan video 2", type: "video" },
    ],
  },
  {
    location: "Phuket", country: "Thailand", photos: [
      { src: `${BLOB}/travel/phuket/1.jpg`, alt: "Phuket 1", type: "image" },
      { src: `${BLOB}/travel/phuket/2.jpg`, alt: "Phuket 2", type: "image" },
      { src: `${BLOB}/travel/phuket/3.jpg`, alt: "Phuket 3", type: "image" },
      { src: `${BLOB}/travel/phuket/4.jpg`, alt: "Phuket 4", type: "image" },
      { src: `${BLOB}/travel/phuket/5.jpg`, alt: "Phuket 5", type: "image" },
    ],
  },
  {
    location: "Kuala Lumpur", country: "Malaysia", photos: [
      { src: `${BLOB}/travel/kuala_lampur/1.jpg`, alt: "KL 1", type: "image" },
      { src: `${BLOB}/travel/kuala_lampur/2.jpg`, alt: "KL 2", type: "image" },
      { src: `${BLOB}/travel/kuala_lampur/3.jpg`, alt: "KL 3", type: "image" },
      { src: `${BLOB}/travel/kuala_lampur/4.jpg`, alt: "KL 4", type: "image" },
    ],
  },
  {
    location: "Singapore", country: "Singapore", photos: [
      { src: `${BLOB}/travel/singapore/1.jpg`, alt: "Singapore 1", type: "image" },
      { src: `${BLOB}/travel/singapore/2.jpg`, alt: "Singapore 2", type: "image" },
      { src: `${BLOB}/travel/singapore/3.jpg`, alt: "Singapore 3", type: "image" },
      { src: `${BLOB}/travel/singapore/3.mp4`, alt: "Singapore video", type: "video" },
      { src: `${BLOB}/travel/singapore/4.jpg`, alt: "Singapore 4", type: "image" },
    ],
  },
  {
    location: "Bali", country: "Indonesia", photos: [
      { src: `${BLOB}/travel/bali/2.jpg`, alt: "Bali 2", type: "image" },
      { src: `${BLOB}/travel/bali/3.MP4.mp4`, alt: "Bali video 1", type: "video" },
      { src: `${BLOB}/travel/bali/4.png`, alt: "Bali 4", type: "image" },
      { src: `${BLOB}/travel/bali/5.jpg`, alt: "Bali 5", type: "image" },
      { src: `${BLOB}/travel/bali/6.jpg`, alt: "Bali 6", type: "image" },
      { src: `${BLOB}/travel/bali/7.jpg`, alt: "Bali 7", type: "image" },
      { src: `${BLOB}/travel/bali/8.jpg`, alt: "Bali 8", type: "image" },
      { src: `${BLOB}/travel/bali/9.MP4.mp4`, alt: "Bali video 2", type: "video" },
      { src: `${BLOB}/travel/bali/1.jpg`, alt: "Bali 1", type: "image" },
    ],
  },
  {
    location: "Chennai & Bangalore", country: "India", photos: [
      { src: `${BLOB}/travel/chennai_bangalore/1.jpg`, alt: "India 1", type: "image" },
      { src: `${BLOB}/travel/chennai_bangalore/2.jpg`, alt: "India 2", type: "image" },
    ],
  },
  {
    location: "New York", country: "USA", photos: [
      { src: `${BLOB}/travel/new_york/1.jpg`, alt: "NYC 1", type: "image" },
      { src: `${BLOB}/travel/new_york/2.jpg`, alt: "NYC 2", type: "image" },
      { src: `${BLOB}/travel/new_york/3.jpg`, alt: "NYC 3", type: "image" },
    ],
  },
  {
    location: "Chicago", country: "USA", photos: [
      { src: `${BLOB}/travel/chicago/1.jpg`, alt: "Chicago 1", type: "image" },
      { src: `${BLOB}/travel/chicago/2.MP4.mp4`, alt: "Chicago video", type: "video" },
      { src: `${BLOB}/travel/chicago/3.jpg`, alt: "Chicago 3", type: "image" },
      { src: `${BLOB}/travel/chicago/4.jpg`, alt: "Chicago 4", type: "image" },
      { src: `${BLOB}/travel/chicago/5.jpg`, alt: "Chicago 5", type: "image" },
    ],
  },
  {
    location: "San Francisco", country: "USA", photos: [
      { src: `${BLOB}/travel/san_francisco/1.jpg`, alt: "SF 1", type: "image" },
      { src: `${BLOB}/travel/san_francisco/2.jpg`, alt: "SF 2", type: "image" },
      { src: `${BLOB}/travel/san_francisco/3.jpg`, alt: "SF 3", type: "image" },
    ],
  },
  {
    location: "Seattle", country: "USA", photos: [
      { src: `${BLOB}/travel/seattle/1.jpg`, alt: "Seattle 1", type: "image" },
      { src: `${BLOB}/travel/seattle/2.jpg`, alt: "Seattle 2", type: "image" },
      { src: `${BLOB}/travel/seattle/3.jpg`, alt: "Seattle 3", type: "image" },
    ],
  },
  {
    location: "Manuel Antonio", country: "Costa Rica", photos: [
      { src: `${BLOB}/travel/manuel_antonio/1.jpg`, alt: "Costa Rica 1", type: "image" },
      { src: `${BLOB}/travel/manuel_antonio/2.jpg`, alt: "Costa Rica 2", type: "image" },
      { src: `${BLOB}/travel/manuel_antonio/3.MOV.mp4`, alt: "Costa Rica video 1", type: "video" },
      { src: `${BLOB}/travel/manuel_antonio/4.MOV.mp4`, alt: "Costa Rica video 2", type: "video" },
      { src: `${BLOB}/travel/manuel_antonio/5.MOV.mp4`, alt: "Costa Rica video 3", type: "video" },
    ],
  },
  {
    location: "Hawaii", country: "USA", photos: [
      { src: `${BLOB}/travel/hawaii/1.jpg`, alt: "Hawaii 1", type: "image" },
      { src: `${BLOB}/travel/hawaii/2.jpg`, alt: "Hawaii 2", type: "image" },
      { src: `${BLOB}/travel/hawaii/3.jpg`, alt: "Hawaii 3", type: "image" },
    ],
  },
];
