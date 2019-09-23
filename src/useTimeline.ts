import { useRef } from 'react';
import usePrevious from './usePrevious';
import { MAX_ARRAY_INDEX } from './utils';

/**
 * Records states of a value over time.
 *
 * @param value Props, state or any other calculated value.
 * @param maxLength Maximum amount of states to store. Should be an integer more than 1.
 * @returns Results of state updates in chronological order.
 *
 * @example
 * function Example() {
 *   const [count, setCount] = useState(0);
 *   const counts = useTimeline(count);
 *   // ...
 *   return `Now: ${count}, history: ${counts}`;
 * }
 */
export default function useTimeline<T>(
  value: T,
  maxLength: number = MAX_ARRAY_INDEX,
): ReadonlyArray<T> {
  const valuesRef = useRef<T[]>([]);
  const prevValue = usePrevious(value);

  if (!Object.is(value, prevValue)) {
    // Use immutable refs to behave like state variables
    valuesRef.current = [...valuesRef.current, value];
  }

  if (valuesRef.current.length > maxLength) {
    valuesRef.current.splice(0, valuesRef.current.length - maxLength);
  }

  return valuesRef.current;
}
