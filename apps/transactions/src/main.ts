import { NestFactory } from '@nestjs/core';
import { AppModule } from './transactions.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'transactions-consumer',
      },
    },
  });

  const PORT = process.env.PORT ?? 3001;
  await app.startAllMicroservices();
  await app.listen(PORT);
  console.log(`Transaction service is running on port ${PORT}`);
}
bootstrap();
