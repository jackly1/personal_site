import Link from "next/link";
import Image from "next/image";

export default function Letterboxd() {
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
            <h1 className="text-4xl font-medium mb-8">Letterboxd</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                My film diary and review platform. I track every movie I watch,
                rate them, and write reviews about the ones that particularly
                move me or make me think.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                From classic cinema to contemporary experimental works, I'm
                passionate about exploring the full spectrum of film as an art
                form and cultural medium.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Follow my cinematic journey and discover films through my
                curated lists and reviews.
              </p>
              <a
                href="https://letterboxd.com/jack1y/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                Visit My Letterboxd →
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/uncle_yanco_still.jpg"
              alt="Letterboxd"
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
