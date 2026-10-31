# J & R Grunt Werks LLC — website

Static site for a licensed plumbing company in Carlos, MN, deployed on Vercel.

## Editing content

All business facts and page copy live in `build/site.js`. After editing:

```sh
npm run build   # regenerates public/**/index.html, sitemap.xml, robots.txt, llms.txt
```

Commit the generated files in `public/` (Vercel serves `public/` as-is; there is no build step on deploy).
When you change page content, bump `modified` / `updatedLabel` in `build/site.js` so the byline and Article schema stay fresh.

## Pages

- `/` — Carlos (home)
- Services: `/water-heater-repair`, `/leak-repair`, `/fixture-installation`, `/bathroom-remodel`, `/cabin-plumbing`
- Towns: `/alexandria`, `/miltona`, `/osakis`, `/garfield`, `/parkers-prairie`

Every page follows the AEO pattern: Quick Answer box under the H1, byline with last-updated date,
a "Who is/does … in [Town], MN?" H2 that is also the first FAQ, visible FAQs that match the
FAQPage schema word for word, plus Plumber, Service, Article, and BreadcrumbList schema.

## Lead form

`api/lead.js` emails form submissions to `jrgruntwerks@gmail.com`. Set these in Vercel project env vars:

| Var | Gmail example |
| --- | --- |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` |
| `SMTP_SECURE` | `true` |
| `SMTP_USER` | `jrgruntwerks@gmail.com` |
| `SMTP_PASS` | a Gmail **app password** (not the account password) |
| `LEAD_TO_EMAIL` | optional, defaults to `jrgruntwerks@gmail.com` |

Without them, the form shows a "please call or text" message instead of failing silently.
