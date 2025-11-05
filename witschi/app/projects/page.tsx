import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/types";

const projects: Project[] = [
  {
    id: "1",
    title: "Infatrode",
    description:
      "Built during MHacks 25, Infatrode started as a link map of knowledge for Michigan students, using TF-IDF similarity scoring, mixed with random node placement, and a custom physics engine to connect nodes. Now, it has evolved into a community-driven platform for crafting meaningful connections. Enables users to manually establish connections, add nodes, and explore relationships through interactive visualization. The infatrode site drops the algorithm and fosters organic community growth and strengthens existing relationships through the power of intentional, human-curated networks.",
    image: "/infatrode.png",
    technologies: [
      "Svelte",
      "JavaScript",
      "SVG",
      "Vite",
      "Supabase (PostgreSQL)",
      "Node.js",
    ],
    link: "https://infatrode.vercel.app/",
  },
  {
    id: "2",
    title: "PeteCode",
    description:
      "AI-powered interactive web tool that solves LeetCode problems with in-depth audio explanations for enhanced learning, a commentary on short form media consumption.",
    image: "/small_peter.jpg",
    technologies: ["Python", "TypeScript", "React", "Django", "BAML"],
    github: "https://github.com/jackly1/petecode",
  },
  {
    id: "3",
    title: "Match Cut",
    description:
      "A site that matches film stills to an input image, a practice in merging my coursework in Computer Vision and Web Systems.",
    image: "/cleo.jpg",
    technologies: [
      "Python",
      "Flask",
      "TensorFlow",
      "ResNet50",
      "scikit-learn",
      "OpenCV",
      "Google Drive API",
    ],
    inProgress: true,
  },
  {
    id: "4",
    title: "This Site v2",
    description:
      "A 3D re-imagining of my personal website. A man rides a bike through the forest, stopping at each interest as a landmark.",
    image: "/bike_boy.jpg",
    technologies: ["Spline", "Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    inProgress: true,
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          back to home
        </Link>

        <h1 className="text-4xl font-medium mb-12">Projects</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-lg p-6 hover:bg-accent transition-colors"
            >
              <div className="aspect-video mb-4 relative overflow-hidden rounded-md">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-medium mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-sm rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    View Project →
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    GitHub →
                  </a>
                )}
                {project.inProgress && (
                  <span className="text-muted-foreground">In Progress</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}






