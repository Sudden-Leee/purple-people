import type { ReactNode } from "react";

type ScreenFrameProps = {
  children: ReactNode;
};

export function ScreenFrame({ children }: ScreenFrameProps) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-[430px] flex-col px-5 py-5">
      {children}
    </main>
  );
}
