class EnvCollectorError extends Error {}

export default class EnvCollector {
  private failMessage?: string;
  private failCondition?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private value: string) {}

  public static collect(
    key: string,
    fallbackValue?: string | number | boolean
  ): EnvCollector {
    return new EnvCollector(process.env[key] || `${fallbackValue}`);
  }

  asNumber(): number {
    this.failIfShouldFail();

    return Number(this.value);
  }

  asString(): string {
    this.failIfShouldFail();

    return this.value;
  }

  asBoolean(): boolean {
    this.failIfShouldFail();

    return this.value === 'true';
  }

  fallbackTo(fallbackValue: string): EnvCollector {
    this.value = this.value || fallbackValue;

    return this;
  }

  orFailWith(message: string): EnvCollector {
    this.failMessage = message;

    return this;
  }

  onlyFailIf(condition: boolean): EnvCollector {
    this.failCondition = condition;

    return this;
  }

  private failIfShouldFail(): void {
    if (!this.value && this.failMessage && this.failCondition !== false)
      throw new EnvCollectorError(this.failMessage);
  }
}
