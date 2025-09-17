"use client";

import { useState, useEffect } from "react";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
];

function scrollToSection(href: string) {
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasWhiteBackground, setHasWhiteBackground] = useState(false);

  useEffect(() => {
    let heroSection: HTMLElement | null = null;
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      if (!heroSection) {
        heroSection = document.querySelector("#home");
      }

      if (heroSection) {
        const heroTop = heroSection.offsetTop;
        const scrollY = window.scrollY;

        // Hide header when we reach the Hero section (where the name is)
        if (scrollY >= heroTop - 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const mouseY = e.clientY;
      const windowHeight = window.innerHeight;
      const topTenth = windowHeight * 0.1;

      // Show header with white background when mouse is in top 10% of page
      if (mouseY <= topTenth) {
        setIsVisible(true);
        setHasWhiteBackground(true);

        // Clear any existing timeout
        clearTimeout(timeoutId);

        // Set timeout to remove white background after mouse leaves top area
        timeoutId = setTimeout(() => {
          setHasWhiteBackground(false);
        }, 2000); // 2 second delay before removing white background
      } else {
        // Clear timeout when mouse moves away from top
        clearTimeout(timeoutId);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      } ${hasWhiteBackground ? "bg-white/90 backdrop-blur-sm shadow-sm" : ""}`}
    >
      <div className="w-full flex justify-end p-6">
        <nav className="flex items-center gap-8 mr-2">
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
          <div className="flex gap-8 mr-4">
            <a
              href="https://linkedin.com/in/jacklilleyerington"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:jacklilleyerington@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Email"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              title="Résumé"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
