import { useState } from "react";
import { cn } from "../lib/utils";
import { Home, ChevronRight } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const navItems = [{ name: "Dashboard", icon: Home, href: "#", active: true }];

const T = {
  bg: "bg-white dark:bg-[#1a1b23]",
  border: "border-gray-200 dark:border-white/[0.06]",
  hoverBg: "hover:bg-gray-100 dark:hover:bg-white/[0.06]",
  textMuted: "text-gray-400 dark:text-gray-500",
  textNormal: "text-gray-600 dark:text-gray-400",
  textStrong: "text-gray-900 dark:text-white",
  textHover: "group-hover:text-gray-700 dark:group-hover:text-white",
  activeBg: "bg-indigo-50 dark:bg-indigo-600/20",
  activeText: "text-indigo-700 dark:text-indigo-300",
  activeIcon: "text-indigo-600 dark:text-indigo-400",
  avatarRing: "ring-gray-300 dark:ring-white/10",
};

function NavTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative group/tip flex items-center w-full">
      {children}
      <div
        className={cn(
          "pointer-events-none absolute left-full ml-3 z-50",
          "hidden xl:group-hover/tip:flex",
          "items-center px-2.5 py-1.5 rounded-md",
          "bg-gray-900 dark:bg-gray-700 text-white text-xs font-medium whitespace-nowrap",
          "shadow-lg opacity-0 group-hover/tip:opacity-100 translate-x-1 group-hover/tip:translate-x-0",
          "transition-all duration-150",
        )}
      >
        {label}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700" />
      </div>
    </div>
  );
}

function NavLink({
  item,
  showLabel,
  onClick,
}: {
  item: (typeof navItems)[number];
  showLabel: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={item.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center rounded-lg px-2.5 py-2.5 text-sm font-medium transition-all w-full",
        item.active
          ? cn(T.activeBg, T.activeText)
          : cn(T.textNormal, T.hoverBg, T.textHover),
      )}
    >
      {item.active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-px w-0.5 h-4 rounded-r bg-indigo-500" />
      )}
      <item.icon
        className={cn(
          "w-4 h-4 shrink-0 transition-colors",
          item.active
            ? T.activeIcon
            : cn(
                T.textMuted,
                "group-hover:text-gray-500 dark:group-hover:text-gray-300",
              ),
        )}
      />
      <span
        className={cn(
          "ml-3 whitespace-nowrap overflow-hidden transition-[opacity,max-width] duration-150",
          showLabel ? "max-w-[160px] opacity-100" : "max-w-0 opacity-0",
        )}
      >
        {item.name}
      </span>
      {item.active && showLabel && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
      )}
    </a>
  );
}

function LogoRow({ showLabel }: { showLabel: boolean }) {
  return (
    <div
      className={cn(
        "h-14 flex items-center shrink-0 border-b px-3.5 overflow-hidden",
        T.border,
      )}
    >
      <img
        src="/logo.png"
        alt="Logo"
        className="w-7 h-7 rounded-lg shadow-lg shadow-indigo-500/20 shrink-0"
      />
      <span
        className={cn(
          "ml-3 text-sm font-bold tracking-tight whitespace-nowrap transition-[opacity,transform] duration-150",
          T.textStrong,
          showLabel
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-2 pointer-events-none",
        )}
      >
      </span>
    </div>
  );
}

function UserRow({
  showLabel,
  onClick,
}: {
  showLabel: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center rounded-lg cursor-pointer group transition-colors px-2 py-2 overflow-hidden",
        T.hoverBg,
      )}
    >
      <img
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="Admin"
        className={cn(
          "w-7 h-7 rounded-full object-cover shrink-0 ring-1",
          T.avatarRing,
        )}
      />
      <div
        className={cn(
          "flex-1 overflow-hidden ml-3 min-w-0 transition-[opacity,max-width] duration-150",
          showLabel ? "max-w-[120px] opacity-100" : "max-w-0 opacity-0",
        )}
      >
        <p className={cn("text-xs font-semibold truncate", T.textStrong)}>
          Admin User
        </p>
        <p className={cn("text-[10px] truncate", T.textMuted)}>
          admin@factwise.com
        </p>
      </div>
    </div>
  );
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "xl:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-200",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
      />

      <div
        className={cn(
          "xl:hidden fixed inset-y-0 left-0 z-50 w-56 flex flex-col",
          T.bg,
          "border-r",
          T.border,
          "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <LogoRow showLabel />
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              item={item}
              showLabel
              onClick={() => setIsOpen(false)}
            />
          ))}
        </nav>
        <div className={cn("shrink-0 p-2 border-t", T.border)}>
          <UserRow showLabel />
        </div>
      </div>

      <aside
        className={cn(
          "xl:hidden fixed inset-y-0 left-0 z-30 flex flex-col items-center w-14",
          T.bg,
          "border-r",
          T.border,
        )}
      >
        <div
          className={cn(
            "h-14 flex items-center justify-center shrink-0 border-b w-full",
            T.border,
          )}
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-7 h-7 rounded-lg shadow-lg shadow-indigo-500/20"
          />
        </div>

        <nav className="flex-1 flex flex-col items-center py-3 gap-1 w-full px-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setIsOpen(true)}
              title={item.name}
              className={cn(
                "relative flex items-center justify-center w-full h-9 rounded-xl transition-all",
                item.active
                  ? cn(T.activeBg, T.activeIcon)
                  : cn(T.textMuted, T.hoverBg, T.textHover),
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-px w-0.5 h-4 rounded-r bg-indigo-500" />
              )}
            </button>
          ))}
        </nav>

        <div className="shrink-0 pb-3 flex flex-col items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            title="Expand sidebar"
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-xl transition-all",
              T.textMuted,
              T.hoverBg,
              T.textHover,
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Admin"
            onClick={() => setIsOpen(true)}
            className={cn(
              "w-7 h-7 rounded-full object-cover ring-1 cursor-pointer transition-all hover:ring-indigo-400/60",
              T.avatarRing,
            )}
          />
        </div>
      </aside>

      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "hidden xl:flex fixed inset-y-0 left-0 z-30 flex-col",
          T.bg,
          "border-r",
          T.border,
          "transition-[width] duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-hidden",
          hovered ? "w-52" : "w-14",
        )}
      >
        <LogoRow showLabel={hovered} />

        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-hidden">
          {navItems.map((item) => (
            <NavTooltip key={item.name} label={item.name}>
              <NavLink item={item} showLabel={hovered} />
            </NavTooltip>
          ))}
        </nav>

        <div className={cn("shrink-0 p-2 border-t", T.border)}>
          <UserRow showLabel={hovered} />
        </div>
      </aside>
    </>
  );
}
