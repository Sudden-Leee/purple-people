import { Logo, LogoText } from "./Logo";
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,246,227,0.58)_0%,rgba(255,246,227,0.14)_40%,rgba(80,38,104,0.05)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,246,227,0.58)_0%,rgba(255,246,227,0.16)_48%,rgba(255,246,227,0)_100%)]" />

        <div className="relative z-10 px-8 pt-14">
          <Logo className="mt-28 text-[30px] font-semibold text-deep" />
        </div>

        <div className="relative z-10 px-8 pb-8">
          <p className="text-[15px] font-semibold leading-7 text-deep">
            당신의 <LogoText className="font-medium">Personal Purple</LogoText>을
            <br />
            찾아가는 여정
          </p>
          <button
            type="button"
            onClick={onDone}
            className="silk-button mt-5 h-12 w-full rounded-2xl bg-cream/78 px-5 text-base font-bold text-deep backdrop-blur-sm"
          >
            시작하기
          </button>
        </div>
      </div>
    </section>
  );
}
