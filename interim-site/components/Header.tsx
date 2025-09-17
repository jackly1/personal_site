"use client"

const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
]

function scrollToSection(href: string) {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}

export default function Header() {
  return (
    <header className="fixed top-0 right-0 z-50 p-6">
      <nav className="flex items-center gap-8">
        {navigation.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.href)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            aria-label={item.label}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
