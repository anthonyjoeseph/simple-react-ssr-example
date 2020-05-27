const safeWindow = {
  __INITIAL__DATA__: '',
  ...(typeof window !== 'undefined'
  ? window
  : {
    addEventListener: <K extends keyof WindowEventMap>(
      type: K,
      listener: (this: Window, ev: WindowEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions) => {},
    onpopstate: (_this: WindowEventHandlers, ev: PopStateEvent) => {},
    location: {
      href: '',
      host: '',
      protocol: '',
    },
    history: {
      pushState: (data: any, title: string, url?: string | null) => {},
    }
  })
}

export default safeWindow;