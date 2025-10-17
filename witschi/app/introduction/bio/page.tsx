import Link from "next/link";
import Image from "next/image";

export default function Bio() {
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
            <h1 className="text-4xl font-medium mb-8">Bio</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                I am a CS and Spanish double major at the University of
                Michigan, minoring in Global Media Studies. I am passionate
                about tech that genuinely helps people.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Sometimes annoying film buff, avid/occasional reader depending
                on the time of year, biking enjoyer, and composting enthusiast.
              </p>
              <p className="text-lg leading-relaxed">
                Currently exploring the intersection of technology, media, and
                human connection through various projects and research.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/headshot1.jpg"
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
