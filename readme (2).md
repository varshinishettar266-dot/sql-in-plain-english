# SQL in Plain English

A beginner-friendly website that converts a plain-English question into a SQL query and a short explanation using the Gemini API.

## Files

- `index.html` — website structure
- `style.css` — responsive visual design
- `script.js` — form handling, example prompts, API request, and copy button
- `netlify/functions/generate-sql.mjs` — secure serverless function that calls Gemini
- `netlify.toml` — Netlify publish and function configuration

## Deploy to Netlify

1. Upload these project files to a GitHub repository.
2. In Netlify, choose **Add new project → Import an existing project**.
3. Connect GitHub and select this repository.
4. For this static site, the publish directory is `.`. The included `netlify.toml` sets it automatically.
5. In Netlify, open **Site configuration → Environment variables** (the exact menu label may vary).
6. Add `GEMINI_API_KEY` with your own Gemini API key as the value.
7. Redeploy the site after adding the environment variable.

Get an API key from Google AI Studio: https://aistudio.google.com/app/apikey

## Security

- Do not place the real Gemini API key in `script.js`, HTML, or any public GitHub file.
- Use the Netlify environment variable `GEMINI_API_KEY`; the serverless function reads it on the server.
- The app generates SQL text only. It does not connect to or execute SQL on a database.
- Review all AI-generated queries before using them, especially `UPDATE`, `DELETE`, or other data-changing statements.

## Local development

Install Node.js, then run:

```bash
npm install -g netlify-cli
netlify dev
```

Set `GEMINI_API_KEY` in the local environment before running `netlify dev`. Never commit a real key.
