# MILLENNIUM V3.1 — Audit remediation

Implemented:
- Fixed literal `<br>` rendering by removing JS-driven locale mutation; Arabic and English are now independent static URLs.
- Added `/en/` mirrors with hreflang and canonical metadata.
- Replaced clipped house lockup with a complete source crop from the approved branch source PDF.
- Reworked mobile sizing and removed intentional over-width hero cropping.
- Added dedicated OG image, Twitter Cards, og:url/locale, JSON-LD, manifest icons and apple-touch-icon.
- Added a privacy notice and ownership/use notice.
- Added `Specimen 001`, clearly labelled self-initiated rather than client work.
- Added a local project-brief generator; it does not transmit form data.
- Added a branded 404.
- Added browser-level CSP meta and stronger Vercel response headers.
- Preserved self-hosted fonts and no third-party runtime analytics.

Still requires owner input / infrastructure:
1. Approved direct contact endpoint (domain email, booking URL, or secure intake API). No personal email was inferred or published.
2. Owned custom domain. No CNAME was invented.
3. Verified client case studies and outcomes. No client names or metrics were fabricated.
4. GitHub Pages cannot emit all security response headers. `vercel.json` includes them for Vercel; a custom domain/edge layer can do the same.
