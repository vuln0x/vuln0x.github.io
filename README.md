# vuln0x — Cybersecurity Portfolio

Personal cybersecurity portfolio, technical blog, writeup repository, and knowledge base for **vuln0x**.

**Live Site:** [https://vuln0x.github.io/](https://vuln0x.github.io/)

## Stack

- [Hugo Extended](https://gohugo.io/) — Static site generator
- **cyber-ember** theme — Custom Hugo theme
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

```
vuln0x/vuln0x.github.io
```

1. Push to GitHub
2. Enable **GitHub Pages** → Source: **GitHub Actions**
3. Enable **Discussions** on the repo (for Giscus)

## Before Launch Checklist

- [ ] Customize logo at `static/images/logo.svg`
- [ ] Remove `draft: true` from writeups when ready to publish

## Content Structure

```
content/
├── writeups/     → HTB, Vulnyx, HackMyVM
├── blog/         → Technical articles
├── activity/     → Full activity history (auto-generated)
├── certifications/
└── ...
```

## Creating Content

```bash
hugo new writeups/hackthebox/machine-name.md
hugo new blog/post-title.md
hugo new certifications/cert-name.md
```

New writeups, blog posts, and certifications automatically appear in the Activity Timeline.

## License

MIT — See [LICENSE](LICENSE)
