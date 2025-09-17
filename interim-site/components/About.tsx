import type { PersonalInfo } from "@/lib/types"

interface AboutProps {
  personalInfo: PersonalInfo
}

export default function About({ personalInfo }: AboutProps) {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium mb-8 text-muted-foreground">About</h2>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            From {personalInfo.hometown} and currently based in {personalInfo.location}, I grew up surrounded by art. My dad works in multimedia art in his free time, and my mom worked in fashion. As a kid, I was always being dragged from one art gallery to the next. By adolescence, film became my medium of choice, I found a love for it that I had never found in anything before.
          </p>

          <p>
            I fell in love with tech in high school, and as I moved through college, I found myself more and more conflicted in a field that sometimes felt like it was too far removed from the world I knew. Each item below is an attempt for me to bring a little bit of my known world to my education.
          </p>

          <div className="pt-4">
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {personalInfo.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
