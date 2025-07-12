export class DateParser {
  private static readonly MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  public static toSpanishLongDate(dateString: string): string {
    const [year, month, day] = dateString.split("-").map(Number);

    const monthName = this.MONTHS[month - 1];
    return `${day} de ${monthName} de ${year}`;
  }

  public static toSpanishShortDate(dateString: string): string {
    const [int, month, day] = dateString.split("-").map(Number);

    const monthName = this.MONTHS[month - 1];
    return `${day} de ${monthName}`;
  }
}