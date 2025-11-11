import StringValueObject from "@/contexts/shared/domain/stringValueObject";

class Location extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}

export default Location;