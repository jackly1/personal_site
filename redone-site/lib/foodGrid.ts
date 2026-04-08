/**
 * Row counts for a symmetric “circular” layout (widest row at center), e.g. 7 → [2,3,2].
 */
export function circularRowCounts(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [1];

  const rows = Math.min(n, Math.max(3, Math.round(Math.sqrt(n))));
  const weights = Array.from(
    { length: rows },
    (_, i) => 2 + Math.min(i, rows - 1 - i),
  );
  const sumW = weights.reduce((a, b) => a + b, 0);
  const counts = weights.map((w) => Math.floor((n * w) / sumW));
  let remainder = n - counts.reduce((a, b) => a + b, 0);
  const centerIdx = (rows - 1) / 2;
  const order = Array.from({ length: rows }, (_, i) => i).sort(
    (a, b) => Math.abs(a - centerIdx) - Math.abs(b - centerIdx),
  );
  for (let r = 0; r < remainder; r++) {
    counts[order[r % rows]]++;
  }
  return counts;
}

export function chunkIntoRows<T>(items: T[], rowCounts: number[]): T[][] {
  const out: T[][] = [];
  let i = 0;
  for (const c of rowCounts) {
    out.push(items.slice(i, i + c));
    i += c;
  }
  return out;
}
