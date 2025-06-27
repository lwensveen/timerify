import { performance } from 'perf_hooks';

export interface TimerifyOptions {
  /** Log only when runtime ≥ min milliseconds */
  min?: number;
  /** Override logging output (defaults to console.log) */
  logger?: (info: { name: string; ms: number }) => void;
}

export function timerify<T extends (...args: any[]) => any>(
  fn: T,
  nameOrOpts?: string | TimerifyOptions,
  maybeOpts?: TimerifyOptions
): T {
  let name: string;
  let opts: TimerifyOptions;

  if (typeof nameOrOpts === 'string') {
    name = nameOrOpts;
    opts = maybeOpts ?? {};
  } else {
    name = fn.name || 'anonymous';
    opts = nameOrOpts ?? {};
  }

  const { min = 0, logger } = opts;
  const log = logger
    ? logger
    : ({ name, ms }: { name: string; ms: number }) =>
        console.log(`⏱️  ${name} took ${ms.toFixed(2)} ms`);

  function report(ms: number) {
    if (ms >= min) log({ name, ms });
  }

  return function (...args: Parameters<T>): ReturnType<T> {
    const start = performance.now();
    const result = fn(...args);

    const stop = () => report(performance.now() - start);

    if (result instanceof Promise) {
      return result.finally(stop) as ReturnType<T>;
    }

    stop();
    return result;
  } as T;
}
