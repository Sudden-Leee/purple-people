import { questions } from "@/data/questions";
import { resultTypes } from "@/data/results";
import { Logo } from "./Logo";

type QuestionScreenProps = {
  answers: Record<number, number>;
  currentIndex: number;
  onAnswer: (value: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

const labels = ["첫 번째 선택지에 매우 가까움", "첫 번째 선택지에 가까움", "중립", "두 번째 선택지에 가까움", "두 번째 선택지에 매우 가까움"];
const scoreColors = [
  "bg-[#DFC995]",
  "bg-[#F4EAD2]",
  "bg-[#CFC7D2]",
  "bg-[#CDA7E4]",
  "bg-[#7E35B2]",
];
const questionVisuals = resultTypes.map((result) => result.image);

export function QuestionScreen({
  answers,
  currentIndex,
  onAnswer,
  onPrev,
  onNext,
  onFinish,
}: QuestionScreenProps) {
  const question = questions[currentIndex];
  const answer = answers[question.id];
  const progress = Math.round(((currentIndex + 1) / questions.length) * 100);
  const isLast = currentIndex === questions.length - 1;
  const canContinue = Boolean(answer);
  const visual = questionVisuals[currentIndex % questionVisuals.length];

  return (
    <section className="-mx-5 -my-5 flex min-h-dvh flex-col overflow-hidden bg-cream">
      <div className="relative flex flex-1 flex-col overflow-hidden px-5 py-5">
        <img
          src={visual}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,246,227,0.62)_0%,rgba(255,246,227,0.2)_42%,rgba(58,27,73,0.16)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(255,250,238,0.64)_0%,rgba(255,250,238,0.24)_40%,rgba(255,250,238,0)_68%)]" />

        <header className="relative z-10 pt-1 text-center">
          <Logo className="text-[15px] font-semibold leading-none text-deep" />
          <p className="mt-1 font-serif text-[10px] font-normal leading-none text-deep/72">Your Personal Purple</p>
        </header>

        <div className="relative z-10 mt-7 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.12em] text-deep/64">
          <span>Question {String(question.id).padStart(2, "0")}</span>
          <span>{progress}%</span>
        </div>
        <div className="relative z-10 mt-2 h-1.5 overflow-hidden rounded-full bg-white/48">
          <div className="h-full rounded-full bg-deep/76 transition-all" style={{ width: `${progress}%` }} />
        </div>

        <div className="relative z-10 mt-5 flex flex-1 flex-col rounded-[30px] bg-[#FFF7E6]/88 px-5 py-6 text-ink shadow-[0_18px_56px_rgba(33,19,41,0.15)] backdrop-blur-[2px]">
          <div className="text-center">
            <p className="font-serif text-[11px] leading-none text-deep/58">choose your shade</p>
            <h2 className="mx-auto mt-5 max-w-[300px] break-keep text-[23px] font-semibold leading-snug text-ink [word-break:keep-all]">
              {question.question}
            </h2>
          </div>

          <div className="mt-9 grid gap-3">
            <div className="rounded-[24px] bg-[#EEDAB2]/95 p-5 shadow-[0_10px_26px_rgba(80,38,104,0.06)]">
              <div className="mb-4 h-1.5 w-12 rounded-full bg-[#C9A85D]" />
              <p className="break-keep text-[16px] font-semibold leading-7 text-ink/82 [word-break:keep-all]">{question.a}</p>
            </div>
            <div className="rounded-[24px] bg-[#BF86DA]/90 p-5 shadow-[0_10px_26px_rgba(80,38,104,0.09)]">
              <div className="mb-4 h-1.5 w-12 rounded-full bg-[#6F2A9F]" />
              <p className="break-keep text-[16px] font-semibold leading-7 text-ink/84 [word-break:keep-all]">{question.b}</p>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <p className="mb-3 text-center text-[12px] font-medium leading-5 text-deep/62">
              두 문장 사이에서 지금의 감각에 가까운 지점을 골라주세요.
            </p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onAnswer(value)}
                  className={`flex h-14 items-center justify-center rounded-[18px] bg-white/30 p-1 transition ${
                    answer === value
                      ? "shadow-[0_12px_28px_rgba(80,38,104,0.24),inset_0_0_0_3px_rgba(255,246,227,0.72)]"
                      : "shadow-[0_8px_18px_rgba(80,38,104,0.045)]"
                  }`}
                  aria-label={`${value}점 ${labels[value - 1]}`}
                >
                  <span className={`h-full w-full rounded-[13px] ${scoreColors[value - 1]}`} />
                </button>
              ))}
            </div>
            <div className="mt-3 flex justify-between gap-2 text-[11px] font-semibold text-deep/56">
              <span>크림에 가까움</span>
              <span>중립</span>
              <span>보라에 가까움</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-4 grid grid-cols-[0.8fr_1.2fr] gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="h-14 rounded-2xl bg-white/60 px-4 font-bold text-deep shadow-[0_14px_30px_rgba(80,38,104,0.1)] disabled:opacity-60"
          >
            이전
          </button>
          <button
            type="button"
            onClick={isLast ? onFinish : onNext}
            disabled={!canContinue}
            className="silk-button h-14 rounded-2xl bg-deep px-4 font-bold text-cream shadow-[0_14px_30px_rgba(80,38,104,0.2)] disabled:bg-dark/35"
          >
            {isLast ? "결과 보기" : "다음"}
          </button>
        </div>
      </div>
    </section>
  );
}
