module.exports = {
  preset: "ts-jest", // Usa `ts-jest` para manejar TypeScript
  testEnvironment: "node", // Define el entorno de prueba adecuado para un backend
  roots: ["./src/contexts"], // Indica dónde están tus tests (tu código fuente)
  moduleFileExtensions: ["ts", "js"], // Extensiones válidas para importar módulos
  testMatch: ["**/__tests__/**/*.+(ts|js)", "**/*.(test|spec).+(ts|js)"], // Patrón para los archivos de prueba
  collectCoverage: true, // Indica que quieres cubrir métricas de cobertura de tu código
  coverageDirectory: "coverage", // Directorio donde guardar los reportes de cobertura
  coverageReporters: ["json", "lcov", "text", "clover"], // Tipos de reportes
  
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
  