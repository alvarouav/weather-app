class InvalidDateFormatError extends Error {
  constructor(value: string | Date) {
    super(`Invalid date format: ${value}`);
    this.name = "InvalidDateFormatError";
  }
}

export default InvalidDateFormatError;