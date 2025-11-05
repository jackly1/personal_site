import Link from "next/link";
import Image from "next/image";

export default function Misc() {
  const personalItems = [
    {
      label: "Letterboxd",
      appicon: "/uncle_yanco_still.jpg",
      link: "https://letterboxd.com/jack1y/",
      description: "Film diary and reviews",
    },
    {
      label: "Goodreads",
      appicon: "/Italo-Calvino.jpg",
      link: "https://www.goodreads.com/user/show/158036909-jack-lille-yerington/",
      description: "Reading list and book reviews",
    },
  ];

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

        <h1 className="text-4xl font-medium mb-12">Misc</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personalItems.map((item) => (
            <a
              key={item.label}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-card border border-border rounded-lg p-6 hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 relative overflow-hidden rounded-md">
                  <Image
                    src={item.appicon}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium group-hover:text-accent-foreground">
                    {item.label}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-medium mb-6">Other Interests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Film</h3>
              <p className="text-muted-foreground">
                Passionate about cinema, from classic auteurs to contemporary
                experimental works. Always exploring new perspectives through
                film.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Reading</h3>
              <p className="text-muted-foreground">
                Avid reader of fiction, philosophy, and technical literature.
                Currently exploring Italo Calvino and other postmodern writers.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Biking</h3>
              <p className="text-muted-foreground">
                Enthusiastic cyclist who believes in sustainable transportation
                and the joy of exploring cities on two wheels.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-3">Composting</h3>
              <p className="text-muted-foreground">
                Environmental consciousness through waste reduction and
                sustainable living practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






