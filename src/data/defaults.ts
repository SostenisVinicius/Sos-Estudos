import type { DailyLog, Settings } from '../domain/types';

export const defaultSettings: Settings = {
  dailyMinutesGoal: 90,
  dailyQuestionsGoal: 20,
  studyDaysPerWeek: 6,
  offDay: 'Sunday',
  cycle: 'Ciclo 1',
  phase: 'Base',
  saturdayMode: 'Bancários',
  darkMode: true,
  scheduleMap: {
    Monday: 'TI (Banco de Dados)',
    Tuesday: 'Português',
    Wednesday: 'TI (Algoritmos/Estruturas)',
    Thursday: 'Prob/Estat',
    Friday: 'TI (Linguagens/Ferramentas)',
    Saturday: 'Bancários',
    Sunday: 'Folga',
  },
};

export const seedDailyLogs: DailyLog[] = [
  {
    id: 'seed-1', date: '2026-02-20', weekday: 'sexta-feira', subject: 'TI (Linguagens/Ferramentas)', topic: 'Java e APIs',
    minutesReview: 10, minutesTheory: 25, minutesQuestions: 45, minutesWrapUp: 10,
    didReview: true, didTheory: true, didWrapUp: true, questionsDone: 24, questionsCorrect: 18, errorsNotedCount: 6, notes: 'Bom ritmo.'
  },
  {
    id: 'seed-2', date: '2026-02-21', weekday: 'sábado', subject: 'Bancários', topic: 'SFN',
    minutesReview: 5, minutesTheory: 15, minutesQuestions: 20, minutesWrapUp: 5,
    didReview: true, didTheory: false, didWrapUp: false, questionsDone: 10, questionsCorrect: 5, errorsNotedCount: 2, notes: 'Dia corrido.'
  },
  {
    id: 'seed-3', date: '2026-02-22', weekday: 'domingo', subject: 'Atualidades', topic: '',
    minutesReview: 0, minutesTheory: 0, minutesQuestions: 0, minutesWrapUp: 0,
    didReview: false, didTheory: false, didWrapUp: false, questionsDone: 0, questionsCorrect: 0, errorsNotedCount: 0, notes: '', isOffDay: true
  }
];
