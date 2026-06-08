# Cyber Ember — Cybersecurity Portfolio

Personal cybersecurity portfolio, technical blog, writeup repository, and knowledge base for **Rithesh Chandra Alakati**.

**Live Site:** [https://zer0arc4.github.io/](https://zer0arc4.github.io/)

## Stack

- [Hugo Extended](https://gohugo.io/) — Static site generator
- **Cyber Ember** — Custom Hugo theme
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [Pagefind](https://pagefind.app/) — Static search
- [Giscus](https://giscus.app/) — GitHub Discussions comments
- [Plausible](https://plausible.io/) — Privacy-friendly analytics
- GitHub Actions — CI/CD deployment

## Quick Start

### Prerequisites

- Hugo Extended >= 0.120
- Node.js >= 20

### Local Development

```bash
npm install
hugo server -D --disableFastRender
```

Open [http://localhost:1313](http://localhost:1313)

### Production Build

```bash
npm run build
```

## Repository Setup

This site is designed for a **GitHub User Pages** repository:

```
zer0arc4/zer0arc4.github.io
```

1. Rename/move this project to `zer0arc4.github.io`
2. Push to GitHub
3. Enable **GitHub Pages** → Source: **GitHub Actions**
4. Enable **Discussions** on the repo (for Giscus)
5. Configure Giscus at [giscus.app](https://giscus.app) and update `config/_default/params.toml` with `repoId` and `categoryId`

## Before Launch Checklist

- [ ] Add your resume PDF to `static/files/resume.pdf`
- [ ] Replace profile image at `static/images/profile/avatar.svg`
- [ ] Configure Formspree form ID in `themes/cyber-ember/layouts/contact/list.html`
- [ ] Configure Giscus `repoId` and `categoryId` in `params.toml`
- [ ] Register domain at [Plausible](https://plausible.io) for `zer0arc4.github.io`
- [ ] Remove `draft: true` from writeups when ready to publish

## Content Structure

```
content/
├── writeups/     → HTB, THM, Vulnyx, HackMyVM, PG, CTF
├── projects/     → Security tools and dev projects
├── blog/         → Technical articles
├── notes/        → Knowledge base / cheatsheets
├── certifications/
├── research/     → Future: security research
├── cve/          → Future: CVE analysis
└── ...
```

## Creating Content

```bash
# New writeup
hugo new writeups/hackthebox/machine-name.md

# New blog post
hugo new blog/post-title.md

# New note
hugo new notes/linux/topic-name.md

# New project
hugo new projects/project-name.md
```

## License

MIT — See [LICENSE](LICENSE)
