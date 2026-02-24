import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Download, Plus, Upload } from 'lucide-react';
import { defaultSettings, seedDailyLogs } from './data/defaults';
import type { DailyLog, ErrorNote, Essay, MockExam, Settings, WeekPlan } from './domain/types';
import { repository } from './storage/repository';
import { useDebouncedSave } from './hooks/useDebouncedSave';
import { todayIso } from './utils/date';
import { DashboardPage } from './pages/DashboardPage';
import { DiarioPage } from './pages/DiarioPage';
import { SemanasPage } from './pages/SemanasPage';
import { ErrosPage } from './pages/ErrosPage';
import { RedacoesPage } from './pages/RedacoesPage';
import { SimuladosPage } from './pages/SimuladosPage';
import { ConfiguracoesPage } from './pages/ConfiguracoesPage';
import { Sidebar } from './components/Sidebar';

export type AppState = {
  settings: Settings;
  dailyLogs: DailyLog[];
  errorNotes: ErrorNote[];
  essays: Essay[];
  mockExams: MockExam[];
  weekPlans: WeekPlan[];
};

const emptyDaily = (date: string): DailyLog => ({
  id: crypto.randomUUID(), date, weekday: new Date(date).toLocaleDateString('pt-BR', { weekday: 'long' }),
  subject: 'Português', topic: '', minutesReview: 0, minutesTheory: 0, minutesQuestions: 0, minutesWrapUp: 0,
  didReview: false, didTheory: false, didWrapUp: false, questionsDone: 0, questionsCorrect: 0, errorsNotedCount: 0, notes: ''
});

export default function App() {
  const [state, setState] = useState<AppState>({ settings: defaultSettings, dailyLogs: [], errorNotes: [], essays: [], mockExams: [], weekPlans: [] });
  const [currentDate, setCurrentDate] = useState(todayIso());
  const [saved, setSaved] = useState('');

  useEffect(() => {
    (async () => {
      const dailyLogs = await repository.getAll<DailyLog>('dailyLogs');
      const settingsRows = await repository.getAll<Settings>('settings');
      setState((s) => ({ ...s, settings: settingsRows[0] ?? defaultSettings, dailyLogs: dailyLogs.length ? dailyLogs : seedDailyLogs }));
    })();
  }, []);

  useDebouncedSave(async () => {
    for (const d of state.dailyLogs) await repository.save('dailyLogs', d);
    await repository.save('settings', { ...state.settings, id: 'singleton' } as Settings & { id: string });
    setSaved('Salvo');
    setTimeout(() => setSaved(''), 1200);
  }, [state], 400);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.settings.darkMode);
  }, [state.settings.darkMode]);

  const todayLog = useMemo(() => state.dailyLogs.find((d) => d.date === currentDate) ?? emptyDaily(currentDate), [state.dailyLogs, currentDate]);

  const exportBackup = async () => {
    const payload = await repository.exportAll(state.settings);
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bb-study-tracker-${todayIso()}.json`;
    a.click();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e') void exportBackup();
      if (e.key.toLowerCase() === 'n') setState((s) => ({ ...s, dailyLogs: [emptyDaily(todayIso()), ...s.dailyLogs] }));
      if (e.key === '/') {
        e.preventDefault();
        const el = document.querySelector('input[aria-label="search"]') as HTMLInputElement | null;
        el?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2 card">
            <input className="input max-w-44" type="date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)} />
            <button className="btn" onClick={() => setState((s) => ({ ...s, dailyLogs: [todayLog, ...s.dailyLogs.filter((d) => d.date !== currentDate)] }))}><Plus size={16} className="inline" /> Registrar hoje</button>
            <button className="btn" onClick={exportBackup}><Download size={16} className="inline" /> Exportar backup</button>
            <label className="btn cursor-pointer"><Upload size={16} className="inline" /> Importar<input type="file" accept="application/json" className="hidden" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const txt = await file.text();
              const mode = window.confirm('OK = substituir tudo / Cancelar = mesclar') ? 'replace' : 'merge';
              const data = await repository.importAll(JSON.parse(txt), mode);
              setState((s) => ({ ...s, settings: data.settings, dailyLogs: data.dailyLogs, errorNotes: data.errorNotes, essays: data.essays, mockExams: data.mockExams, weekPlans: data.weekPlans }));
            }} /></label>
            <span className="text-sm text-emerald-400">{saved}</span>
          </div>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage state={state} />} />
            <Route path="/diario" element={<DiarioPage state={state} setState={setState} todayLog={todayLog} />} />
            <Route path="/semanas" element={<SemanasPage />} />
            <Route path="/erros" element={<ErrosPage />} />
            <Route path="/redacoes" element={<RedacoesPage />} />
            <Route path="/simulados" element={<SimuladosPage state={state} />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage state={state} setState={setState} onExport={exportBackup} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
