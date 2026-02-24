export const todayIso = () => new Date().toISOString().slice(0, 10);
export const weekdayFromDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('pt-BR', { weekday: 'long' });
