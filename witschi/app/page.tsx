import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const sections = [
    {
      label: "introduction",
      items: [
        {
          id: "bio",
          title: "Bio",
          image: "/headshot1.jpg",
          href: "/introduction/bio",
        },
        {
          id: "background",
          title: "Background",
          image: "/headshot2.jpg",
          href: "/introduction/background",
        },
      ],
    },
    {
      label: "about",
      items: [
        {
          id: "education",
          title: "Education",
          image: "/headshot2.jpg",
          href: "/about/education",
        },
        {
          id: "interests",
          title: "Interests",
          image: "/bike_boy.jpg",
          href: "/about/interests",
        },
        {
          id: "location",
          title: "Location",
          image: "/cleo.jpg",
          href: "/about/location",
        },
      ],
    },
    {
      label: "projects",
      items: [
        {
          id: "infatrode",
          title: "Infatrode",
          image: "/infatrode.png",
          href: "/projects/infatrode",
        },
        {
          id: "petecode",
          title: "PeteCode",
          image: "/small_peter.jpg",
          href: "/projects/petecode",
        },
        {
          id: "matchcut",
          title: "Match Cut",
          image: "/cleo.jpg",
          href: "/projects/matchcut",
        },
        {
          id: "sitev2",
          title: "This Site v2",
          image: "/bike_boy.jpg",
          href: "/projects/sitev2",
        },
      ],
    },
    {
      label: "misc",
      items: [
        {
          id: "letterboxd",
          title: "Letterboxd",
          image: "/uncle_yanco_still.jpg",
          href: "/misc/letterboxd",
        },
        {
          id: "goodreads",
          title: "Goodreads",
          image: "/Italo-Calvino.jpg",
          href: "/misc/goodreads",
        },
        {
          id: "film",
          title: "Film",
          image: "/uncle_yanco_still.jpg",
          href: "/misc/film",
        },
        {
          id: "reading",
          title: "Reading",
          image: "/Italo-Calvino.jpg",
          href: "/misc/reading",
        },
      ],
    },
    {
      label: "contact",
      items: [
        {
          id: "email",
          title: "Email",
          image: "/cleo.jpg",
          href: "/contact/email",
        },
        {
          id: "linkedin",
          title: "LinkedIn",
          image: "/headshot1.jpg",
          href: "/contact/linkedin",
        },
        {
          id: "resume",
          title: "Resume",
          image: "/full_peter.jpg",
          href: "/contact/resume",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Name in top left */}
        <div className="mb-8">
          <h1 className="text-3xl font-normal text-foreground mb-4">
            JACK LILLE YERINGTON
          </h1>
          <Image
            src="/headshot2.jpg"
            alt="Jack Lille Yerington"
            width={80}
            height={80}
            className="object-cover"
          />
        </div>

        {/* Rows of sections */}
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section.label} className="flex items-start gap-4">
              {/* Section label on the left */}
              <div className="w-24 flex-shrink-0">
                <h2 className="text-sm font-normal text-muted-foreground uppercase tracking-wider">
                  {section.label}
                </h2>
              </div>

              {/* Row of items */}
              <div className="flex flex-wrap gap-1">
                {section.items.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group block bg-card border border-border hover:bg-accent transition-colors"
                  >
                    <div className="w-16 h-16 relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="p-1">
                      <h3 className="text-xs font-normal text-foreground group-hover:text-accent-foreground text-center">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
