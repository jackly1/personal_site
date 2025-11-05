import Link from "next/link";
import Image from "next/image";

export default function About() {
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
            <h1 className="text-4xl font-medium mb-8">About</h1>
            <div className="prose prose-lg max-w-none">
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Education</h3>
                <p className="text-lg leading-relaxed">
                  University of Michigan, Ann Arbor
                  <br />
                  Computer Science & Spanish Double Major
                  <br />
                  Global Media Studies Minor
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Location</h3>
                <p className="text-lg leading-relaxed">
                  Currently in Ann Arbor, MI
                  <br />
                  Originally from New York, NY
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Interests</h3>
                <ul className="text-lg leading-relaxed space-y-2">
                  <li>• Technology that genuinely helps people</li>
                  <li>• Film and media studies</li>
                  <li>• Reading and literature</li>
                  <li>• Biking and sustainable transportation</li>
                  <li>• Environmental consciousness</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/headshot2.jpg"
              alt="Jack Lille Yerington"
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}






