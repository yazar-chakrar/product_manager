import { WinstonModuleOptions } from "nest-winston";
import { format, transports } from "winston";
import "winston-daily-rotate-file";

export const winstonModuleConfig: WinstonModuleOptions = {
	transports: [
		// file on daily rotation (error only)
		new transports.DailyRotateFile({
			filename: `logs/%DATE%-error.log`,
			level: "error",
			format: format.combine(format.timestamp(), format.json()),
			datePattern: "YYYY-MM-DD",
			zippedArchive: false,
			maxFiles: "30d",
		}),
		// same for all levels
		new transports.DailyRotateFile({
			filename: `logs/%DATE%-combined.log`,
			format: format.combine(format.timestamp(), format.json()),
			datePattern: "YYYY-MM-DD",
			zippedArchive: false,
			maxFiles: "30d",
		}),
		new transports.Console({
			format: format.combine(
				format.cli(),
				format.splat(),
				format.timestamp(),
				format.printf(info => {
					return `${info.timestamp} ${info.level}: ${info.message}`;
				}),
			),
		}),
	],
};
