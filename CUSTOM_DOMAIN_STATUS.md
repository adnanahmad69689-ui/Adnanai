# Custom Domain Status

The independent portfolio is served by the Cloudflare Pages project `adnan-ai-portfolio` and is connected to the GitHub repository `adnanahmad69689-ui/Adnanai`.

| Address | Current role |
|---|---|
| `https://adnanai.com` | Intended canonical public website and independent owner admin host. |
| `https://www.adnanai.com` | Active SSL-enabled alternate domain; pending redirect to the canonical apex domain. |
| `https://adnan-ai-portfolio.pages.dev` | Active Pages fallback retained for rollback and independent verification. |

The Cloudflare zone for `adnanai.com` is active and uses Cloudflare nameservers `asa.ns.cloudflare.com` and `yichun.ns.cloudflare.com`. Both the apex and `www` domain were verified as active with SSL in the Cloudflare Pages custom-domains panel.

## Official configuration guidance

Cloudflare Pages requires a custom domain to be added through the Pages **Custom domains** flow before manually changing DNS records; a Cloudflare-managed apex domain can then receive the required DNS configuration automatically. [1]

[1]: https://developers.cloudflare.com/pages/configuration/custom-domains/ "Cloudflare Pages custom domains documentation"
