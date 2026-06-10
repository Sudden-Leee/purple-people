import type { ResultType } from "@/data/results";
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

function getSaturationColor(level: ResultType["saturation"]) {
  if (level === "muted") return "#D6C1E3";
  if (level === "vivid") return "#9800FF";
  return "#B76DE2";
}

function getLightnessColor(level: ResultType["lightness"]) {
  if (level === "high") return "#E0ACFF";
  if (level === "low") return "#502668";
  return "#B76DE2";
}

function ScoreBar({
  label,
  value,
  leftLabel,
  rightLabel,
  color,
}: {
  label: string;
  value: number;
  leftLabel: string;
  rightLabel: string;
  color: string;
}) {
  const normalizedValue = Math.max(0, Math.min(100, value));

  return (
    <div data-score-bar={label}>
      <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.08em] text-cream/86">
        <span>{label}</span>
        <span>{normalizedValue}</span>
      </div>
      <div
        className="relative h-3.5 rounded-full border border-cream/55 shadow-[inset_0_1px_2px_rgba(33,19,41,0.16)]"
        style={{ backgroundColor: "rgba(255, 246, 227, 0.72)" }}
      >
        <div
          data-score-fill="true"
          className="h-full rounded-full"
          style={{ width: `${normalizedValue}%`, backgroundColor: color }}
        />
        <div
          data-score-marker="true"
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cream shadow-[0_2px_10px_rgba(33,19,41,0.28)]"
          style={{ left: `${normalizedValue}%`, backgroundColor: color }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.08em] text-cream/72">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

export function ResultHeroCard({ result, mode = "result", saturationScore, lightnessScore }: ResultHeroCardProps) {
  const description = mode === "share" ? result.description.split(".")[0] + "." : result.description;
  const minHeight = mode === "share" ? "min-h-[430px]" : "min-h-[560px]";
  const showStats = typeof saturationScore === "number" && typeof lightnessScore === "number";
  const bottomOverlay = hexToRgba(result.hex, 0.72);
  const midOverlay = hexToRgba(result.hex, 0.38);
  const topOverlay = hexToRgba(result.hex, 0.08);

  return (
    <div className={`relative overflow-hidden rounded-[32px] border border-white/70 bg-deep shadow-soft ${minHeight}`}>
      <img src={result.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${bottomOverlay} 0%, ${midOverlay} 44%, ${topOverlay} 100%)`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3"
        style={{
          background: `linear-gradient(to top, ${hexToRgba(result.hex, 0.82)} 0%, ${hexToRgba(result.hex, 0.48)} 54%, ${hexToRgba(result.hex, 0)} 100%)`,
        }}
      />
      <div className={`relative z-10 flex ${minHeight} flex-col justify-between p-6 text-cream [text-shadow:0_1px_16px_rgba(33,19,41,0.28)]`}>
        <div>
          <Logo className="text-xs font-semibold text-cream/90" />
        </div>

        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl border-2 border-white/80 shadow-soft" style={{ backgroundColor: result.hex }} />
            <p className="text-sm font-semibold text-cream/90">{result.subtitle}</p>
          </div>
          <h2 className="text-[40px] font-medium leading-none text-cream">
            <LogoText>{result.title}</LogoText>
          </h2>
          {showStats && (
            <div className="mt-5 space-y-3 border-y border-cream/22 py-4">
              <ScoreBar
                label="채도"
                value={saturationScore}
                leftLabel="Muted"
                rightLabel="Vivid"
                color={getSaturationColor(result.saturation)}
              />
              <ScoreBar
                label="명도"
                value={lightnessScore}
                leftLabel="Bright"
                rightLabel="Dark"
                color={getLightnessColor(result.lightness)}
              />
            </div>
          )}
          <div className="mb-4 mt-5 flex flex-wrap gap-2">
            {result.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-cream/18 px-3 py-2 text-sm font-semibold text-cream backdrop-blur-sm"
              >
                #{keyword}
              </span>
            ))}
          </div>
          <p className="text-[15px] font-semibold leading-7 text-cream/92">{description}</p>
        </div>
      </div>
    </div>
  );
}
