# Mindful Wallpaper

A minimal demo site that pairs calming visuals with short mindfulness prompts. This repository contains a small static site served from the `docs/` folder via GitHub Pages.

- Live demo: https://kimberlybruton-sys.github.io/Repository-1_KB/


## Status badge
Click the badge below to open the live demo (appears even if Pages is unpublished):

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Visit%20site-blue)](https://kimberlybruton-sys.github.io/Repository-1_KB/)


## How to publish (if not already enabled)
1. Go to: https://github.com/kimberlybruton-sys/Repository-1_KB/settings/pages
2. Under "Source", select `Branch: main` and `Folder: /docs` and click Save.
3. Wait ~1–2 minutes for GitHub to publish the site.

If the site still shows 404 after enabling, run this locally to confirm the site is available:

PowerShell:

Invoke-WebRequest -Uri 'https://kimberlybruton-sys.github.io/Repository-1_KB/' -UseBasicParsing | Select-Object StatusCode, StatusDescription

or curl:

curl -I https://kimberlybruton-sys.github.io/Repository-1_KB/


## Custom domain
To add a custom domain, create a `CNAME` file at `docs/CNAME` containing your domain (for example `www.example.com`), and then add an A/ALIAS/CNAME DNS record pointing at GitHub Pages as described in GitHub's docs.

If you'd like me to add a `CNAME` file or set up the README differently, reply with the custom domain you want to use and I will add it for you.
