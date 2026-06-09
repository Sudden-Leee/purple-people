import type { Answers, ScoreProfile } from "@/lib/scoring";
import type { ResultType } from "@/data/results";
import { LogoText } from "./Logo";
import { ResultHeroCard } from "./ResultHeroCard";

type ResultScreenProps = {
  result: ResultType;
  profile: ScoreProfile;
  answers: Answers;
  onShare: () => void;
  onRestart: () => void;
};

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18L9 12L15 6" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A3 3 0 1 0 15 5" />
      <path d="M6 15A3 3 0 1 0 9 18" />
      <path d="M18 16A3 3 0 1 0 15 19" />
      <path d="M8.7 14.1L15.3 17.4" />
      <path d="M15.3 6.6L8.7 9.9" />
    </svg>
  );
}

export function ResultScreen({ result, profile, onShare, onRestart }: ResultScreenProps) {
  const lightnessScore = Math.round((1 - profile.intensityScore / 2) * 100);

  return (
    <section className="flex flex-1 flex-col gap-4">
      <header className="grid grid-cols-[44px_1fr_44px] items-center pt-1">
        <button type="button" onClick={onRestart} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/50 text-deep">
          <BackIcon />
        </button>
        <div className="text-center">
          <p className="text-sm font-medium text-ink">
            <LogoText>Personal Purple</LogoText>
          </p>
        </div>
        <button type="button" onClick={onShare} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/50 text-deep">
          <ShareIcon />
        </button>
      </header>

      <ResultHeroCard result={result} saturationScore={profile.vividScore} lightnessScore={lightnessScore} />

      <div className="mt-auto grid grid-cols-[1.1fr_0.9fr] gap-3">
        <button type="button" onClick={onShare} className="silk-button h-14 rounded-2xl bg-deep font-bold text-cream">
          결과 공유하기
        </button>
        <button type="button" onClick={onRestart} className="h-14 rounded-2xl bg-white/55 font-bold text-deep">
          다시 테스트하기
        </button>
      </div>
    </section>
  );
}
