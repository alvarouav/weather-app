class TemperaturesNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TemperaturesNotFoundError";
  }
}

export default TemperaturesNotFoundError;