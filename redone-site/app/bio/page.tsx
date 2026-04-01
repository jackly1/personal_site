import PageHeader from '@/components/PageHeader';

export default function BioPage() {
  return (
      <main className="min-h-screen">
          <PageHeader />

          <div className="px-6 md:px-12 pb-20 max-w-2xl">
              <h2 className="text-2xl font-light mb-10 text-neutral-800">
                  About
              </h2>

              <div className="space-y-6 text-neutral-600 leading-relaxed">
                  <p>
                      I am a CS and Spanish double major at the Univeristy of
                      Michigan, minoring in Global Media Studies. I am
                      passionate about tech that genuinely helps people.
                      Sometimes annoying film buff, avid/occasional reader
                      depending on the time of year, biking enjoyer, and
                      composting enthusiast.
                  </p>

                  <p>
                      From New York, NY (currently at school in Ann Arbor, MI), I
                      grew up surrounded by art. As a kid, I was always being
                      dragged from one art gallery to the next. By adolescence,
                      film became my medium of choice, I found a love for it
                      that I had never found in anything before.
                  </p>

                  <p>
                      I fell in love with tech in high school, and as I moved
                      through college, I found myself more and more conflicted
                      in a field that sometimes felt like it was too far removed
                      from the world I knew. Each item below is an attempt for
                      me to bring a little bit of my known world to my
                      education.
                  </p>
              </div>

              <div className="mt-12 pt-8 border-t border-neutral-200 space-y-3 text-sm">
                  <a
                      href="mailto:jacklilleyerington@gmail.com"
                      className="block text-neutral-500 hover:text-neutral-800 transition-colors"
                  >
                      jacklilleyerington@gmail.com
                  </a>
                  <a
                      href="https://linkedin.com/in/jacklilleyerington"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-neutral-500 hover:text-neutral-800 transition-colors"
                  >
                      LinkedIn
                  </a>
                  <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-neutral-500 hover:text-neutral-800 transition-colors"
                  >
                      Résumé
                  </a>
              </div>
          </div>
      </main>
  );
}
