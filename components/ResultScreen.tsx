import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { Answers, ScoreProfile } from "@/lib/scoring";
import type { ResultType } from "@/data/results";
import { Logo, LogoText } from "./Logo";
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
  return (
    <div className="w-[390px] bg-[#F7F4EE] text-ink">
      <div className="relative min-h-[760px] overflow-hidden bg-deep p-7 shadow-soft">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${result.image})` }}
        />
        <img src={result.image} alt="" crossOrigin="anonymous" className="absolute inset-0 h-full w-full scale-110 object-cover" />
        <div className="absolute inset-0 bg-cream/24 mix-blend-screen" />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${result.hex}4D 0%, rgba(255,246,227,0.36) 46%, ${result.hex}40 100%)`,
          }}
        />

        <div className="relative z-10 flex min-h-[680px] flex-col bg-cream/90 px-5 py-6 text-ink shadow-[0_18px_60px_rgba(33,19,41,0.18)]">
          <div className="text-center">
            <Logo className="text-[16px] font-medium leading-none text-ink" />
            <p className="mt-1 font-serif text-[10px] font-normal leading-none text-ink/76">Your Personal Purple</p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="h-[52px] w-[52px] shrink-0 rounded-full border border-white/90 bg-white/36 p-1.5 shadow-[0_10px_24px_rgba(80,38,104,0.16)]">
              <div className="h-full w-full rounded-full" style={{ backgroundColor: result.hex }} />
            </div>
            <div>
              <h2 className="text-[31px] font-medium uppercase leading-none" style={{ color: result.hex }}>
                <LogoText>{result.title.replace(" Purple", "")}</LogoText>
              </h2>
              <p className="mt-2 text-center text-[11px] font-semibold leading-4 text-deep/56">{result.subtitle}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2.5">
            {result.keywords.map((keyword) => (
              <span
                key={keyword}
                className="flex min-h-[42px] items-center justify-center rounded-[999px] bg-white/48 px-2.5 text-center text-[11px] font-semibold leading-4 text-deep/70 shadow-[0_8px_18px_rgba(80,38,104,0.04)]"
              >
                {keyword}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-9 max-w-[286px] space-y-2.5 break-keep border-y border-deep/8 py-5 text-center text-[14px] font-medium leading-7 text-ink/78 [word-break:keep-all]">
            {result.description.split(".").map((sentence) => sentence.trim()).filter(Boolean).map((sentence) => (
              <p key={sentence}>{sentence}.</p>
            ))}
          </div>

          <div className="mt-auto border-t border-deep/10 pt-4">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-deep">Personal Purple</p>
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
    <section className="-mx-5 -my-5 flex min-h-dvh flex-col gap-4">
      <ResultHeroCard result={result} saturationScore={profile.vividScore} lightnessScore={lightnessScore} />

      {message && (
        <p className="mx-5 rounded-2xl bg-white/55 px-4 py-3 text-center text-sm font-semibold leading-5 text-deep">
          {message}
        </p>
      )}

      <div className="mt-auto grid grid-cols-2 gap-3 px-5 pt-1">
        <button type="button" onClick={handleShare} className="silk-button h-14 rounded-2xl bg-deep font-bold text-cream shadow-[0_14px_30px_rgba(80,38,104,0.2)]">
          공유하기
        </button>
        <button type="button" onClick={handleSaveColor} disabled={isSaving} className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/76 bg-white/62 font-bold text-deep shadow-[0_14px_30px_rgba(80,38,104,0.1)] disabled:opacity-60">
          <DownloadIcon />
          {isSaving ? "저장 중" : "컬러 저장"}
        </button>
      </div>
      <button type="button" onClick={onRestart} className="mx-5 mb-5 h-14 rounded-2xl border border-white/76 bg-white/62 font-bold text-deep shadow-[0_14px_30px_rgba(80,38,104,0.1)]">
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
