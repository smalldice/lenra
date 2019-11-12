declare var window: Window
declare var document: Document
declare interface Window {
  mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
  mozCancelAnimationFrame: (handle: number) => void
}
