# Public Performance Baseline

## Production bundle

The current production build emits a **578.32 kB** main JavaScript bundle (**164.11 kB gzip**), a **168.83 kB** stylesheet (**29.17 kB gzip**), a lazily loaded **235.67 kB** admin-dashboard bundle (**64.01 kB gzip**), and a lazily loaded **16.34 kB** AI Systems gallery bundle (**2.44 kB gzip**).

The homepage is otherwise operating as expected: the hero image receives high-priority async decoding, while About, Websites, and AI Systems images use deferred decoding and/or native lazy loading. The complete homepage remains composed in the initial route bundle, so below-the-fold section code is the primary safe optimization target.

## Visual baseline

The public desktop homepage loaded correctly with the retained hero, public Website cards, and AI Systems preview. The dark editorial styling, existing fast cursor, and public navigation must remain unchanged during optimization.

## Deferred-content verification

After the performance changes, a fresh public homepage load rendered the hero first. Scrolling one viewport then loaded the retained About, Services, Websites, AI Systems, Experience, contact, and footer content without a visible route failure. This confirms that non-critical content is deferred only until the visitor reaches it, rather than being removed or delayed indefinitely.

The separate AI Systems gallery route was also opened after moving the data provider out of the initial homepage entry. Its managed workflow cards rendered correctly, confirming that the deferred data client loads with both public data-consuming routes.

## Result

The public initial JavaScript entry was reduced from **578.32 kB (164.11 kB gzip)** to **429.81 kB (126.33 kB gzip)**. That is a reduction of **148.51 kB uncompressed** and **37.78 kB gzip**—approximately **23% smaller uncompressed** and **23% smaller gzipped**. The managed-content provider, public below-the-fold sections, AI Systems gallery, and private admin route now load only when the relevant route or viewport needs them.

A fresh development-browser homepage load showed only the initial shell, hero, and related source modules before scrolling. The previous eager `portfolio.list` Website/AI System request was absent until deferred portfolio content is reached.
