import BioPhotoHover from "@/components/BioPhotoHover";
import PageHeader from "@/components/PageHeader";

export default function BioPage() {
    return (
        <main className="min-h-screen">
            <PageHeader />

            <div className="px-6 pb-20 md:px-12">
                <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
                    <div className="min-w-0 flex-1">
                        <h2 className="mb-10 text-2xl font-light text-neutral-800">
                            About
                        </h2>

                        <div className="space-y-6 leading-relaxed text-neutral-600">
                            <p>
                                I am a CS and Spanish double major at the
                                Univeristy of Michigan, minoring in Global Media
                                Studies. I am passionate about tech that
                                genuinely helps people. I love film, a good
                                book, biking, composting, and tech that
                                genuinely helps people
                            </p>

                            <p>
                                From New York, NY (currently at school in Ann
                                Arbor, MI), I grew up surrounded by art. As a
                                kid, I was always being dragged from one art
                                gallery to the next. By adolescence, film became
                                my medium of choice, I found a love for it that
                                I had never found in anything before.
                            </p>
                        </div>

                        <div className="mt-12 space-y-3 border-t border-neutral-200 pt-8 text-sm">
                            <a
                                href="mailto:jacklilleyerington@gmail.com"
                                className="block text-neutral-500 transition-colors hover:text-neutral-800"
                            >
                                jacklilleyerington@gmail.com
                            </a>
                            <a
                                href="https://linkedin.com/in/jacklilleyerington"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-neutral-500 transition-colors hover:text-neutral-800"
                            >
                                LinkedIn
                            </a>
                            {/* <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-neutral-500 transition-colors hover:text-neutral-800"
                            >
                                Résumé
                            </a> */}
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
