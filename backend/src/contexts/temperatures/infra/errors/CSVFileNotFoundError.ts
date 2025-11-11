class CSVFileNotFoundError extends Error {
  constructor(filePath: string) {
    super(`CSV file not found at path: ${filePath}`);
    this.name = "CSVFileNotFoundError";
  }
}

export default CSVFileNotFoundError;