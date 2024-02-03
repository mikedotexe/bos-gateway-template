import { useCallback, useEffect, useState } from 'react';

/**
 * Use Application flags
 *
 * `const [flags, setFlags] = useFlags();`
 *
 * Warning: setFlags causes page reload
 */

type Flags = {
  bosLoaderUrl?: string;
};

export function useFlags() {
  const [rawFlags, setRawFlags] = useState<Flags>();

  useEffect(() => {
    const flags = localStorage.getItem('flags') ? JSON.parse(localStorage.getItem('flags') || '') : {};
    setRawFlags(flags);
  }, []);

  useEffect(() => {
    // Existing flags from local storage or an empty object
    let flags = localStorage.getItem('flags') ? JSON.parse(localStorage.getItem('flags') || '') : {};

    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    const bosLoaderUrl = params.get('bosLoaderUrl');
    const hasLocalURLParam = params.has('local');

    // Check if URL contains bosLoaderUrl and update flags accordingly
    if (bosLoaderUrl) {
      flags = { ...flags, bosLoaderUrl };
      setRawFlags(flags);
    } else if (hasLocalURLParam) {
        const whatThatMeans = {
          bosLoaderUrl: "http://127.0.0.1:3030"
        };
        flags = { ...flags, ...whatThatMeans };
        setRawFlags(flags);
    }

  }, []);


  const setFlags = useCallback((newFlags: Flags) => {
    setRawFlags((f) => {
      const updated = { ...f, ...newFlags };
      localStorage.setItem('flags', JSON.stringify(updated));

      alert('Flags have been saved.');

      // reload for changes to take effect
      location.reload();

      // may not be reachable
      return updated;
    });
  }, []);

  return [rawFlags, setFlags] as const;
}
