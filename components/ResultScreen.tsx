import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { Answers, ScoreProfile } from "@/lib/scoring";
import type { ResultType } from "@/data/results";
import { Logo, LogoText } from "./Logo";
import { PurpleMap } from "./PurpleMap";
import { ResultHeroCard } from "./ResultHeroCard";

type ResultScreenProps = {
  result: ResultType;
  profile: ScoreProfile;
  answers: Answers;
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

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v11" />
      <path d="M7 10l5 5l5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function ResultExportCard({ result }: { result: ResultType }) {
  const shortDescription = result.description.split(".")[0] + ".";

  return (
    <div className="w-[390px] bg-[#F7F4EE] p-6 text-ink">
      <div className="overflow-hidden rounded-[32px] border border-white bg-cream shadow-soft">
        <div className="relative h-[390px] overflow-hidden">
          <img src={result.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${result.hex}D9 0%, ${result.hex}78 52%, ${result.hex}12 100%)`,
            }}
          />
          <div className="relative z-10 flex h-full flex-col justify-between p-6 text-cream [text-shadow:0_1px_14px_rgba(33,19,41,0.28)]">
            <Logo className="text-xs font-semibold text-cream/90" />
            <div>
              <p className="text-sm font-semibold text-cream/90">{result.subtitle}</p>
              <h2 className="mt-3 text-[38px] font-medium leading-none text-cream">
                <LogoText>{result.title}</LogoText>
              </h2>
            </div>
          </div>
        </div>

        <div className="space-y-5 bg-[#F7F4EE] p-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl border-2 border-white shadow-soft" style={{ backgroundColor: result.hex }} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-dark">Personal Purple</p>
              <p className="mt-1 text-lg font-semibold text-ink">{result.colorName}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {result.keywords.map((keyword) => (
              <span key={keyword} className="rounded-full bg-white/70 px-3 py-2 text-sm font-semibold text-deep">
                #{keyword}
              </span>
            ))}
          </div>

          <p className="text-[15px] font-medium leading-7 text-dark">{shortDescription}</p>

          <div className="border-t border-deep/10 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-deep">Personal Purple</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResultScreen({ result, profile, onRestart }: ResultScreenProps) {
  const [message, setMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const exportCardRef = useRef<HTMLDivElement>(null);
  const lightnessScore = Math.round((profile.intensityScore / 2) * 100);
  const shareTitle = "Purple People";
  const shortDescription = result.description.split(".")[0] + ".";
  const shareText = `나의 Personal Purple은 ${result.title}입니다.\n${shortDescription}`;

  const handleShare = async () => {
    if (typeof window === "undefined" || !navigator.share) {
      setMessage("공유창을 열 수 없어요.");
      return;
    }

    try {
      await navigator.share({
        title: shareTitle,
        text: shareText,
        url: window.location.href,
      });
      setMessage("");
    } catch {
      setMessage("공유창을 열 수 없어요.");
    }
  };

  const handleSaveColor = async () => {
    if (!exportCardRef.current || isSaving) return;

    try {
      setIsSaving(true);
      setMessage("");
      await document.fonts?.ready;
      const dataUrl = await toPng(exportCardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#F7F4EE",
      });
      downloadDataUrl(dataUrl, `personal-purple-${result.id}.png`);
      setMessage("이미지가 저장되었어요.");
    } catch {
      setMessage("이미지 저장에 실패했어요.");
    } finally {
      setIsSaving(false);
    }
  };

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
        <button type="button" onClick={handleShare} className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/50 text-deep">
          <ShareIcon />
        </button>
      </header>

      <ResultHeroCard result={result} saturationScore={profile.vividScore} lightnessScore={lightnessScore} />

      <PurpleMap currentResultId={result.id} />

      {message && (
        <p className="rounded-2xl bg-white/55 px-4 py-3 text-center text-sm font-semibold leading-5 text-deep">
          {message}
        </p>
      )}

      <div className="mt-auto grid grid-cols-2 gap-3">
        <button type="button" onClick={handleShare} className="silk-button h-14 rounded-2xl bg-deep font-bold text-cream">
          공유하기
        </button>
        <button type="button" onClick={handleSaveColor} disabled={isSaving} className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white/55 font-bold text-deep disabled:opacity-60">
          <DownloadIcon />
          {isSaving ? "저장 중" : "컬러 저장"}
        </button>
      </div>
      <button type="button" onClick={onRestart} className="h-14 rounded-2xl bg-white/55 font-bold text-deep">
        다시 테스트하기
      </button>

      <div className="pointer-events-none fixed left-[-9999px] top-0" aria-hidden="true">
        <div ref={exportCardRef}>
          <ResultExportCard result={result} />
        </div>
      </div>
    </section>
  );
}
