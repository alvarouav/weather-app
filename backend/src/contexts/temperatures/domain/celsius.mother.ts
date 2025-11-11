import Celsius from "@/contexts/temperatures/domain/celsius";

class CelsiusMother {
  static create(degree: number) {
    return new Celsius(degree);
  }

  static random() {
    const degree = Math.floor(Math.random() * 40);
    return CelsiusMother.create(degree);
  }
}

export { CelsiusMother };