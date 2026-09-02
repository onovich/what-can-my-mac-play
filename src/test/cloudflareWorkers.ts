export class DurableObject<Environment = unknown> {
  protected readonly ctx: unknown

  constructor(ctx: unknown, environment: Environment) {
    this.ctx = ctx
    void environment
  }
}
