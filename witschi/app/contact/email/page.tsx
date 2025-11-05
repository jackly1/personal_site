import Link from "next/link";

export default function Email() {
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

        <div className="max-w-2xl">
          <h1 className="text-4xl font-medium mb-8">Email</h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              I'm always interested in discussing technology, media, and
              creative projects. Feel free to reach out!
            </p>
            <div className="bg-card border border-border rounded-lg p-6">
              <a
                href="mailto:jacklilleyerington@gmail.com"
                className="flex items-center gap-3 text-xl hover:text-primary transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                jacklilleyerington@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






