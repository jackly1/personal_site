import type { PersonalInfo } from "@/lib/types";

interface HeroProps {
  personalInfo: PersonalInfo;
}

export default function Hero({ personalInfo }: HeroProps) {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-between px-6 py-20"
    >
      <div className="max-w-xl -ml-8">
        <h1 className="text-6xl md:text-8xl font-medium mb-8 leading-none tracking-tight">
          {personalInfo.name}
        </h1>

        <p className="text-lg text-muted-foreground max-w-md leading-relaxed ml-6">
          {personalInfo.bio}
        </p>
      </div>

      <div className="hidden md:block ml-12">
        <div className="w-192 h-192 overflow-hidden">
          <img
            src="/headshot2.jpg"
            alt={personalInfo.name}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
