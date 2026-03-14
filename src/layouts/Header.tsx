import { Menu, Github } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80 sm:px-6 lg:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden dark:text-gray-400 dark:hover:text-gray-300 rounded-md p-1"
          onClick={onMenuClick}
        >
          <span className="sr-only">Open sidebar</span>
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <a
          href="https://github.com/pranayambre428-stack/factwise-employee-dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-gray-200 transition-colors"
          title="View Source on GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <ThemeToggle />
      </div>
    </header>
  );
}
