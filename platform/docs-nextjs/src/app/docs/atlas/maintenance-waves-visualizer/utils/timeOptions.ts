/** 48 options: 00:00, 00:30, 01:00 … 23:30 */
export const TIME_OPTIONS_30MIN = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  const label = `${h}:${m}`;
  return { value: label, label };
});
