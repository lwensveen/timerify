import { describe, it, expect, vi } from 'vitest';
import { timerify } from '../src';

describe('timerify', () => {
  it('returns wrapped function result (sync)', () => {
    const add = (a: number, b: number) => a + b;
    const wrapped = timerify(add);
    expect(wrapped(2, 3)).toBe(5);
  });

  it('logs once for a sync function', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const fn = timerify(() => 42, 'syncTest');
    fn();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0]).toMatch(/syncTest took/);
    spy.mockRestore();
  });

  it('respects min threshold', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const fn = timerify(() => 42, { min: 999 }); // unrealistically high
    fn();
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it('handles async functions', async () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const asyncFn = timerify(async () => {
      await new Promise(r => setTimeout(r, 10));
      return 'ok';
    }, 'asyncTest');
    const result = await asyncFn();
    expect(result).toBe('ok');
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it('uses custom logger callback', () => {
    const logger = vi.fn();
    const fn = timerify(() => 1, 'cbTest', { logger });
    fn();
    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger.mock.calls[0][0]).toEqual(
      expect.objectContaining({ name: 'cbTest', ms: expect.any(Number) })
    );
  });
});
