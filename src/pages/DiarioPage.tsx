import type { Dispatch, SetStateAction } from 'react';
import type { AppState } from '../App';
import type { DailyLog } from '../domain/types';
import { calcAccuracy, progressPercent, statusForLog } from '../domain/calculations';

export const DiarioPage = ({ state, setState, todayLog }: { state: AppState; setState: Dispatch<SetStateAction<AppState>>; todayLog: DailyLog }) => {
  const save = (next: DailyLog) => setState((s) => ({ ...s, dailyLogs: [next, ...s.dailyLogs.filter((d) => d.id !== next.id)] }));
  const status = statusForLog(todayLog, state.settings);
  const color = status === 'Concluído' ? 'text-emerald-400' : status === 'Parcial' ? 'text-yellow-300' : 'text-red-400';
  return (
    <section className="space-y-4">
      <div className="card">
        <h2 className="mb-2 font-semibold">Modo foco (Diário)</h2>
        <div className="grid gap-2 md:grid-cols-2">
          <input className="input" placeholder="Tópico" value={todayLog.topic} onChange={(e) => save({ ...todayLog, topic: e.target.value })} />
          <input className="input" type="number" placeholder="Questões" value={todayLog.questionsDone} onChange={(e) => save({ ...todayLog, questionsDone: Number(e.target.value) })} />
          <input className="input" type="number" placeholder="Questões corretas" value={todayLog.questionsCorrect} onChange={(e) => save({ ...todayLog, questionsCorrect: Number(e.target.value) })} />
          <input className="input" type="number" placeholder="Erros anotados" value={todayLog.errorsNotedCount} onChange={(e) => save({ ...todayLog, errorsNotedCount: Number(e.target.value) })} />
        </div>
        <p className={`mt-3 ${color}`}>Status: {status} · Progresso: {progressPercent(todayLog, state.settings)}% · Acerto: {calcAccuracy(todayLog.questionsCorrect, todayLog.questionsDone)}%</p>
      </div>
      <div className="card overflow-auto">
        <input aria-label="search" placeholder="/ buscar" className="input mb-3" />
        <table className="w-full text-sm">
          <thead><tr className="text-left text-zinc-400"><th>Data</th><th>Matéria</th><th>Status</th><th>% acerto</th></tr></thead>
          <tbody>{state.dailyLogs.map((d) => {
            const s = statusForLog(d, state.settings);
            const acc = calcAccuracy(d.questionsCorrect, d.questionsDone);
            return <tr key={d.id} className="border-t border-zinc-800"><td>{d.date}</td><td>{d.subject}</td><td>{s}</td><td className={acc < 60 ? 'text-red-400' : ''}>{acc}%</td></tr>;
          })}</tbody>
        </table>
      </div>
    </section>
  );
};
