import { Logo, LogoText } from "./Logo";

type HomeIntroProps = {
  onStart: () => void;
};

export function HomeIntro({ onStart }: HomeIntroProps) {
  return (
    <section className="flex flex-1 flex-col gap-5">
      <header className="pt-2 text-center text-dark">
        <Logo className="text-xs font-semibold" />
      </header>

      <div className="relative flex flex-1 overflow-hidden rounded-[32px] border border-white/70 bg-cream shadow-soft">
        <img
          src="/visuals/natural-purple.png.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[rgba(255,246,227,0.12)]" />
        <div className="relative z-10 min-h-[560px] w-full p-5">
          <div className="absolute inset-0 flex items-center justify-center p-5">
            <div className="w-full rounded-3xl border border-white/40 bg-[rgba(245,242,236,0.22)] p-6 text-center text-deep shadow-[0_12px_30px_rgba(80,38,104,0.1)] backdrop-blur-md">
              <p className="text-sm font-semibold text-natural [text-shadow:0_1px_12px_rgba(245,242,236,0.72)]">
                양극화된 색깔론이 아닌
              </p>
              <h2 className="mt-2 text-2xl font-bold leading-tight text-ink [text-shadow:0_1px_12px_rgba(245,242,236,0.72)]">
                당신의 <LogoText className="font-medium">Personal Purple</LogoText>을 찾아드립니다
              </h2>
              <p className="mt-20 text-center text-[15px] leading-7 text-dark [text-shadow:0_1px_12px_rgba(245,242,236,0.76)]">
                30개의 질문에 답하고, 내 생각이 가진 채도와 명도의 균형을 확인해보세요.
                결과는 하나의 편이 아니라 나만의 퍼스널 퍼플로 보여드립니다.
              </p>
            </div>
          </div>

          <div className="absolute inset-x-5 bottom-5">
            <button
              type="button"
              onClick={onStart}
              className="silk-button h-14 w-full rounded-2xl bg-deep px-5 text-base font-bold text-cream"
            >
              테스트 시작
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
