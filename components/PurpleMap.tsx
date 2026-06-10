import { resultTypes } from "@/data/results";
import { LogoText } from "./Logo";

type PurpleMapProps = {
  currentResultId: string;
};

const mapOrder = ["pale", "soft", "bright", "muted", "natural", "vivid", "dark", "deep", "strong"];

const mapResults = mapOrder
  .map((id) => resultTypes.find((result) => result.id === id))
  .filter((result): result is NonNullable<typeof result> => Boolean(result));

const coordinatePositions: Record<string, { x: number; y: number }> = {
  pale: { x: 0, y: 0 },
  soft: { x: 0.5, y: 0 },
  bright: { x: 1, y: 0 },
  muted: { x: 0, y: 0.5 },
  natural: { x: 0.5, y: 0.5 },
  vivid: { x: 1, y: 0.5 },
  dark: { x: 0, y: 1 },
  deep: { x: 0.5, y: 1 },
  strong: { x: 1, y: 1 },
};

export function PurpleMap({ currentResultId }: PurpleMapProps) {
  const currentPosition = coordinatePositions[currentResultId] ?? coordinatePositions.natural;

  return (
    <section className="rounded-[28px] border border-white/70 bg-[#F7F4EE] p-5 text-deep shadow-soft">
      <div>
        <h2 className="text-xl font-medium text-ink">
          <LogoText>Purple Map</LogoText>
        </h2>
        <p className="mt-3 text-sm font-medium leading-6 text-dark">
          퍼플피플은 당신의 선택을 선택의 선명도와 태도의 무게감으로 해석합니다.
        </p>
      </div>

      <div className="mt-5 rounded-[24px] bg-cream/70 px-3 py-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-deep">Bright</p>
          <p className="mt-1 text-[11px] font-semibold leading-4 text-dark">고명도 · 밝고 개방적</p>
        </div>

        <div data-purple-map="coordinate" className="mt-3 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-2">
          <div data-map-axis-side="muted" className="text-left text-[10px] font-semibold leading-4 text-dark">
            <p className="text-[11px] uppercase tracking-[0.12em] text-deep">Muted</p>
            <p>저채도</p>
            <p className="mt-1 text-dark/64">유보적<br />조정형<br />여백</p>
          </div>

          <div className="relative rounded-[18px] bg-white/18 p-1">
            <div className="pointer-events-none absolute inset-1 rounded-[16px]">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-deep/8" />
              <div className="absolute bottom-0 top-0 left-1/2 w-px bg-deep/8" />
              <div
                data-purple-map-dot="true"
                className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream bg-deep/75 shadow-[0_2px_8px_rgba(80,38,104,0.24)]"
                style={{
                  left: `${currentPosition.x * 100}%`,
                  top: `${currentPosition.y * 100}%`,
                }}
              />
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-1.5">
              {mapResults.map((mapResult, index) => {
                const isCurrent = mapResult.id === currentResultId;

                return (
                  <div key={mapResult.id} data-purple-map-item={mapResult.id} className="min-w-0">
                    <div
                      className={`aspect-square overflow-hidden rounded-[12px] bg-cream transition ${
                        isCurrent
                          ? "border-2 border-deep shadow-[0_0_0_3px_rgba(255,246,227,0.96),0_8px_18px_rgba(80,38,104,0.16)]"
                          : "border border-white/80"
                      }`}
                    >
                      <img src={mapResult.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <p className={`mt-1.5 truncate text-center text-[9px] font-semibold leading-3 ${isCurrent ? "text-ink" : "text-dark/86"}`}>
                      {index + 1}. {mapResult.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div data-map-axis-side="vivid" className="text-right text-[10px] font-semibold leading-4 text-dark">
            <p className="text-[11px] uppercase tracking-[0.12em] text-deep">Vivid</p>
            <p>고채도</p>
            <p className="mt-1 text-dark/64">직접적<br />선명함<br />강도</p>
          </div>
        </div>

        <div className="mt-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-deep">Dark</p>
          <p className="mt-1 text-[11px] font-semibold leading-4 text-dark">저명도 · 단단하고 무게감 있는</p>
        </div>
      </div>

      <p className="mt-5 text-sm font-medium leading-6 text-dark">
        Muted는 맥락과 여백을 크게 두는 쪽, Vivid는 입장과 선택의 강도가 선명한 쪽을 의미합니다.
        Bright는 변화와 가능성에 열려 있는 태도, Dark는 안정성과 기준의 무게를 중시하는 태도를 뜻합니다.
      </p>
    </section>
  );
}
