import { ValidationPipe } from "./pipes/validation.pipe";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { CorsMiddleware } from "./middlewares/cors.middleware";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(CorsMiddleware);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({ credentials: true, origin: true });

  app.setGlobalPrefix("api");

  app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
  });
}

start();
