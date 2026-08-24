# Cursor Reliability Verification

## Root cause and correction

The published cursor was previously hidden by the browser’s `hover` media feature before it could observe an actual desktop pointer. This can fail on some laptop, browser, and input-device combinations even when a mouse or trackpad is present.

The correction leaves the native cursor available at first paint, then activates the custom dot-and-ring only after the browser reports a real mouse or pen movement. Touch pointers do not activate it. The cursor uses the same single animation-frame transform paint, reduced-motion exit, narrow-screen hiding, and pointer-event-free interaction safety as before.

## Desktop verification

The updated desktop preview shows the custom dot and ring visibly tracking within the homepage without changing the hero, navigation, project cards, or contact route layout. The normal pointer remains available until the first eligible pointer move, preventing the prior invisible-cursor state on a supported desktop device.

## Touch and accessibility verification

The 390px mobile review remains cursor-free and preserves the normal mobile menu and touch layout. The cursor code exits before registering listeners whenever `prefers-reduced-motion` is enabled. Automated validation passed with TypeScript, 31 regression assertions, and the independent Cloudflare build.
