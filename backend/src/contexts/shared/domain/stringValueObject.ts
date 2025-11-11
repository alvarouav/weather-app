abstract class StringValueObject {
  public readonly value: string;
  
  constructor(value: string) {
    this.value = value;
  }
  
  equalsTo(other: StringValueObject) {
    return this.value === other.value;
  }

  toPrimitives() {
    return this.value;
  }
}
  
export default StringValueObject;
  