class EnvCollectorError extends Error {}

export default class EnvCollector {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly value: any) {}

  public static collect(
    key: string,
    fallbackValue?: string | number | boolean
  ): EnvCollector {
    return new EnvCollector(process.env[key] || `${fallbackValue}`);
  }

  asNumber(): number {
    return Number(this.value);
  }

  asString(): string {
    return this.value;
  }

  asBoolean(): boolean {
    return this.value === 'true';
  }

  orFailWith(message: string, failCondition?: boolean): EnvCollector {
    if (!this.value && failCondition !== false)
      throw new EnvCollectorError(message);
    else return this;
  }
}
