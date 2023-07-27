import { ValidationPipe } from "./pipes/validation.pipe";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { corsMiddleware } from "./middlewares/cors.middleware";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  app.use(corsMiddleware);

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("api");

  app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
}

start();
