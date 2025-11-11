abstract class NumberValueObject {
  public readonly value: number;
  
  constructor(value: number) {
    this.value = value;
  }
  
  equalsTo(other: NumberValueObject) {
    return this.value === other.value;
  }

  toPrimitives(): number {
    return this.value;
  }
}
  
export default NumberValueObject;
  