#!/usr/bin/env python3
"""Fail on unquoted YAML scalars that silently change meaning in slide frontmatter.

An unquoted value containing ": " parses as a nested mapping, and one containing
" #" gets truncated at a comment. Both fail silently: the deck still builds, the
layout just receives an object (or a shortened string) instead of the text.

Usage: python3 .scripts/check-frontmatter.py slides.md theme/example.md
"""
import re
import sys
import pathlib

KEY_RE = re.compile(r'^([A-Za-z_][A-Za-z0-9_-]*):[ \t]+(.+?)[ \t]*$')
ITEM_RE = re.compile(r'^[ \t]*-[ \t]+(.+?)[ \t]*$')
BLOCK_START_RE = re.compile(r'^[A-Za-z_][A-Za-z0-9_-]*:')
SPECIAL = set("'\"|>[{&*!%@")


def offenders(path):
    lines = path.read_text().split('\n')
    found = []
    i = 0
    while i < len(lines):
        is_fm = (
            lines[i].strip() == '---'
            and i + 1 < len(lines)
            and BLOCK_START_RE.match(lines[i + 1])
        )
        if not is_fm:
            i += 1
            continue
        j = i + 1
        while j < len(lines) and lines[j].strip() != '---':
            j += 1
        for k in range(i + 1, min(j, len(lines))):
            m = KEY_RE.match(lines[k])
            item = ITEM_RE.match(lines[k])
            if not m and not item:
                continue
            key = m.group(1) if m else '-'
            value = m.group(2) if m else item.group(1)
            if value[0] in SPECIAL:
                continue
            if ': ' in value:
                reason = 'contains ": " — parses as a nested mapping'
            elif ' #' in value:
                reason = 'contains " #" — truncated at a YAML comment'
            elif value.endswith(':'):
                reason = 'ends with ":" — parses as a mapping key'
            else:
                continue
            found.append((k + 1, key, value, reason))
        i = j + 1
    return found


def main(argv):
    if not argv:
        print('usage: check-frontmatter.py <deck.md> [...]', file=sys.stderr)
        return 2
    total = 0
    for arg in argv:
        path = pathlib.Path(arg)
        if not path.is_file():
            print('missing file: %s' % arg, file=sys.stderr)
            return 2
        for line_no, key, value, reason in offenders(path):
            total += 1
            print('%s:%d: %s: %s' % (path, line_no, key, value), file=sys.stderr)
            print('    %s — wrap the value in single quotes' % reason, file=sys.stderr)
    if total:
        print('\n%d unquoted frontmatter scalar(s)' % total, file=sys.stderr)
        return 1
    print('frontmatter ok: %s' % ', '.join(argv))
    return 0


if __name__ == '__main__':
    raise SystemExit(main(sys.argv[1:]))
