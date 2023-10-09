import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  text: string;
  newTab: boolean;
}

export default function StyledLink({ href, text, newTab }: Props) {
  return (
    <Link href={href} target={newTab ? "_blank" : "_self"}>
      <span className="underline underline-offset-4 decoration-slate-300 hover:decoration-[#6b7280]">
        {text}
      </span>
    </Link>
  );
}
