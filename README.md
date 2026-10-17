# Mindful Wallpaper

A minimal demo site that pairs calming visuals with short mindfulness prompts. This repository contains a small static site served from the `docs/` folder via GitHub Pages.

- Live demo (Netlify): https://graceful-kelpie-6de9f8.netlify.app/


## Status badge
Click the badge below to open the live demo (appears even if Pages is unpublished):

[![Live demo (Netlify)](https://img.shields.io/badge/Live%20demo-Netlify-blue)](https://graceful-kelpie-6de9f8.netlify.app/)


## How to publish (if not already enabled)
1. Go to: https://github.com/kimberlybruton-sys/Repository-1_KB/settings/pages
2. Under "Source", select `Branch: main` and `Folder: /docs` and click Save.
3. Wait ~1–2 minutes for GitHub to publish the site.

If the site still shows 404 after enabling, run this locally to confirm the site is available:

PowerShell:

Invoke-WebRequest -Uri 'https://graceful-kelpie-6de9f8.netlify.app/' -UseBasicParsing | Select-Object StatusCode, StatusDescription

or curl:

curl -I https://graceful-kelpie-6de9f8.netlify.app/


## Custom domain
To add a custom domain, create a `CNAME` file at `docs/CNAME` containing your domain (for example `www.example.com`), and then add an A/ALIAS/CNAME DNS record pointing at GitHub Pages as described[...]

If you'd like me to add a `CNAME` file or set up the README differently, reply with the custom domain you want to use and I will add it for you.
