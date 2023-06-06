export class MockEmbedBuilder {
  setTitle() {
    return this;
  }

  setColor() {
    return this;
  }

  setTimestamp() {
    return this;
  }

  setFields() {
    return this;
  }

  setDescription() {
    return this;
  }
}

export class MockWebhookClient {
  constructor(option: unknown) {
    return this;
  }

  send() {
    return Promise.resolve(jest.fn());
  }
}
