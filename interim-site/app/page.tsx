import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Items from "@/components/Items";
import Projects from "@/components/Projects";
import type { PersonalInfo, Project, PersonalItem } from "@/lib/types";

const personalInfo: PersonalInfo = {
  name: "Jack Lille Yerington",
  title: "CS Senior @ University of Michigan",
  bio: "I am a CS and Spanish double major at the Univeristy of Michigan, minoring in Global Media Studies. I am passionate about tech that genuinely helps people. Sometimes annoying film buff, biking enjoyer, and composting enthusiast.",
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
      "Interactive web tool that solves LeetCode problems with in-depth explanations by a familiar voice interface (e.g. Peter Griffin) for enhanced learning.",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["Python", "TypeScript", "React", "Django", "BAML"],
    // link: "https://example.com",
    github: "https://github.com/jackly1/petecode",
  },
  {
    id: "2",
    title: "Letterboxd",
    description: "Log of all films (in recent years) I have seen.",
    image: "/placeholder.svg?height=200&width=300",
    technologies: ["React", "D3.js", "Node.js"],
    link: "https://letterboxd.com/jack1y/",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="max-w-4xl mx-auto px-6">
        <Hero personalInfo={personalInfo} />
        <About personalInfo={personalInfo} />
        <Items personalItems={personalItems} />
        <Projects projects={projects} />
      </main>
    </div>
  );
}
