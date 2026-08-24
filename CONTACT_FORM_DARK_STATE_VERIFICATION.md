# Contact Form Dark-State Verification

## Reported browser behavior

The user supplied Chrome screenshots showing two native browser surfaces that conflicted with the portfolio’s dark form: a white Service select popup and a white saved-information profile panel after focusing the Name field. These browser-owned overlays made the otherwise dark contact card look inconsistent.

## Applied safeguards

The form and Service select now declare `color-scheme: dark`, and each Service option has an explicit graphite background with light text. Inputs, textareas, and their focused states remain dark. Chrome-specific `-webkit-autofill` rules force a graphite inset surface, light text, and a matching caret instead of the usual bright autofill fill. The form, Name, Email, Service, and Project details inputs now request `autocomplete="off"` to reduce saved-profile prompts.

## Scope note

The website can control the form fields and native select color preference. A browser may still choose to show its own saved-information popup based on a visitor’s local Chrome settings; that popup cannot be styled by website code. The site’s fields remain dark before, during, and after focus/autofill.

## Preview verification

The rendered preview reports `color-scheme: dark` for both the contact form and Service select; the select surface is a dark translucent black with white text; and the Name field exposes `autocomplete="off"`. When focused, the Name input retains the dark lime-tinted background, lime border, and controlled three-pixel focus ring rather than switching to a white surface. The desktop contact-card view remains unchanged apart from these control-state safeguards.

The native Service menu was opened in the running Chromium preview. Its option list renders graphite/dark with light option text and no longer produces the large white dropdown shown in the user’s screenshot. The selected placeholder uses a restrained gray disabled state, while the selectable services remain dark and readable.

The responsive contact-form rules preserve the same dark controls on narrow screens and retain the 16px input type size that prevents mobile zoom. TypeScript, the complete 27-assertion test suite, and the independent Cloudflare build all passed after the dark-control safeguards were added.

## Controlled-selector verification

The native selector was replaced because Chrome continued to render its placeholder row as a browser-controlled white surface on the live site. The replacement opens as an in-page `listbox` with four dark options, each rendered by the site rather than the browser. Preview interaction verified that the menu opens without any white system dropdown, selecting **Website Development** updates the visible value, and the menu closes immediately after selection.

Keyboard verification confirmed that the Service trigger opens with **Arrow Down** and closes with **Escape**, while retaining focus on the trigger. The control also exposes `aria-haspopup`, `aria-expanded`, `aria-controls`, a labelled `listbox`, and option-level selected state.
