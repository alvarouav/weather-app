class InvalidDatesError extends Error {
  constructor(message: string = "The provided dates are invalid.") {
    super(message);
    this.name = "InvalidDatesError";
  }
}

export default InvalidDatesError;