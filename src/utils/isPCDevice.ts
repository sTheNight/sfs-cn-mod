export function isPCDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const userAgent = navigator.userAgent.toLowerCase()
  const isMobileDevice =
    /android|iphone|ipad|ipod|mobile|blackberry|iemobile|opera mini|webos/i.test(
      userAgent,
    )
  return !isMobileDevice
}
