import type { PersonalItem } from "@/lib/types";

interface ItemsProps {
  personalItems: PersonalItem[];
}

export default function Items({ personalItems }: ItemsProps) {
  return (
    <section id="items" className="py-20 px-6">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-medium mb-8 text-muted-foreground">
          Items
        </h2>

        <div className="space-y-4">
          {personalItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground">{item.label}</span>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title={
                  item.label === "Letterboxd"
                    ? "Agnes Varda"
                    : item.label === "Goodreads"
                    ? "Italo Calvino"
                    : item.label
                }
              >
                <img
                  src={item.appicon}
                  alt={item.label}
                  className="w-8 h-8 rounded object-cover"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
