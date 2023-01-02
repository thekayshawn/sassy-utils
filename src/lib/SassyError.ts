export default class SassyError extends Error {
  constructor(message: string) {
    super(`SassyError: ${message}`);

    Object.setPrototypeOf(this, SassyError.prototype);
  }

  static getPrototype(): string {
    return `SassyError:`;
  }
}
