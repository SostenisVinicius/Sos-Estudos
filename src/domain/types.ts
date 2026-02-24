import { z } from 'zod';

export const subjects = [
  'TI (Banco de Dados)',
  'Português',
  'TI (Algoritmos/Estruturas)',
  'Prob/Estat',
  'TI (Linguagens/Ferramentas)',
  'Bancários',
  'Atualidades',
] as const;

export type Subject = (typeof subjects)[number];

export const settingsSchema = z.object({
  dailyMinutesGoal: z.number().default(90),
  dailyQuestionsGoal: z.number().default(20),
  studyDaysPerWeek: z.number().default(6),
  offDay: z.string().default('Sunday'),
  cycle: z.enum(['Ciclo 1', 'Ciclo 2', 'Ciclo 3']).default('Ciclo 1'),
  phase: z.enum(['Base', 'Consolidação', 'Reta final']).default('Base'),
  scheduleMap: z.record(z.string(), z.string()),
  saturdayMode: z.enum(['Bancários', 'Atualidades']).default('Bancários'),
  darkMode: z.boolean().default(true),
});
export type Settings = z.infer<typeof settingsSchema>;

export const dailyLogSchema = z.object({
  id: z.string(),
  date: z.string(),
  weekday: z.string(),
  subject: z.enum(subjects),
  topic: z.string(),
  minutesReview: z.number(),
  minutesTheory: z.number(),
  minutesQuestions: z.number(),
  minutesWrapUp: z.number(),
  didReview: z.boolean(),
  didTheory: z.boolean(),
  didWrapUp: z.boolean(),
  questionsDone: z.number(),
  questionsCorrect: z.number(),
  errorsNotedCount: z.number(),
  notes: z.string(),
  isOffDay: z.boolean().optional(),
});
export type DailyLog = z.infer<typeof dailyLogSchema>;

export const errorNoteSchema = z.object({
  id: z.string(),
  date: z.string(),
  subject: z.enum(subjects),
  topic: z.string(),
  questionRef: z.string(),
  whyMissed: z.string(),
  ruleOfThumb: z.string(),
  severity: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  reviewD1: z.boolean(),
  reviewD7: z.boolean(),
  reviewD30: z.boolean(),
  linkedDailyLogId: z.string().optional(),
});
export type ErrorNote = z.infer<typeof errorNoteSchema>;

export const essaySchema = z.object({
  id: z.string(),
  date: z.string(),
  theme: z.string(),
  minutes: z.number(),
  structureOk: z.boolean(),
  grammarOk: z.boolean(),
  cohesionOk: z.boolean(),
  score: z.number().min(0).max(100),
  improvements: z.string(),
  linkedDailyLogId: z.string().optional(),
});
export type Essay = z.infer<typeof essaySchema>;

export const mockExamSchema = z.object({
  id: z.string(),
  date: z.string(),
  type: z.enum(['Curto', 'Maior']),
  totalQuestions: z.number(),
  totalMinutes: z.number(),
  correctPortuguese: z.number(),
  correctMath: z.number(),
  correctMarketNews: z.number(),
  correctProbStat: z.number(),
  correctBanking: z.number(),
  correctIT: z.number(),
  notes: z.string(),
});
export type MockExam = z.infer<typeof mockExamSchema>;

export const weekPlanSchema = z.object({
  id: z.string(),
  weekStartDate: z.string(),
  cycle: z.enum(['Ciclo 1', 'Ciclo 2', 'Ciclo 3']),
  phase: z.enum(['Base', 'Consolidação', 'Reta final']),
  dailyQuestionsGoalOverride: z.number().optional(),
  dailyMinutesGoalOverride: z.number().optional(),
});
export type WeekPlan = z.infer<typeof weekPlanSchema>;

export const backupSchema = z.object({
  schemaVersion: z.number(),
  settings: settingsSchema,
  dailyLogs: z.array(dailyLogSchema),
  errorNotes: z.array(errorNoteSchema),
  essays: z.array(essaySchema),
  mockExams: z.array(mockExamSchema),
  weekPlans: z.array(weekPlanSchema),
});
export type BackupPayload = z.infer<typeof backupSchema>;
