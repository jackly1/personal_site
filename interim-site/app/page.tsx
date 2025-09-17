import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Items from "@/components/Items";
import Projects from "@/components/Projects";
import { PostHogTest } from "@/components/PostHogTest";
import type { PersonalInfo, Project, PersonalItem } from "@/lib/types";

const personalInfo: PersonalInfo = {
  name: "Jack Lille Yerington",
  title: "CS Senior @ University of Michigan",
  bio: "I am a CS and Spanish double major at the Univeristy of Michigan, minoring in Global Media Studies. I am passionate about tech that genuinely helps people. Sometimes annoying film buff, avid/occasional reader depending on the time of year, biking enjoyer, and composting enthusiast.",
  email: "jacklilleyerington@gmail.com",
  location: "Ann Arbor, MI",
  hometown: "New York, NY",
  avatar: "/headshot2.jpg",
};

const personalItems: PersonalItem[] = [
  {
    label: "Letterboxd",
    appicon: "/uncle_yanco_still.jpg",
    link: "https://letterboxd.com/jack1y/",
  },
  {
    label: "Goodreads",
    appicon: "/Italo-Calvino.jpg",
    link: "https://www.goodreads.com/user/show/158036909-jack-lille-yerington/",
  },
];

const projects: Project[] = [
  {
    id: "1",
    title: "PeteCode",
    description:
      "AI-powered interactive web tool that solves LeetCode problems with in-depth audio explanations for enhanced learning.",
    image: "/small_peter.jpg",
    technologies: ["Python", "TypeScript", "React", "Django", "BAML"],
    // link: "https://devpost.com/software/petecode",
    github: "https://github.com/jackly1/petecode",
  },
  {
    id: "2",
    title: "Match Cut",
    description:
      "A site that matches film stills to an input image, a practice in Computer Vision.",
    image: "/cleo.jpg",
    technologies: ["Python", "OpenCV", "MediaPipe", "scikit-learn"],
    inProgress: true,
    // link: "https://github.com/example",
  },
  {
    id: "3",
    title: "This Site v2",
    description:
      "A 3D re-imagining of my personal website. A man rides a bike through the forest, stopping at each interest as a landmark.",
    image: "/bike_boy.jpg",
    technologies: ["Spline", "Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    inProgress: true,
    // link: "https://github.com/example",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-4xl mx-auto px-6">
        <Hero personalInfo={personalInfo} />
        <About personalInfo={personalInfo} />
        <Projects projects={projects} />
        <Items personalItems={personalItems} />

        {/* PostHog Test - Remove after verification */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">PostHog Status</h3>
          <PostHogTest />
        </div>
      </main>
    </div>
  );
}
