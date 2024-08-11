import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitializationService } from './services/initialization/initialization.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const initializationService = app.get(InitializationService);
  try {
    await initializationService.initialize();
  } catch (error) {
    console.error('Initialization failed:', error);
  }

  console.log({ secret: process.env.JWT_SECRET });

  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
