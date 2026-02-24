import type { AppState } from '../App';
import { calcAccuracy, statusForLog } from '../domain/calculations';

export const DashboardPage = ({ state }: { state: AppState }) => {
  const completed = state.dailyLogs.filter((d) => statusForLog(d, state.settings) === 'Concluído').length;
  const weekQuestions = state.dailyLogs.reduce((sum, d) => sum + d.questionsDone, 0);
  const avgAcc = calcAccuracy(
    state.dailyLogs.reduce((sum, d) => sum + d.questionsCorrect, 0),
    Math.max(1, state.dailyLogs.reduce((sum, d) => sum + d.questionsDone, 0)),
  );

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div className="card"><h3 className="font-semibold">Hoje</h3><p>Meta: {state.settings.dailyMinutesGoal} min / {state.settings.dailyQuestionsGoal} questões</p></div>
      <div className="card"><h3 className="font-semibold">Semana atual</h3><p>{completed}/6 concluídos · {weekQuestions} questões · {avgAcc}% acerto médio</p></div>
      <div className="card"><h3 className="font-semibold">Top 3 piores matérias</h3><p>1) Prob/Estat 54% 2) Português 59% 3) TI(BD) 62%</p></div>
      <div className="card"><h3 className="font-semibold">Pendências caderno de erros</h3><p>D+1: 3 · D+7: 8 · D+30: 11</p></div>
      <div className="card"><h3 className="font-semibold">Redação</h3><p>Próxima: sábado</p></div>
      <div className="card"><h3 className="font-semibold">Simulado</h3><p>Último: 68%</p></div>
    </section>
  );
};
