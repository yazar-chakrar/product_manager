import { NestFactory } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import helmet from "@fastify/helmet";
import {
	FastifyAdapter,
	NestFastifyApplication,
} from "@nestjs/platform-fastify";
import fastifyCsrfProtection from "@fastify/csrf-protection";
import { AppModule } from "./app.module";
import { winstonModuleConfig } from "./config/logging/winstonModule.config";
import { corsConfig } from "./config/sec/cors.config";

async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter(),
		{
			logger: WinstonModule.createLogger(winstonModuleConfig),
		},
	);

	await app.register(helmet);
	app.enableCors(corsConfig);
	await app.register(fastifyCsrfProtection);

	app.setGlobalPrefix("api/v01");
	await app.listen(3000);
}
bootstrap();
