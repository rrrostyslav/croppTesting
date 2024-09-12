export class UtilTestData {
  static getAllDataFromFile(fileName: string): string[] {
    return require(`..//test-data/${fileName}`).param;
  }

  static getConvertPrice(priceText: string): string {
    const convertPrice = priceText
      .replace(/\u00A0/g, '')
      .replace(/\D/g, '')
      .trim();
    return convertPrice;
  }
}
