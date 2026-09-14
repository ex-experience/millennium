# MILLENNIUM — V3.4 Private Message Gateway

Static bilingual creative-agency frontend for GitHub Pages plus a separate private Vercel mail gateway.

## Public routes
Arabic: `/`, `/work/`, `/work/specimen-001/`, `/system/`, `/agency/`, `/contact/`, `/privacy/`, `/legal/`. English mirrors live under `/en/`. The founder registry remains withheld/noindex.

## Contact architecture
The browser never contains the receiving mailbox. `/contact/` requires the visitor's own name, email and message and allows one optional attachment up to 2 MB. The public frontend sends to a Vercel Function endpoint configured separately.

The backend uses Google OAuth2 + Gmail API with server-side credentials in Vercel and sets the visitor address as Reply-To. No Gmail password or App Password is used.

## No invented commercial claims
`Specimen 001` remains explicitly self-initiated. No client relationship or unverified registry claim is introduced.
