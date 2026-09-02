import { DurableObject } from 'cloudflare:workers'

export class SteamDailyBudget extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env)
    ctx.blockConcurrencyWhile(async () => {
      this.ctx.storage.sql.exec(`
        CREATE TABLE IF NOT EXISTS request_budget (
          singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
          used INTEGER NOT NULL CHECK (used >= 0)
        );
        INSERT OR IGNORE INTO request_budget (singleton, used) VALUES (1, 0);
      `)
    })
  }

  async tryConsume(limit: number): Promise<boolean> {
    if (!Number.isSafeInteger(limit) || limit < 1) return false

    const rows = this.ctx.storage.sql
      .exec<{ used: number }>(
        `UPDATE request_budget
         SET used = used + 1
         WHERE singleton = 1 AND used < ?
         RETURNING used`,
        limit,
      )
      .toArray()
    return rows.length === 1
  }
}
