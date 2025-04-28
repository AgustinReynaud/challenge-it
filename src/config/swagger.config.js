import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de Compañías y Transferencias",
    version: "1.0.0",
    description:
      "Documentación de la API para gestión de compañías y transferencias bancarias",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [
    "src/modules/transfer/adapters/api/routes/transfer.routes.js",
    "src/modules/company/adapters/api/routes/company.routes.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export { swaggerDocs };
