interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageSrc: string;
  imageAlt: string;
  link?: string;
  linkLabel?: string;
  github?: string;
  inProgress?: boolean;
}

const projects: Project[] = [
  {
    title: 'repertory.nyc',
    imageSrc: '/static/projects/repertory.jpg',
    imageAlt: 'repertory.nyc',
    description:
      'A site built out of my love for the New York arthouse/independent film scene. repertory.nyc aggregates screenings across different independent theaters in the city, allowing for easier navigation and discovery of the beauty that is New York film.',
    technologies: [
      'Rust',
      'Axum',
      'JavaScript',
      'HTML/CSS',
      'SVG',
      'PostgreSQL',
      'Railway',
      'Vercel',
    ],
    link: 'https://repertory.nyc',
    linkLabel: 'View site',
  },
  {
    title: 'Infatrode',
    imageSrc: '/static/projects/infatrode.png',
    imageAlt: 'Infatrode',
    description:
      'Built during MHacks 25, Infatrode started as a link map of knowledge for Michigan students, using TF-IDF similarity scoring, mixed with random node placement, and a custom physics engine to connect nodes. Now, it has evolved into a dynamic, community-driven platform for crafting meaningful connections. Enables users to manually establish connections, add nodes, and explore relationships through interactive visualization. The infatrode site drops the algorithm and fosters organic community growth and strengthens existing relationships through the power of intentional, human-curated networks.',
    technologies: [
      'Svelte',
      'JavaScript',
      'SVG',
      'Vite',
      'Supabase (PostgreSQL)',
      'Node.js',
    ],
    link: 'https://infatrode.vercel.app/',
    linkLabel: 'View site',
  },
  {
    title: 'PeteCode',
    imageSrc: '/static/projects/petecode.jpg',
    imageAlt: 'PeteCode',
    description:
      'AI-powered interactive web tool that solves LeetCode problems with in-depth audio explanations for enhanced learning, a commentary on short form media consumption.',
    technologies: ['Python', 'TypeScript', 'React', 'Django', 'BAML'],
    github: 'https://github.com/jackly1/petecode',
    linkLabel: 'View Github',
  },
  {
    title: 'Match Cut',
    imageSrc: '/static/projects/match_cut.jpg',
    imageAlt: 'Match Cut',
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
];

export default function ProjectsPage() {
  return (
      <main className="flex min-h-0 flex-1 flex-col">
          <div className="px-6 pb-20 pt-10 md:px-12 md:pt-18">
              <div className="mx-auto max-w-5xl">
                  <h2 className="mb-4 text-2xl font-bold text-neutral-800 md:mb-5">
                      Projects
                  </h2>

                  <div className="space-y-16">
                      {projects.map((project, i) => (
                          <article
                              key={project.title}
                              className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12 lg:gap-16"
                          >
                              <div className="min-w-0 max-w-xl flex-1 md:pt-1">
                                  <div className="mb-4 flex flex-wrap items-baseline gap-4">
                                      <span className="font-mono text-xs font-bold tabular-nums text-neutral-500">
                                          {String(i + 1).padStart(2, "0")}
                                      </span>
                                      <h3 className="text-lg font-bold text-neutral-900">
                                          {project.title}
                                      </h3>
                                      {project.inProgress && (
                                          <span className="rounded-full border border-neutral-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-neutral-600">
                                              In-Progress
                                          </span>
                                      )}
                                  </div>

                                  <div className="mb-4 flex flex-wrap gap-2">
                                      {project.technologies.map((tech) => (
                                          <span
                                              key={tech}
                                              className="rounded bg-neutral-200 px-2 py-1 text-[11px] font-semibold text-neutral-600"
                                          >
                                              {tech}
                                          </span>
                                      ))}
                                  </div>

                                  <p className="mb-4 text-neutral-600 leading-relaxed">
                                      {project.description}
                                  </p>

                                  <div className="flex gap-5 text-sm">
                                      {project.link && (
                                          <a
                                              href={project.link}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-800"
                                          >
                                              {project.linkLabel ?? "View site"}
                                          </a>
                                      )}
                                      {project.github && (
                                          <a
                                              href={project.github}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-neutral-500 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-800"
                                          >
                                              {project.linkLabel ?? "GitHub"}
                                          </a>
                                      )}
                                  </div>
                              </div>

                              <div className="mx-auto w-full shrink-0 md:mx-0 md:w-[min(100%,420px)] lg:w-[min(100%,520px)]">
                                  <div className="overflow-hidden bg-neutral-100 ring-1 ring-neutral-200/80">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img
                                          src={project.imageSrc}
                                          alt={project.imageAlt}
                                          className="h-auto w-full object-contain"
                                      />
                                  </div>
                              </div>
                          </article>
                      ))}
                  </div>
              </div>
          </div>
      </main>
  );
}
