import Location from "@/contexts/shared/domain/location";

class LocationMother {
  static create(value: string) {
    return new Location(value);
  }

  static random() {
    return LocationMother.create(`Location_${Math.floor(Math.random() * 1000)}`);
  }
}

export { LocationMother };