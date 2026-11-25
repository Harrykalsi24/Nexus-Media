import React, { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export interface AnimatedThemeTogglerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  duration?: number;
}

export function AnimatedThemeToggler({
  className = "",
  duration = 500,
  ...props
}: AnimatedThemeTogglerProps) {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark" ||
      document.body.getAttribute("data-theme") === "dark";
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = isDark ? "light" : "dark";

    // View Transitions API circular reveal animation
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;

      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = (document as any).startViewTransition(() => {
        setIsDark(!isDark);
        document.documentElement.setAttribute("data-theme", newTheme);
        document.body.setAttribute("data-theme", newTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setIsDark(!isDark);
      document.documentElement.setAttribute("data-theme", newTheme);
      document.body.setAttribute("data-theme", newTheme);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center p-2 rounded-full transition-transform hover:scale-110 active:scale-95 ${className}`}
      aria-label="Toggle theme"
      {...props}
    >
      <Sun
        className={`w-5 h-5 transition-all duration-300 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100 text-amber-500"
        }`}
      />
      <Moon
        className={`absolute w-5 h-5 transition-all duration-300 ${
          isDark
            ? "rotate-0 scale-100 opacity-100 text-indigo-300"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}

export default AnimatedThemeToggler;
