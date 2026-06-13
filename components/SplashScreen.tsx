import { Logo } from "./Logo";
import { SparkleOverlay } from "./SparkleOverlay";

type SplashScreenProps = {
  onDone: () => void;
};

export function SplashScreen({ onDone }: SplashScreenProps) {
  return (
    <section className="-mx-5 -my-5 flex min-h-dvh flex-col overflow-hidden rounded-[34px] bg-cream">
      <div className="relative flex flex-1 flex-col justify-between overflow-hidden">
        <img
          src="/visuals/natural-purple.png.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <SparkleOverlay />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,246,227,0.64)_0%,rgba(255,246,227,0.22)_42%,rgba(80,38,104,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,246,227,0.55)_0%,rgba(255,246,227,0.2)_36%,rgba(255,246,227,0)_62%)]" />

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-8 text-center">
          <Logo className="text-[30px] font-semibold leading-none text-deep" />
          <p className="mt-2 font-serif text-[11px] font-normal leading-none text-deep/76">
            Your Personal Purple
          </p>
        </div>

        <div className="relative z-10 px-8 pb-8">
          <button
            type="button"
            onClick={onDone}
            className="group h-14 w-full rounded-[18px] border border-cream/70 bg-deep px-5 text-[15px] font-bold text-cream shadow-[inset_0_1px_0_rgba(255,246,227,0.3),inset_0_-3px_0_rgba(33,19,41,0.2),0_16px_34px_rgba(80,38,104,0.24)] transition hover:bg-[#63317D] active:translate-y-px"
          >
            <span className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-cream/45 transition group-hover:w-10" />
              <span>시작하기</span>
              <span className="h-px w-8 bg-cream/45 transition group-hover:w-10" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
