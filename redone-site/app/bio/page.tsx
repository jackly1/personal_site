import BioPhotoHover from '@/components/BioPhotoHover';

export default function BioPage() {
  return (
      <main className="flex min-h-0 flex-1 flex-col">
          <div className="px-6 pb-20 pt-10 md:px-12 md:pt-18">
              <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16">
                  <div className="min-w-0 flex-1">
                      <h2 className="mb-4 text-2xl font-bold text-neutral-800 md:mb-5">
                          About
                      </h2>

                      <div className="space-y-6 leading-relaxed text-neutral-600">
                          <p>
                              I am a CS and Spanish double major at the
                              Univeristy of Michigan, minoring in Global Media
                              Studies. I am passionate about tech that genuinely
                              helps people. I love film, a good book, biking,
                              composting, and tech that genuinely helps people
                          </p>

                          <p>
                              From New York, NY (currently at school in Ann
                              Arbor, MI), I grew up surrounded by art. As a kid,
                              I was always being dragged from one art gallery to
                              the next. By adolescence, film became my medium of
                              choice, I found a love for it that I had never
                              found in anything before.
                          </p>

                          <p>
                              Shortly after I found love for tech in high
                              school, and as I moved through college, found
                              myself more and more conflicted in a field that
                              sometimes felt like it was too far removed from
                              the world I knew. Each{" "}
                              <b>
                                  <a href="/projects">project</a>
                              </b>{" "}
                              is an attempt for me to bring a little bit of my
                              known world to my education.
                          </p>
                      </div>

                      <div className="mt-6 space-y-3 text-med leading-relaxed">
                          <a
                              href="mailto:jacklilleyerington@gmail.com"
                              className="block font-bold text-neutral-800 transition-colors hover:text-neutral-900"
                          >
                              jacklilleyerington@gmail.com
                          </a>
                          <a
                              href="https://linkedin.com/in/jacklilleyerington"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block font-bold text-neutral-800 transition-colors hover:text-neutral-900"
                          >
                              LinkedIn
                          </a>
                      </div>
                  </div>

                  <div className="mx-auto w-full shrink-0 md:mx-0 md:w-[min(100%,420px)] lg:w-[min(100%,440px)]">
                      <BioPhotoHover />
                  </div>
              </div>
          </div>
      </main>
  );
}
