import { CustomDateMother } from "@/contexts/shared/domain/customDate.mother";
import { LocationMother } from "@/contexts/shared/domain/location.mother";
import { CelsiusMother } from "@/contexts/temperatures/domain/celsius.mother";
import type { TemperaturePrimitives } from "@/contexts/temperatures/domain/temperature";
// eslint-disable-next-line no-duplicate-imports
import Temperature from "@/contexts/temperatures/domain/temperature";

class TemperatureMother {
  static create(primitives : TemperaturePrimitives) {
    return new Temperature(primitives);
  }

  static random() {
    return TemperatureMother.create({
      degree: CelsiusMother.random().toPrimitives(),
      date: CustomDateMother.random().toPrimitives(),
      location: LocationMother.random().toPrimitives(),
    });
  }
}

export { TemperatureMother };