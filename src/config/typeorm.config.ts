import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

const getEnvValue = (key: string, throwOnMissing = true): string => {
	const value = process.env[key];
	if (!value && throwOnMissing) {
		throw new Error(`config error - missing env.${key}`);
	}

	return value;
};

const isProduction = (): boolean => {
	const mode = getEnvValue("NODE_ENV", false);
	return mode == "production";
};

dotenv.config({
	path: `env/${isProduction() ? "prod.env" : "dev.env"}`,
});

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: "mongodb",
	host: getEnvValue("DB_HOST"),
	port: parseInt(getEnvValue("DB_PORT"), 27017),
	database: getEnvValue("DB_NAME"),

	entities: [__dirname + "/../**/*.entity{.ts,.js}"],

	synchronize: true,
	logging: true,
	//dropSchema: true,

	ssl: isProduction(),
};
