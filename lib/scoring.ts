import { questions, type ChoiceSide } from "@/data/questions";
import { resultTypes, type LightnessLevel, type ResultType, type SaturationLevel } from "@/data/results";

export type Answers = Record<number, number>;

export type ScoreProfile = {
  vividScore: number;
  intensityScore: number;
  saturation: SaturationLevel;
  lightnessLevel: LightnessLevel;
};

const saturationResultMap: Record<SaturationLevel, Record<LightnessLevel, string>> = {
  vivid: {
    high: "bright",
    mid: "vivid",
    low: "strong",
  },
  natural: {
    high: "soft",
    mid: "natural",
    low: "deep",
  },
  muted: {
    high: "pale",
    mid: "muted",
    low: "dark",
  },
};

function getVividDirection(answer: number, vividSide: ChoiceSide): number {
  const aSideDirection = 3 - answer;
  return vividSide === "A" ? aSideDirection : -aSideDirection;
}

function getIntensity(answer: number): number {
  return Math.abs(answer - 3);
}

function getSaturationLevel(vividScore: number): SaturationLevel {
  if (vividScore < 42) return "muted";
  if (vividScore > 58) return "vivid";
  return "natural";
}

function getLightnessLevel(intensityScore: number): LightnessLevel {
  if (intensityScore < 0.75) return "high";
  if (intensityScore < 1.45) return "mid";
  return "low";
}

export function getScoreProfile(answers: Answers): ScoreProfile {
  let vividDirectionTotal = 0;
  let intensityTotal = 0;
  let answeredCount = 0;

  questions.forEach((question) => {
    const answer = answers[question.id];
    if (!answer) return;

    vividDirectionTotal += getVividDirection(answer, question.vividSide);
    intensityTotal += getIntensity(answer);
    answeredCount += 1;
  });

  const averageVividDirection = answeredCount ? vividDirectionTotal / answeredCount : 0;
  const intensityScore = answeredCount ? intensityTotal / answeredCount : 0;
  const vividScore = Math.round(((averageVividDirection + 2) / 4) * 100);
  const saturation = getSaturationLevel(vividScore);
  const lightnessLevel = getLightnessLevel(intensityScore);

  return {
    vividScore,
    intensityScore: Number(intensityScore.toFixed(2)),
    saturation,
    lightnessLevel,
  };
}

export function getResult(answers: Answers): ResultType {
  const profile = getScoreProfile(answers);
  const resultId = saturationResultMap[profile.saturation][profile.lightnessLevel];
  return resultTypes.find((result) => result.id === resultId)!;
}
