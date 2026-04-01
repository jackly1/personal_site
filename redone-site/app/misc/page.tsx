import PageHeader from '@/components/PageHeader';

const FOOD = '/static/misc/food.png';
const BIKE = '/static/misc/bike.JPG';

export default function MiscPage() {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      <PageHeader />

      <div className="flex min-h-0 flex-1 flex-col px-6 md:px-12">
        <h2 className="mb-4 shrink-0 text-2xl font-bold text-neutral-800">
          Misc
        </h2>

        <div className="mx-auto flex w-full max-w-4xl min-h-0 flex-1 flex-col justify-center gap-6 pb-6 md:flex-row md:items-start md:gap-8 lg:max-w-5xl lg:gap-10">
          <section className="flex min-h-0 w-full flex-col md:w-[46%] md:max-w-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={FOOD}
              alt=""
              className="w-full max-h-[min(24vh,28dvh)] object-contain md:max-h-[min(30vh,32dvh)]"
            />
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:mt-4">
              For two summers I worked at Ernesto&apos;s, a Basque restaurant
              where I first ran a concession stand outdoors that sold summer
              treats, and later worked as a runner/server. The job was easy to
              fall in love with, the people, the role, the environment, but most
              of all was the food. Since working there, I have developed a love
              for cooking.
            </p>
          </section>

          <section className="flex min-h-0 w-full flex-col md:ml-0 md:w-[46%] md:max-w-none md:items-end">
            <p className="mb-3 text-right text-sm leading-relaxed text-neutral-600 md:mb-4">
              This is my bike. I bought it two years ago when I had symptom-less
              covid and needed something to do for a week in the summer. Since
              then, it has become one of the best purchases I&apos;ve ever made.
              In the two years it&apos;s been mine: the right brake no longer
              works, the left one has to be fixed every other week, the seat has
              been changed, it&apos;s become much rustier than it was here, I
              trust it much less, and someone randomly broke off the water
              bottle holder pictured (although they left the rest of the bike
              untouched). However, even with all this, it is still a lovely
              bike, and I cherish it.
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={BIKE}
              alt=""
              className="ml-auto w-full max-h-[min(32vh,38dvh)] object-contain md:max-h-[min(42vh,44dvh)]"
            />
          </section>
        </div>
      </div>
    </main>
  );
}
