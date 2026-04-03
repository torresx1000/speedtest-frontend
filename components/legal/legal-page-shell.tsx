import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function LegalPageShell({ title, children }: Props) {
  return (
    <div className="min-h-full bg-gradient-to-b from-[#0c1222] via-[#0a0f1c] to-[#060912] text-slate-300">
      <header className="sticky top-0 z-10 border-b border-white/5 bg-[#0a0f1c]/90 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <Link
            href="/"
            className="text-sm font-medium text-teal-400/90 transition-colors hover:text-teal-300"
          >
            ← Volver
          </Link>
          <h1 className="text-sm font-bold tracking-wide text-white">{title}</h1>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8 pb-16">{children}</main>
      <footer className="border-t border-white/5 px-4 py-6 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-400">Factosys Peru SAC</p>
        <a href="https://www.factosysperu.com" className="mt-1 block text-teal-500/90 hover:underline" target="_blank" rel="noopener noreferrer">
          www.factosysperu.com
        </a>
        <p className="mt-2">
          <a href="mailto:sistemas@factosysperu.com" className="hover:text-slate-400">
            sistemas@factosysperu.com
          </a>
          {" · "}
          <a href="mailto:soport@speedy.factosysperu.com" className="hover:text-slate-400">
            info@factosysperu.com
          </a>
        </p>
      </footer>
    </div>
  );
}
