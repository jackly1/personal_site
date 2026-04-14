import BioPhotoHover from "@/components/BioPhotoHover";

export default function BioPage() {
    return (
        <main className="flex min-h-0 flex-1 flex-col">
            <div className="px-6 pb-8 pt-10 md:px-12 md:pb-20 md:pt-18">
                <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-start md:gap-12 lg:gap-16">
                    <div className="min-w-0 flex-1">
                        <h2 className="mb-4 text-2xl font-bold text-neutral-800 md:mb-5">
                            About
                        </h2>

                        <div className="space-y-6 leading-relaxed text-neutral-600">
                            <p>
                                I am a CS and Spanish double major at the
                                Univeristy of Michigan, minoring in Global Media
                                Studies. I love{" "}
                                <b>
                                    <a href="/films">film</a>
                                </b>
                                {""}, a good{" "}
                                <b>
                                    <a href="/readings">book</a>
                                </b>
                                {""}, riding my{" "}
                                <b>
                                    <a href="/misc">bike</a>
                                </b>
                                {""}, composting,{" "}
                                <b>
                                    <a href="/writing">writing</a>
                                </b>
                                {""} occasionally, and tech that genuinely helps people.
                            </p>

                            <p>
                                I grew up in New York surrounded by art. As a
                                kid, I was always being dragged from one art
                                gallery to the next. By adolescence, film became
                                my medium of choice, I found a love for it that
                                I had never known before.
                            </p>

                            <p>
                                During high school I discovered computer
                                science. As I moved through college, however, I
                                found myself more and more conflicted in a field
                                that sometimes felt like it was too far removed
                                from the world I knew. Each{" "}
                                <b>
                                    <a href="/projects">project</a>
                                </b>{" "}
                                is an attempt for me to bring a little bit of my
                                education to my known world.
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
