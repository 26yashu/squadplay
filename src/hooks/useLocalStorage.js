import { useState, useEffect } from 'react';
import { getStorage, setStorage } from '../storage/localStorage';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getStorage(key, initialValue));

  useEffect(() => {
    setStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}
