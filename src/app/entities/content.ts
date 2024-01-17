export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isContentLengthValueValid = this.validateContentLength(content);

    if (!isContentLengthValueValid) {
      throw new Error('Content length error.');
    }

    this.content = content;
  }

  get value(): string {
    return this.content;
  }

  validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }
}
