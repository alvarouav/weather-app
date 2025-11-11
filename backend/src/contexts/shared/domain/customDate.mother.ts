import CustomDate from "@/contexts/shared/domain/customDate";

class CustomDateMother {
  static create(value : string | Date) {
    return new CustomDate(value);
  }

  static random() {
    const randomDate = new Date(Date.now() - Math.floor(Math.random() * 10000000000));
    return CustomDateMother.create(randomDate);
  }
}

export { CustomDateMother };