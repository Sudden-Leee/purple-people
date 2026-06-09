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
            <div className="mt-5 grid grid-cols-2 gap-4 border-y border-cream/24 py-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cream/74">채도</p>
                <p className="mt-1 text-3xl font-bold leading-none text-cream">{saturationScore}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-cream/74">명도</p>
                <p className="mt-1 text-3xl font-bold leading-none text-cream">{lightnessScore}</p>
              </div>
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
