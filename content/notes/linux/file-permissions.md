---
title: "Linux File Permissions Cheat Sheet"
date: 2025-03-10
description: "Quick reference for Linux permission bits, SUID, SGID, and sticky bit."
summary: "chmod, chown, SUID, SGID, sticky bit reference guide."
topic: "linux"
note_type: "cheatsheet"
difficulty: "beginner"
tags: ["linux", "permissions", "privilege-escalation"]
comments: true
---

## Permission Bits

| Permission | File | Directory |
|------------|------|-----------|
| r (4) | Read content | List contents |
| w (2) | Modify content | Create/delete files |
| x (1) | Execute | Enter directory |

## chmod Examples

```bash
chmod 755 file.sh    # rwxr-xr-x
chmod u+s binary     # Set SUID
chmod g+s dir/       # Set SGID
chmod +t dir/        # Set sticky bit
```

## Special Permissions

- **SUID (4)** — File executes as owner
- **SGID (2)** — File executes as group / new files inherit group
- **Sticky Bit (1)** — Only owner can delete files in directory

## Finding SUID Binaries

```bash
find / -perm -4000 -type f 2>/dev/null
```

{{< admonition note "PrivEsc" >}}
SUID binaries are a common Linux privilege escalation vector. Always check GTFOBins for known exploits.
{{< /admonition >}}
