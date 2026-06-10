import { useState } from "react";
import type { ResultType } from "@/data/results";
import { ResultHeroCard } from "./ResultHeroCard";

type ShareCardScreenProps = {
  result: ResultType;
  onBack: () => void;
  onRestart: () => void;
};

export function ShareCardScreen({ result, onBack, onRestart }: ShareCardScreenProps) {
  const [shareMessage, setShareMessage] = useState("");

  const shareResult = async () => {
    if (!navigator.share) {
      setShareMessage("공유창을 열 수 없어요.");
      return;
    }

    try {
      await navigator.share({
        title: "Purple People",
        text: `나의 Personal Purple은 ${result.title}입니다.`,
        url: window.location.href,
      });
      setShareMessage("");
    } catch {
      setShareMessage("공유창을 열 수 없어요.");
    }
  };

  return (
    <section className="flex flex-1 flex-col gap-4">
      <header className="grid grid-cols-[64px_1fr_64px] items-center pt-1">
        <button type="button" onClick={onBack} className="h-11 rounded-2xl bg-white/55 px-4 font-bold text-deep">
          뒤로
        </button>
        <p className="text-center text-sm font-bold text-dark">Share Card</p>
        <button type="button" onClick={shareResult} className="h-11 rounded-2xl bg-white/55 px-4 font-bold text-deep">
          공유
        </button>
      </header>

      <div className="rounded-[34px] bg-cream p-2 shadow-soft">
        <ResultHeroCard result={result} mode="share" />
      </div>

      <div className="paper-texture rounded-[24px] border border-white/70 bg-cream/82 p-5">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl border-2 border-white" style={{ backgroundColor: result.hex }} />
          <div>
            <p className="text-sm font-bold text-dark">My Personal Purple</p>
            <p className="text-base font-bold text-ink">{result.colorName}</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-dark">
          양극화된 색깔론이 아닌, 나의 생각이 가진 퍼플 톤을 확인해보세요.
        </p>
      </div>

      {shareMessage && (
        <p className="rounded-2xl bg-white/55 px-4 py-3 text-center text-sm font-semibold leading-5 text-deep">
          {shareMessage}
        </p>
      )}

      <div className="mt-auto grid grid-cols-[1fr_1fr] gap-3">
        <button type="button" onClick={shareResult} className="silk-button h-14 rounded-2xl bg-deep font-bold text-cream">
          공유하기
        </button>
        <button type="button" onClick={onRestart} className="h-14 rounded-2xl bg-white/55 font-bold text-deep">
          다시 하기
        </button>
      </div>
    </section>
  );
}
