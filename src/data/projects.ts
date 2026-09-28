export type Project = {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  github: string | null;
  demo: string | null;
  images?: string[];
};

export const projects: Project[] = [
  {
    title: "CTF Proxmoxer",
    slug: "ctf-proxmoxer",
    description:
      "A platform for automated CTF challenge deployment, using FastAPI, Proxmox VE, and Ansible to provision and manage challenge infrastructure as code.",
    tags: ["Python", "FastAPI", "Ansible", "Proxmox"],
    images: ["/projects/ctf-proxmoxer/proxmoxer.png", "/projects/ctf-proxmoxer/ctfd-plugin.png", "/projects/ctf-proxmoxer/ctfd-plugin-2.png"],
    github: "https://github.com/penicili/ctf-proxmoxer",
    demo: null,
  },
  {
    title: "MyShortlink",
    slug: "myshortlink",
    description:
      "A lightweight URL-shortening API and deployment exercise focused on CI/CD pipelines and Kubernetes.",
    tags: ["Kubernetes", "Jenkins", "GitHub Actions", "ArgoCD", "Backstage"],
    github: "https://github.com/penicili/myshortlink",
    demo: null,
  },
  {
    title: "HRIS",
    slug: "some-hris-anu",
    description: "[Work In Progress] HRIS web app, developed to practice TS and CI/CD",
    tags: ["TypeScript", "Express.JS", "Github Actions", "ArgoCD"],
    github: "https://github.com/penicili/hris-backend",
    demo: null,
  },
  {
    title: "Nightnetwork",
    slug: "nightnetwork",
    description:
      "A CMS-backed landing and store site for a Minecraft server, built with Astro and deployed on Netlify.",
    tags: ["Astro", "Netlify"],
    images: ["/projects/nightnewtork/nightnetwork.png", "/projects/nightnewtork/nightnetwork-guides.png", "/projects/nightnewtork/nightnetwork-guidesview.png"],
    github: "https://github.com/night-network-mc/nightnetwork-landing",
    demo: "https://nightnetwork-dev.netlify.app/",
  },
  {
    title: "weather app react",
    slug: "some-weather-react",
    description:
      "Simple React App that fetches openmeteo API, built to practice react",
    tags: ["React", "Javascript"],
    github: null,
    demo: "https://weatherreact.hibagas.my.id/",
    images: ["/projects/weather-react/weather.png"],
  },
  {
    title: "habituals",
    slug: "react-habit-tracker",
    description: "Simple habit tracker app, built to practice react",
    tags: ["React", "Javascript"],
    images: ["/projects/habituals/habituals.png", "/projects/habituals/habitualscreate.png", "/projects/habituals/habitualsstats.png"],
    github: null,
    demo: "https://habituals.hibagas.my.id/",
  },
  {
    title: "Auth Service",
    slug: "auth-service",
    description:
      "A TypeScript authentication service built with Express and MongoDB.",
    tags: ["Express", "MongoDB", "TypeScript"],
    github: "https://github.com/penicili/auth-service/",
    demo: null,
  },
  {
    title: "Learning Analytics Dashboard",
    slug: "learning-analytics-dashboard",
    description:
      "A FastAPI backend for a learning analytics dashboard, developed as part of my capstone project.",
    tags: ["Python", "FastAPI"],
    github: "https://github.com/penicili/capstone-backend",
    demo: null,
  },
  {
    title: "Freshleaf Laundry",
    slug: "freshleaf-laundry",
    description:
      "A Laravel website for Freshleaf Laundry, created to present the business and its services online.",
    tags: ["Laravel"],
    github: "https://github.com/FreshLeaf-Laundry/FreshLeaf",
    demo: null,
  },
];
