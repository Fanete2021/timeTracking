import { Time } from 'shared/ui';
import { calculateTime, operations } from './calculateTime';

describe('calculateTime', () => {
  test('plus operation', () => {
    const a: Time = { hours: 4, minutes: 3, seconds: 2 };
    const b: Time = { hours: 5, minutes: 59, seconds: 58 };

    const result = calculateTime(a, b, operations.PLUS);

    expect(result.hours).toBe(10);
    expect(result.minutes).toBe(3);
    expect(result.seconds).toBe(0);
  });

  test('minus operation when first time greater second time', () => {
    const a: Time = { hours: 4, minutes: 3, seconds: 2 };
    const b: Time = { hours: 5, minutes: 59, seconds: 58 };
    
    const result = calculateTime(a, b, operations.MINUS);

    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });

  test('minus operation', () => {
    const a: Time = { hours: 4, minutes: 3, seconds: 2 };
    const b: Time = { hours: 5, minutes: 59, seconds: 58 };

    const result = calculateTime(b, a, operations.MINUS);

    expect(result.hours).toBe(1);
    expect(result.minutes).toBe(56);
    expect(result.seconds).toBe(56);
  });
});
