import NumberValueObject from "@/contexts/shared/domain/numberValueObject";

class Celsius extends NumberValueObject{
  constructor(value: number) {
    super(value);
  }
}

export default Celsius;