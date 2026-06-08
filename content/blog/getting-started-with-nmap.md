---
title: "Getting Started with Nmap for Penetration Testing"
date: 2025-05-15
description: "A practical guide to using Nmap for network reconnaissance in penetration testing engagements."
summary: "Learn essential Nmap scanning techniques for port discovery, service enumeration, and OS detection."
categories: ["networking"]
tags: ["nmap", "reconnaissance", "networking", "penetration-testing"]
featured: true
comments: true
---

## Introduction

Nmap (Network Mapper) is the industry-standard tool for network discovery and security auditing. Every penetration tester needs solid Nmap skills.

## Basic Scanning

```bash
# Quick scan of top 1000 ports
nmap -sC -sV 10.10.10.1

# Full port scan
nmap -p- --min-rate 1000 10.10.10.1

# UDP scan (top 100 ports)
nmap -sU --top-ports 100 10.10.10.1
```

## Service Enumeration

The `-sC` flag runs default NSE scripts, while `-sV` performs service version detection. Combining both gives you the most useful output for penetration testing.

{{< admonition tip "Pro Tip" >}}
Always save your scan output with `-oA filename` to generate all three formats (normal, XML, grepable).
{{< /admonition >}}

## Useful NSE Scripts

```bash
# SMB enumeration
nmap --script smb-enum-shares,smb-enum-users -p 445 10.10.10.1

# HTTP enumeration
nmap --script http-enum -p 80,443 10.10.10.1

# Vulnerability scanning
nmap --script vuln 10.10.10.1
```

## Conclusion

Mastering Nmap is foundational for any penetration tester. Practice these techniques on Hack The Box and TryHackMe machines to build muscle memory.
