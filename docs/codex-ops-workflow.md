<!-- codex-project-ops-workflow: initialized -->
<!-- initialized-at: 2026-09-02 04:20:00 +08:00 -->

# Codex Ops Workflow

Initialization status: initialized

Project: What Can My Mac Play?

Repository root: `/Users/onovich/WebProjects/what-can-my-mac-play`

Machine config: `.codex/project-ops-workflow.json`

Skill: `project-ops-workflow`

Treat this document and the machine config as the source of truth for mechanical project operations.

## Environment and dependencies

```sh
node --version
pnpm --version
pnpm install --frozen-lockfile
```

Node.js 22.12 or newer is required; `.nvmrc` records the validated Node 24 runtime. Use `pnpm install` only when intentionally updating dependencies or the lockfile.

## Validate

Run the operations in this order:

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
python3 /Users/onovich/.codex/skills/repo-readme/scripts/check_readmes.py .
```

The aggregate command is:

```sh
pnpm check
```

## Dev server

```sh
pnpm dev --host 127.0.0.1 --port 4173
```

Health URL: `http://127.0.0.1:4173/`

Do not run destructive clean, reset, or deployment commands unless the user explicitly asks.
