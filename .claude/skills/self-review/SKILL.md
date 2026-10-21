---
name: self-review
description: Criticise and improve your own implementation before reporting it done. Hands the diff to the read-only reviewer subagent (efficiency, pitfalls, scalability, readability, repo fit), fixes what it finds, re-runs checks and repeats. Use after every code change, before saying a task is finished.
---

# Self-review

Run this after finishing an implementation and before telling the user it's done. Skip it only for docs-only changes or when no code changed.

## Loop (at most 3 rounds)

1. **Check the basics.** Run `npm run format`, `npm run lint` and `npm run check`, and `npm run build` when routes, content loading or config changed. Fix failures before reviewing.
2. **Get a fresh review.** Launch the `reviewer` subagent. Give it the task as the user stated it and any constraints you were given. Don't give it your reasoning or a defence of your choices: it should judge the code, not your explanation.
3. **Decide on each finding.**
   - Critical and High: fix it.
   - Medium: fix it when the fix is small and clearly right; otherwise list it for the user.
   - Low: fix it only if it's trivial.
   - A finding outside the current phase's scope: don't fix it; list it for a later phase.
   - A finding you believe is wrong: don't fix it. Note why in the report, with the code that shows it.
4. **Repeat** from step 1 if you changed code. Stop when a round has no Critical or High findings, or after round 3.

## Report

End your reply to the user with a short section:

- **Fixed:** one line per issue the review caught and you fixed.
- **Left for you:** open findings and deliberate trade-offs, each with its severity and why it was left (out of scope, needs an owner or product decision, disputed).
- **Scale note:** one sentence on how the change behaves at 10× to 100× current content and traffic, and what would need to change first.

If round 3 still has Critical or High findings, say so plainly at the top of the report.
