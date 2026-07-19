# nikos

A terminal-native AI coding agent CLI. `nikos` runs an LLM tool-loop against your codebase — reading, searching, and staging file changes — and applies nothing until you review a diff and approve it.

Built with [Bun](https://bun.sh), the [Vercel AI SDK](https://sdk.vercel.ai) (`ToolLoopAgent`), and [OpenRouter](https://openrouter.ai) for model access.

## Features

- **Three modes** — `Agent` (make changes), `Ask` (read-only Q&A about the codebase), and `Plan` (break a goal into steps, then execute selected ones).
- **Staged, approval-gated mutations** — every file create/modify/delete, folder create, and shell command is queued, not run. You review a unified diff and approve or reject before anything touches disk.
- **Codebase-aware tools** — read, list, glob-search (with content filter), and a read-only structure analyzer.
- **Skill discovery** — finds and reads `SKILL.md` files under Cursor / Claude skill directories.
- **Interactive TUI** — figlet banner + `@clack/prompts` menus, terminal-rendered markdown output.
- **Any model via OpenRouter** — pick the model with an env var.

## Requirements

- [Bun](https://bun.sh) v1.3+
- An [OpenRouter](https://openrouter.ai) API key

## Setup

```bash
bun install
```

Create a `.env` file in the project root:

```env
OPENROUTER_API_KEY=your_key_here
OPENROUTER_DEFAULT_MODEL=anthropic/claude-sonnet-4
```

Bun loads `.env` automatically.

## Usage

```bash
bun run index.ts wakeup
```

This shows the banner and a mode picker. Flow:

1. **Main menu** — `CLI` or `Telegram` (Telegram is a stub).
2. **CLI sub-mode** — `Agent`, `Plan`, or `Ask`.
3. Enter a goal / question. The agent runs its tool loop and prints results.
4. For any staged changes, review the diff and **approve or reject** before they apply.

Installed as a binary (`bin: nikos`), so `nikos wakeup` works once linked.

## Modes

| Mode | Purpose | Writes files? |
|------|---------|---------------|
| **Agent** | Autonomous edits toward a concrete task (up to 40 tool steps) | Yes — after approval |
| **Ask** | Read-only questions about the codebase; optionally save the answer as `.md` | Read-only |
| **Plan** | Generate a step plan, pick steps, execute each as a sub-agent | Yes — after approval |

## Agent tools

`read_file`, `create_file`, `modify_file`, `delete_file`, `create_folder`, `list_files`, `search_files`, `analyze_codebase`, `execute_shell`, `list_skills`, `read_skill`.

All mutating tools stage their work through an `ActionTracker`; nothing is written until `applyApprovedFromTracker()` runs post-approval.

## Project structure

```
index.ts                  # CLI entry (commander) — `wakeup` command
ai/ai.config.ts           # OpenRouter provider + model resolution
tui/
  wakeup.ts               # banner + main menu
  terminal-md.ts          # markdown → terminal renderer
modes/
  cli.ts                  # CLI sub-mode picker
  agent/
    orchestrator.ts       # agent tool-loop + apply flow
    agent-tools.ts        # tool definitions (zod schemas)
    tool-executor.ts      # staged filesystem/shell operations
    action-tracker.ts     # pending-action log
    approval.ts           # diff review + approve/reject
    diff-view.ts          # unified-diff formatting
    types.ts              # AgentConfig, ActionLog types
  ask/orchestrator.ts     # read-only Q&A mode
  plan/                   # goal → steps → execute
```

## Development

```bash
bun test          # run tests
bun run index.ts  # run the CLI
```

## License

Private / unpublished.
