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
                                My name is Jack, I am an AI Product Manager at
                                <b>
                                    {" "}
                                    <a href="https://www.linkedin.com/company/prospertechnologies/">
                                        Prosper AI
                                    </a>
                                </b>
                                .
                            </p>
                            <p>
                                I graduated from the Univeristy of Michigan with
                                a B.S. in Computer Science and Spanish, and a
                                minor in Global Media Studies (Film). I love{" "}
                                <b>
                                    <a href="/films">film</a>
                                </b>
                                {""}, a good{" "}
                                <b>
                                    <a href="/books">book</a>
                                </b>
                                {""}, riding my{" "}
                                <b>
                                    <a href="/misc">bike</a>
                                </b>
                                {""}, composting,{" "}
                                <b>
                                    <a href="/writing">writing</a>
                                </b>
                                {""} occasionally, and tech that genuinely helps
                                people.
                            </p>
                            <p>
                                Throughout my life, I have centered my studies
                                around language. Aside from a lifelong study of
                                Spanish, in high school I discovered computer
                                science and film. While vastly different
                                realms, I found a love in each in a way that I
                                never had before. I am driven by a deep
                                curiosity about how languages shape our
                                understanding of the world and our interactions
                                with it.

                            </p>
                            <p>At first each{" "}
                                <b>
                                    <a href="/projects">project</a>
                                </b>{" "}
                                was an explorative effort in translating my
                                education to this appreciation. And, most
                                recently,{" "}
                                <b>
                                    <a href="repertory.nyc">Repertory NYC</a>
                                </b>{" "}
                                has been my attempt in translating the hidden,
                                fragmented language of NYC's film scene into a
                                resource that those foreign to it can use.
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

                            <a
                                href="https://michigan-webring.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-8 inline-flex transition-opacity hover:opacity-70"
                                title="Michigan Webring"
                                aria-label="Michigan Webring"
                            >
                                <img
                                    src="https://michigan-webring.vercel.app/images/michigan-logo-black.svg"
                                    alt="Michigan Webring"
                                    width={36}
                                    height={50}
                                    className="h-[50px] w-[36px] object-contain"
                                />
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
