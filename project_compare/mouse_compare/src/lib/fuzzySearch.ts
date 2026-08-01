export function damerauLevenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array<number>(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
      }
    }
  }
  return dp[m][n];
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/-/g, ' ')
    .replace(/\s+/g, ' ');
}

function runScore(qRun: string, tToken: string): number {
  if (tToken.startsWith(qRun)) return 100;
  if (qRun.length >= 3 && tToken.includes(qRun)) return 90;
  if (qRun.length < 2) return -1;
  const td = damerauLevenshtein(qRun, tToken);
  const threshold = 1 + Math.floor(Math.min(qRun.length, tToken.length) / 5);
  if (td > 0 && td <= threshold && td <= 2) return 85 - td * 10;
  return -1;
}

function tokenRunScore(qTokens: string[], tTokens: string[]): number {
  const qLen = qTokens.length;
  const tLen = tTokens.length;
  const memo = new Map<string, number>();

  function best(i: number, j: number): number {
    if (i === qLen) return 0;
    if (j === tLen) return -Infinity;
    const key = `${i},${j}`;
    const cached = memo.get(key);
    if (cached !== undefined) return cached;

    let res = best(i, j + 1);

    let run = '';
    for (let k = i; k < qLen && k < i + 3; k++) {
      run += qTokens[k];
      const s = runScore(run, tTokens[j]);
      if (s >= 0) {
        const sub = best(k + 1, j + 1);
        if (sub >= 0) res = Math.max(res, s + sub);
      }
    }

    memo.set(key, res);
    return res;
  }

  const total = best(0, 0);
  if (total < 0) return 0;
  return Math.min(100, Math.round(total / qLen));
}

export function fuzzyScore(query: string, target: string): number {
  const q = normalize(query);
  const t = normalize(target);
  if (!q) return 100;
  if (t.includes(q)) return 100;

  const qTokens = q.split(' ').filter(Boolean);
  const tTokens = t.split(' ').filter(Boolean);
  if (qTokens.length === 0 || tTokens.length === 0) return 0;

  const maxLen = Math.max(q.length, t.length);
  const wholeDist = damerauLevenshtein(q, t);
  if (wholeDist <= 2) return 90 - wholeDist * 5;
  if (q.length >= 4 && maxLen >= 6 && wholeDist <= 3) return 70;

  return tokenRunScore(qTokens, tTokens);
}

export function filterByQuery<T>(
  items: T[],
  query: string,
  getHaystacks: (item: T) => string[],
): T[] {
  const q = normalize(query);
  if (!q) return items;

  const scored: { item: T; score: number }[] = [];
  for (const item of items) {
    let best = 0;
    for (const field of getHaystacks(item)) {
      const s = fuzzyScore(q, field);
      if (s > best) best = s;
    }
    if (best > 0) scored.push({ item, score: best });
  }

  return scored.sort((a, b) => b.score - a.score).map((s) => s.item);
}
