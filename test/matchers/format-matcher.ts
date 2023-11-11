import { EntryMatcher } from '@test/matchers/entry-matcher';

interface Options {
  nullable: boolean;
}

export class FormatMatcher extends EntryMatcher {
  toBeInteger(
    receive: unknown,
    options: Options = { nullable: false },
  ): jest.CustomMatcherResult {
    const { nullable } = options;
    let pass = false;

    if (receive === null) {
      pass = nullable;
    } else {
      pass = Number.isInteger(receive);
    }

    return {
      pass,
      message: () => `expected ${receive}${pass ? ' ' : ' not '}integer format`,
    };
  }
}
