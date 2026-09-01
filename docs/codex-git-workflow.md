<!-- codex-project-git-workflow: initialized -->
<!-- initialized-at: 2026-09-02 03:57:35 +08:00 -->

# Codex Git Workflow

Initialization status: initialized

Project: What Can My Mac Play?

Repository root: `/Users/onovich/WebProjects/what-can-my-mac-play`

Machine config: `.codex/project-git-workflow.json`

Skill: `project-git-workflow`

This project uses a selected-files staging policy. Inspect status and diffs before staging, preserve unrelated changes, validate relevant artifacts before each commit, and use concise conventional commit messages.

## Status

```sh
git status --short --branch
```

## Validation

```sh
python3 /Users/onovich/.codex/skills/repo-readme/scripts/check_readmes.py .
python3 /Users/onovich/.codex/skills/repo-cover/scripts/validate_preview.py docs/social-preview.png --svg docs/social-preview.svg
```

## Commit and push

Stage explicit paths, commit, and then push the current branch:

```sh
git add -- <paths>
git commit -m "<message>"
git push -u origin HEAD
```

Keep `README.md` and `README.zh-CN.md` materially aligned. Revalidate the social preview after cover changes. Never force-push or use destructive Git commands without explicit user approval.
