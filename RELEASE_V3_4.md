# MILLENNIUM V3.4 — Private Message Gateway

Release scope:
- Includes all V3.3 field-audit hotfixes.
- Replaces the local-only Project Room dead-end with a designed message interface.
- Public channels: phone, WhatsApp, MILLENNIUM Instagram, EX | EXPERIENCE Instagram, founder Instagram.
- Recipient mailbox is server-side only and must be configured as a Vercel environment variable.
- Visitor email is required and used as Reply-To; the backend sends through the authorized Gmail identity via Google OAuth2 + Gmail API.
- One optional attachment, 2 MB maximum.
- Successful send shows a full-screen confirmation and returns to the site automatically.
- No advertising analytics or marketing cookies added.

Security / privacy:
- CONTACT_TO, GMAIL_USER, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_REFRESH_TOKEN are never stored in the public site repository.
- CORS allow-list restricts browser submissions to the configured site origin.
- Honeypot, minimum interaction time, validation, length limits, attachment allow-list and payload size limits are enforced server-side.
- Message body is not logged by application code.
