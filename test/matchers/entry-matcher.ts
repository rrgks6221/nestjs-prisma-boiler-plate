export class EntryMatcher {
  static entryMatcher() {
    const typeMatcher = new this();

    const methods = Reflect.ownKeys(
      Object.getPrototypeOf(typeMatcher),
    ) as (keyof typeof typeMatcher)[];

    // delete constructor
    methods.shift();

    const matchers = methods.reduce(
      (
        // eslint-disable-next-line @typescript-eslint/ban-types
        matcher: Record<string | symbol, jest.CustomMatcher>,
        methodName: keyof typeof typeMatcher,
      ) => {
        matcher[methodName] = typeMatcher[methodName];

        return matcher;
      },
      {},
    );

    return matchers;
  }
}
