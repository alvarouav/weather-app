import AggregateRoot from "@/contexts/shared/domain/aggregateRoot";
import CustomDate from "@/contexts/shared/domain/customDate";
import Location from "@/contexts/shared/domain/location";
import Celsius from "@/contexts/temperatures/domain/celsius";

export interface TemperaturePrimitives {
    degree: number;
    date: string;
    location: string;
}

class Temperature extends AggregateRoot{
  degree: Celsius;
  date: CustomDate;
  location: Location;

  constructor(primitives: TemperaturePrimitives) {
    super();

    this.degree = new Celsius(primitives.degree);
    this.date = new CustomDate(primitives.date);
    this.location = new Location(primitives.location);
  }

  equalsTo(other: Temperature): boolean {
    return this.degree.equalsTo(other.degree) &&
            this.date.equalsTo(other.date) &&
            this.location.equalsTo(other.location);
  }

  toPrimitives(): TemperaturePrimitives {
    return {
      degree: this.degree.toPrimitives(),
      date: this.date.toDDMMYYYY(),
      location: this.location.toPrimitives(),
    };
  }
}

export default Temperature;