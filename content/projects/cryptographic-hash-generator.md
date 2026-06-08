---
title: "Cryptographic Hash Generator"
date: 2024-10-15
description: "Python-based tool for generating cryptographic hashes using multiple algorithms."
summary: "CLI tool supporting MD5, SHA-1, SHA-256, SHA-512 hash generation with file and string input."
featured: true
featured_image: "/images/projects/placeholder.svg"
technologies: ["Python", "hashlib", "CLI"]
github: "https://github.com/zer0arc4"
status: "completed"
features:
  - "Multiple hash algorithms (MD5, SHA-1, SHA-256, SHA-512)"
  - "File and string input support"
  - "Batch processing mode"
  - "Hex and Base64 output formats"
skills_demonstrated: ["python", "cryptography"]
tags: ["python", "tool-development", "cryptography"]
categories: ["projects"]
---

## Project Overview

A command-line cryptographic hash generator built in Python that supports multiple hashing algorithms. Designed as a utility for security testing, integrity verification, and password hash analysis.

## Technologies Used

- **Python 3** — Core language
- **hashlib** — Standard library for cryptographic hashing
- **argparse** — CLI argument parsing

## Features

- Generate hashes from strings or files
- Support for MD5, SHA-1, SHA-256, and SHA-512
- Batch file processing
- Output in hexadecimal or Base64 format

## Usage

```bash
python hashgen.py -a sha256 -s "password123"
python hashgen.py -a sha512 -f document.pdf
```

## Skills Demonstrated

- Python development
- Cryptographic fundamentals
- CLI tool design
- Security utility development
