import type { ResultType } from "@/data/results";
import type { CSSProperties } from "react";
import { Logo, LogoText } from "./Logo";

type ResultHeroCardProps = {
  result: ResultType;
  mode?: "result" | "share";
  saturationScore?: number;
  lightnessScore?: number;
};

function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const value = parseInt(cleanHex, 16);

  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function hexToRgba(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getPanelTint(result: ResultType) {
  if (result.lightness === "low") return "rgba(255, 246, 227, 0.9)";
  if (result.saturation === "muted") return "rgba(247, 244, 238, 0.93)";
  return "rgba(255, 246, 227, 0.92)";
}

function getDisplayColor(result: ResultType) {
  if (result.id === "pale") return "#8D7A97";
  if (result.id === "soft") return "#C591E5";
  if (result.id === "bright") return "#C08AF0";
  return result.hex;
}

function getCoordinate(result: ResultType) {
  const x = result.saturation === "muted" ? 0.28 : result.saturation === "vivid" ? 0.72 : 0.5;
  const y = result.lightness === "high" ? 0.34 : result.lightness === "low" ? 0.66 : 0.5;

  return { x, y };
}

function DescriptionBlock({ text }: { text: string }) {
  const sentences = text.split(".").map((sentence) => sentence.trim()).filter(Boolean);

  return (
    <div className="mx-auto mt-9 max-w-[286px] space-y-2.5 break-keep border-y border-deep/8 py-5 text-center text-[14px] font-medium leading-7 text-ink/78 [word-break:keep-all]">
      {sentences.map((sentence) => (
        <p key={sentence}>{sentence}.</p>
      ))}
    </div>
  );
}

function QuadrantGraph({ result }: { result: ResultType }) {
  const position = getCoordinate(result);

  return (
    <div className="mt-11">
      <div className="relative mx-auto aspect-[0.9] w-full max-w-[300px] px-2 text-deep">
        <div className="absolute left-[20%] right-[20%] top-1/2 h-[1.5px] bg-[var(--result-color)] opacity-70" />
        <div className="absolute bottom-[23%] left-1/2 top-[29%] w-[1.5px] bg-[var(--result-color)] opacity-70" />

        <div className="absolute left-1/2 top-[21%] w-[74%] -translate-x-1/2 text-center">
          <p className="break-keep text-[9px] font-medium leading-3 text-deep/58 [word-break:keep-all]">맥락과 여백을 크게 고려하는 사람</p>
          <p className="mt-1 text-[20px] font-medium uppercase leading-none tracking-[0.06em] text-[var(--result-color)]">Bright</p>
        </div>

        <div className="absolute bottom-[16%] left-1/2 w-[72%] -translate-x-1/2 text-center">
          <p className="text-[20px] font-medium uppercase leading-none tracking-[0.06em] text-[var(--result-color)]">Dark</p>
          <p className="mt-1.5 break-keep text-[9px] font-medium leading-3 text-deep/58 [word-break:keep-all]">입장과 선택이 견고한 사람</p>
        </div>

        <div className="absolute left-[4%] top-1/2 w-[29%] -translate-y-1/2 text-left">
          <p className="text-[18px] font-medium uppercase leading-none tracking-[0.04em] text-[var(--result-color)]">Muted</p>
          <p className="mt-2 break-keep text-[9px] font-medium leading-3 text-deep/58 [word-break:keep-all]">주변 환경을<br />중요시하는 사람</p>
        </div>

        <div className="absolute right-[4%] top-1/2 w-[29%] -translate-y-1/2 text-right">
          <p className="text-[18px] font-medium uppercase leading-none tracking-[0.04em] text-[var(--result-color)]">Vivid</p>
          <p className="mt-2 break-keep text-[9px] font-medium leading-3 text-deep/58 [word-break:keep-all]">개인의 선택을<br />중요시 하는 사람</p>
        </div>

        <div
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-cream shadow-[0_5px_16px_rgba(80,38,104,0.24)]"
          style={{
            left: `${position.x * 100}%`,
            top: `${position.y * 100}%`,
            backgroundColor: "var(--result-dot)",
          }}
        />
      </div>

      <div className="mt-4 break-keep border-t border-deep/10 pt-4 text-[11px] font-medium leading-5 text-deep/68 [word-break:keep-all]">
        <p className="text-center text-[12px] font-semibold text-ink/78">퍼플피플은 생각의 밀도와 선택의 채도로 분석합니다.</p>
        <div className="mx-auto mt-3 grid max-w-[278px] gap-1.5">
          <p className="whitespace-nowrap"><span className="mr-2 inline-block w-[48px] font-semibold uppercase tracking-[0.04em] text-[var(--result-color)]">Bright</span>맥락과 여백을 크게 고려하는 사람</p>
          <p className="whitespace-nowrap"><span className="mr-2 inline-block w-[48px] font-semibold uppercase tracking-[0.04em] text-[var(--result-color)]">Dark</span>입장과 선택이 견고한 사람</p>
          <p className="whitespace-nowrap"><span className="mr-2 inline-block w-[48px] font-semibold uppercase tracking-[0.04em] text-[var(--result-color)]">Muted</span>주변 환경을 중요시하는 사람</p>
          <p className="whitespace-nowrap"><span className="mr-2 inline-block w-[48px] font-semibold uppercase tracking-[0.04em] text-[var(--result-color)]">Vivid</span>개인의 선택을 중요시 하는 사람</p>
        </div>
      </div>
    </div>
  );
}

export function ResultHeroCard({ result, mode = "result" }: ResultHeroCardProps) {
  const description = mode === "share" ? result.description.split(".")[0] + "." : result.description;
  const minHeight = mode === "share" ? "min-h-[620px]" : "min-h-[860px]";
  const panelHeight = mode === "share" ? "min-h-[500px]" : "min-h-[720px]";
  const panelTint = getPanelTint(result);
  const displayColor = getDisplayColor(result);

  return (
    <div
      className={`result-key-card relative overflow-hidden border border-white/70 bg-deep p-8 shadow-soft ${minHeight}`}
      style={{ "--result-color": displayColor, "--result-dot": result.hex } as CSSProperties}
    >
      <img src={result.image} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover" />
      <div className="absolute inset-0 bg-cream/26 mix-blend-screen" />
      <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${hexToRgba(result.hex, 0.34)} 0%, rgba(255,246,227,0.38) 48%, ${hexToRgba(result.hex, 0.3)} 100%)` }} />

      <div
        className={`relative z-10 flex ${panelHeight} flex-col overflow-hidden rounded-[24px] border border-cream/78 px-5 py-6 text-ink shadow-[0_18px_60px_rgba(33,19,41,0.18)]`}
        style={{ backgroundColor: panelTint }}
      >
        <div className="text-center">
          <Logo className="text-[18px] font-medium leading-none text-ink" />
          <p className="mt-1 font-serif text-[10px] font-normal leading-none text-ink/76">Your Personal Purple</p>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="h-[50px] w-[50px] shrink-0 rounded-full border border-white/90 bg-white/36 p-1.5 shadow-[0_10px_24px_rgba(80,38,104,0.16)]">
            <div className="h-full w-full rounded-full" style={{ backgroundColor: "var(--result-dot)" }} />
          </div>
          <div className="min-w-0">
            <h2 className="text-[32px] font-medium uppercase leading-none text-[var(--result-color)]">
              <LogoText>{result.title.replace(" Purple", "")}</LogoText>
            </h2>
            <p className="mt-2 text-center text-[11px] font-semibold leading-4 text-deep/56">{result.subtitle}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2.5">
          {result.keywords.map((keyword) => (
            <span
              key={keyword}
              className="flex min-h-[42px] min-w-0 items-center justify-center rounded-[999px] border border-white/76 bg-white/44 px-2.5 text-center text-[11px] font-semibold leading-4 text-deep/70 shadow-[inset_0_0_0_1px_rgba(80,38,104,0.035),0_8px_18px_rgba(80,38,104,0.045)] backdrop-blur-sm"
            >
              {keyword}
            </span>
          ))}
        </div>

        <DescriptionBlock text={description} />

        <QuadrantGraph result={result} />
      </div>
    </div>
  );
}
