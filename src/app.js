import express from "express";
import { appRoutes } from "./routes/index.js";
import helmet from "helmet";
import i18next from "i18next";
import * as middleware from "i18next-http-middleware";
import I18NexFsBackend from "i18next-fs-backend";

i18next
  .use(I18NexFsBackend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    backend: {
      loadPath: "./locales/{{lng}}/translation.json",
    },
  });
const app = express();
app.use(express.json());
app.use(helmet());
app.use(middleware.handle(i18next));

app.use(appRoutes);
export { app };
