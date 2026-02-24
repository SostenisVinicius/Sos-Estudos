import { describe, expect, it } from 'vitest';
import { calcAccuracy, progressPercent, statusForLog } from './calculations';
import { defaultSettings } from '../data/defaults';

const base = {
  id: '1', date: '2026-01-01', weekday: 'quinta', subject: 'Português' as const, topic: 'Crase',
  minutesReview: 10, minutesTheory: 25, minutesQuestions: 45, minutesWrapUp: 10,
  didReview: true, didTheory: true, didWrapUp: true, questionsDone: 20, questionsCorrect: 15, errorsNotedCount: 5, notes: ''
};

describe('calculations', () => {
  it('accuracy', () => expect(calcAccuracy(15, 20)).toBe(75));
  it('status concluído', () => expect(statusForLog(base, defaultSettings)).toBe('Concluído'));
  it('progress 100', () => expect(progressPercent(base, defaultSettings)).toBe(100));
});
