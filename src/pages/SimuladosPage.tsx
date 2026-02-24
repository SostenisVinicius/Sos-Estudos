import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { AppState } from '../App';
import { mockTotals } from '../domain/calculations';

export const SimuladosPage = ({ state }: { state: AppState }) => {
  const data = state.mockExams.map((m) => ({ date: m.date, total: mockTotals(m).totalPercent, ti: m.correctIT, portugues: m.correctPortuguese }));
  return (
    <div className="card h-[320px]">
      <h2 className="mb-2 font-semibold">Evolução dos simulados</h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="total" stroke="#22c55e" /></LineChart>
      </ResponsiveContainer>
    </div>
  );
};
