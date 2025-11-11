class RepeaterMother {
  static generate<T>(generator: () => T, length: number): T[] {
    return Array.from({ length }, () => generator());
  }
}

export { RepeaterMother };  