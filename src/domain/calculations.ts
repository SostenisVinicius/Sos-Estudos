import type { DailyLog, MockExam, Settings } from './types';

export const calcAccuracy = (correct: number, total: number): number =>
  total === 0 ? 0 : Math.round((correct / total) * 100);

export const totalMinutes = (d: DailyLog): number =>
  d.minutesReview + d.minutesTheory + d.minutesQuestions + d.minutesWrapUp;

export const progressPercent = (d: DailyLog, settings: Settings): number => {
  let score = 0;
  if (d.topic.trim()) score += 20;
  if (d.questionsDone >= settings.dailyQuestionsGoal) score += 20;
  if (d.didReview) score += 20;
  if (d.didTheory) score += 20;
  if (d.didWrapUp) score += 10;
  if (d.errorsNotedCount >= 5) score += 10;
  return score;
};

export const statusForLog = (d: DailyLog, settings: Settings): 'Concluído' | 'Parcial' | 'Pendente' => {
  const total = totalMinutes(d);
  const full =
    d.topic.trim().length > 0 &&
    d.questionsDone >= settings.dailyQuestionsGoal &&
    d.didReview &&
    d.didTheory &&
    d.didWrapUp &&
    d.errorsNotedCount >= 5;

  if (full) return 'Concluído';
  if (total > 0 || d.questionsDone > 0 || d.topic.trim().length > 0) return 'Parcial';
  return 'Pendente';
};

export const mockTotals = (m: MockExam) => {
  const totalCorrect =
    m.correctPortuguese + m.correctMath + m.correctMarketNews + m.correctProbStat + m.correctBanking + m.correctIT;
  return { totalCorrect, totalPercent: calcAccuracy(totalCorrect, m.totalQuestions) };
};
