import * as React from "react"

// Below this width the sidebar renders as an off-canvas drawer. Set to the
// `lg` breakpoint because the nav is text-only: the persistent labeled sidebar
// only fits from 1024px up; tablets use the drawer instead of a cramped rail.
const MOBILE_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange);
  }, [])

  return !!isMobile
}
