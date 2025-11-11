import InvalidDateFormatError from "@/contexts/shared/domain/errors/InvalidDateFormatError";

class CustomDate {
  public readonly value: Date;
  
  constructor(value: string | Date) {
    const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
  
    if (isNaN(date.getTime())) {
      throw new InvalidDateFormatError(value);
    }
  
    this.value = new Date(date.toISOString());
  }
  
  equalsTo(other: CustomDate): boolean {
    return this.value.getTime() === other.value.getTime();
  }

  greaterThan(other: CustomDate): boolean {
    return this.value.getTime() > other.value.getTime();
  }

  toPrimitives(): string {
    return this.value.toISOString();
  }

  toDDMMYYYY(): string {
    const day = String(this.value.getUTCDate()).padStart(2, "0"),
      month = String(this.value.getUTCMonth() + 1).padStart(2, "0"),
      year = this.value.getUTCFullYear();
    return `${year}-${month}-${day}`;
  }
}
  
export default CustomDate;
  