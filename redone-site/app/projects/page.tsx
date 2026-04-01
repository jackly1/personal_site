import PageHeader from '@/components/PageHeader';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  inProgress?: boolean;
}

const projects: Project[] = [
  {
    title: 'Infatrode',
    description:
      'Built during MHacks 25, Infatrode started as a link map of knowledge for Michigan students, using TF-IDF similarity scoring, mixed with random node placement, and a custom physics engine to connect nodes. Now, it has evolved into a community-driven platform for crafting meaningful connections.',
    technologies: [
      'Svelte',
      'JavaScript',
      'SVG',
      'Vite',
      'Supabase (PostgreSQL)',
      'Node.js',
    ],
    link: 'https://infatrode.vercel.app/',
  },
  {
    title: 'PeteCode',
    description:
      'AI-powered interactive web tool that solves LeetCode problems with in-depth audio explanations for enhanced learning, a commentary on short form media consumption.',
    technologies: ['Python', 'TypeScript', 'React', 'Django', 'BAML'],
    github: 'https://github.com/jackly1/petecode',
  },
  {
    title: 'Match Cut',
    description:
      'A site that matches film stills to an input image, a practice in merging my coursework in Computer Vision and Web Systems.',
    technologies: [
      'Python',
      'Flask',
      'TensorFlow',
      'ResNet50',
      'scikit-learn',
      'OpenCV',
      'Google Drive API',
    ],
    inProgress: true,
  },
  {
    title: 'This Site v2',
    description:
      'A 3D re-imagining of my personal website. A man rides a bike through the forest, stopping at each interest as a landmark.',
    technologies: [
      'Spline',
      'Next.js',
      'TypeScript',
      'Prisma',
      'PostgreSQL',
    ],
    inProgress: true,
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <PageHeader />

      <div className="px-6 md:px-12 pb-20 max-w-3xl">
        <h2 className="text-2xl font-light mb-12 text-neutral-800">Projects</h2>

        <div className="space-y-16">
          {projects.map((project, i) => (
            <article key={i} className="group">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-xs text-neutral-400 font-mono tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-medium text-neutral-900">
                  {project.title}
                </h3>
                {project.inProgress && (
                  <span className="text-[10px] uppercase tracking-wider text-neutral-400 border border-neutral-300 px-2 py-0.5 rounded-full">
                    In progress
                  </span>
                )}
              </div>

              <p className="text-neutral-500 leading-relaxed mb-4 ml-9">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4 ml-9">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] text-neutral-400 bg-neutral-100 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-5 ml-9 text-sm">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 underline underline-offset-4 decoration-neutral-300 hover:text-neutral-800 transition-colors"
                  >
                    View site
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-500 underline underline-offset-4 decoration-neutral-300 hover:text-neutral-800 transition-colors"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
