import * as React from "react";

import { LINKS, cn } from "@/lib/utils";
import StyledLink from "./styled-link";

export function Footer({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          👋
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <StyledLink href={LINKS.TMORO} text={"tmoro"} newTab={true} />.
            Hosted on{" "}
            <StyledLink href={LINKS.VERCEL} text={"Vercel"} newTab={true} />.
            The source code is available on{" "}
            <StyledLink href={LINKS.GITHUB} text={"GitHub"} newTab={true} />.
          </p>
        </div>
      </div>
    </footer>
  );
}
