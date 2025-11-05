import Link from "next/link";
import Image from "next/image";

export default function Infatrode() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-medium mb-8">Infatrode</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Built during MHacks 25, Infatrode started as a link map of
                knowledge for Michigan students, using TF-IDF similarity
                scoring, mixed with random node placement, and a custom physics
                engine to connect nodes.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Now, it has evolved into a community-driven platform for
                crafting meaningful connections. Enables users to manually
                establish connections, add nodes, and explore relationships
                through interactive visualization.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                The infatrode site drops the algorithm and fosters organic
                community growth and strengthens existing relationships through
                the power of intentional, human-curated networks.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  "Svelte",
                  "JavaScript",
                  "SVG",
                  "Vite",
                  "Supabase (PostgreSQL)",
                  "Node.js",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href="https://infatrode.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                View Project →
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/infatrode.png"
              alt="Infatrode"
              width={400}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}






