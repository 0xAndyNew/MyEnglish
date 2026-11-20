import { useCallback, useEffect, useRef, useState } from 'react';
import type { AppTab } from './theme/ageTiers';

export interface AppRoute {
  tab: AppTab;
  /** Step code (e.g. "T2") when a learning module is open */
  stepCode?: string;
  /** Optional sub-view inside the module (e.g. "srs") */
  sub?: string;
}

const TABS: AppTab[] = ['today', 'learn', 'practice', 'progress', 'me'];

export function parseHash(hash: string): AppRoute {
  const clean = hash.replace(/^#\/?/, '');
  const [tabRaw, stepCode, sub] = clean.split('/').filter(Boolean);
  const tab = (TABS as string[]).includes(tabRaw) ? (tabRaw as AppTab) : 'today';
  return {
    tab,
    stepCode:
      (tab === 'learn' || tab === 'practice') && stepCode
        ? decodeURIComponent(stepCode)
        : undefined,
    sub:
      (tab === 'learn' || tab === 'practice') && stepCode && sub
        ? decodeURIComponent(sub)
        : undefined,
  };
}

export function routeToHash(r: AppRoute): string {
  let h = `#/${r.tab}`;
  if (r.stepCode) {
    h += `/${encodeURIComponent(r.stepCode)}`;
    if (r.sub) h += `/${encodeURIComponent(r.sub)}`;
  }
  return h;
}

/**
 * Tiny hash router so the phone's Back button closes modules instead of leaving the app.
 * Push entries are tagged with { appNav: true } so `back()` knows whether history.back() is safe.
 */
export function useHashRoute() {
  const [route, setRoute] = useState<AppRoute>(() => parseHash(window.location.hash));

  useEffect(() => {
    const sync = () => setRoute(parseHash(window.location.hash));
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const navigate = useCallback((next: AppRoute, opts?: { replace?: boolean }) => {
    const hash = routeToHash(next);
    if (hash === window.location.hash) {
      setRoute(next);
      return;
    }
    if (opts?.replace) {
      window.history.replaceState(window.history.state, '', hash);
    } else {
      window.history.pushState({ appNav: true }, '', hash);
    }
    setRoute(next);
    window.scrollTo({ top: 0 });
  }, []);

  const back = useCallback(
    (fallback: AppRoute) => {
      if (window.history.state?.appNav) {
        window.history.back();
      } else {
        navigate(fallback, { replace: true });
      }
    },
    [navigate]
  );

  return { route, navigate, back };
}

let overlaySeq = 0;

/**
 * Let the hardware/browser Back button close an overlay (bottom sheet, modal).
 * Pushes a history entry when `open` becomes true; popping it calls onClose.
 */
export function useBackToClose(open: boolean, onClose: () => void) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const overlayId = ++overlaySeq;
    window.history.pushState({ appNav: true, overlayId }, '', window.location.href);
    let poppedByBrowser = false;
    const onPop = () => {
      if (window.history.state?.overlayId === overlayId) return;
      poppedByBrowser = true;
      onCloseRef.current();
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      if (poppedByBrowser) return;
      // Closed via UI → drop the entry we pushed (deferred so StrictMode re-runs stay safe)
      window.setTimeout(() => {
        if (window.history.state?.overlayId === overlayId) window.history.back();
      }, 0);
    };
  }, [open]);
}
