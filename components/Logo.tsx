import type { ReactNode } from "react";

type LogoProps = {
  className?: string;
};

const logoTextStyle = "tracking-[0.14em]";

export function Logo({ className = "" }: LogoProps) {
  return (
    <p className={`uppercase ${logoTextStyle} ${className}`}>
      PURPLE PEOPLE
    </p>
  );
}

export function LogoText({ className = "", children }: LogoProps & { children: ReactNode }) {
  return (
    <span className={`${logoTextStyle} ${className}`}>
      {children}
    </span>
  );
}
