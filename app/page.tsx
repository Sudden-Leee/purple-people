"use client";

import { useMemo, useState } from "react";
import { HomeIntro } from "@/components/HomeIntro";
import { QuestionScreen } from "@/components/QuestionScreen";
import { ResultScreen } from "@/components/ResultScreen";
import { ScreenFrame } from "@/components/ScreenFrame";
import { ShareCardScreen } from "@/components/ShareCardScreen";
import { SplashScreen } from "@/components/SplashScreen";
import { questions } from "@/data/questions";
import { getResult, getScoreProfile, type Answers } from "@/lib/scoring";

type AppStep = "splash" | "home" | "question" | "result" | "share";

export default function Page() {
  const [step, setStep] = useState<AppStep>("splash");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const result = useMemo(() => getResult(answers), [answers]);
  const profile = useMemo(() => getScoreProfile(answers), [answers]);

  const restart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setStep("home");
  };

  const finish = () => {
    if (Object.keys(answers).length === questions.length) {
      setStep("result");
    }
  };

  return (
    <ScreenFrame>
      {step === "splash" && <SplashScreen onDone={() => setStep("home")} />}
      {step === "home" && (
        <HomeIntro
          onStart={() => {
            setCurrentIndex(0);
            setStep("question");
          }}
        />
      )}
      {step === "question" && (
        <QuestionScreen
          answers={answers}
          currentIndex={currentIndex}
          onAnswer={(value) => {
            setAnswers((prev) => ({ ...prev, [questions[currentIndex].id]: value }));
          }}
          onPrev={() => setCurrentIndex((index) => Math.max(0, index - 1))}
          onNext={() => setCurrentIndex((index) => Math.min(questions.length - 1, index + 1))}
          onFinish={finish}
        />
      )}
      {step === "result" && (
        <ResultScreen
          answers={answers}
          result={result}
          profile={profile}
          onRestart={restart}
        />
      )}
      {step === "share" && <ShareCardScreen result={result} onBack={() => setStep("result")} onRestart={restart} />}
    </ScreenFrame>
  );
}
