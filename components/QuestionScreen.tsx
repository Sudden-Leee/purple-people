import { questions } from "@/data/questions";

type QuestionScreenProps = {
  answers: Record<number, number>;
  currentIndex: number;
  onAnswer: (value: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

const labels = ["A에 매우 가까움", "A에 가까움", "중립", "B에 가까움", "B에 매우 가까움"];
const scoreLabels = ["A", "a", "0", "b", "B"];

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

  return (
    <section className="flex flex-1 flex-col gap-5">
      <header className="pt-2">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.14em] text-dark">
          Personal Purple Test
        </p>
        <div className="flex items-center justify-between text-sm font-bold text-dark">
          <span>Question {question.id}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/55">
          <div className="h-full rounded-full bg-vivid transition-all" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="paper-texture flex min-h-[282px] flex-col justify-between rounded-[30px] bg-cream/82 p-6 shadow-soft">
        <div className="space-y-4">
          <div>
            <h2 className="text-[22px] font-bold leading-snug text-ink">{question.question}</h2>
          </div>
          <div className="rounded-3xl bg-white/45 p-4">
            <p className="text-xs font-bold text-natural">A</p>
            <p className="mt-2 text-[17px] font-bold leading-snug text-ink">{question.a}</p>
          </div>
          <div className="rounded-3xl bg-soft/65 p-4">
            <p className="text-xs font-bold text-natural">B</p>
            <p className="mt-2 text-[17px] font-bold leading-snug text-ink">{question.b}</p>
          </div>
        </div>
        <p className="mt-6 text-sm leading-6 text-dark">
          두 문장 사이에서 지금의 감각에 더 가까운 점수를 골라주세요.
        </p>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onAnswer(value)}
            className={`flex aspect-square flex-col items-center justify-center rounded-2xl border text-sm font-black transition ${
              answer === value
                ? "border-deep bg-deep text-cream shadow-soft"
                : "border-white/70 bg-white/45 text-deep"
            }`}
            aria-label={`${value}점 ${labels[value - 1]}`}
          >
            <span className="text-xl">{scoreLabels[value - 1]}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between gap-2 text-xs font-bold text-dark">
        <span>A</span>
        <span>{labels[2]}</span>
        <span>B</span>
      </div>

      <div className="mt-auto grid grid-cols-[0.8fr_1.2fr] gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="h-14 rounded-2xl bg-white/50 px-4 font-bold text-deep disabled:opacity-35"
        >
          이전
        </button>
        <button
          type="button"
          onClick={isLast ? onFinish : onNext}
          disabled={!canContinue}
          className="silk-button h-14 rounded-2xl bg-deep px-4 font-bold text-cream disabled:bg-dark/35"
        >
          {isLast ? "결과 보기" : "다음"}
        </button>
      </div>
    </section>
  );
}
