import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance, AxiosResponse } from "axios";
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

const HOST = getEnvValue("CREDIT_CARD_API_HOST");
const URL = `${HOST}/api/v2`;

@Injectable()
export class CreditCardsApi {
	static http: AxiosInstance = axios.create({
		baseURL: URL,
	});

	createAxios(): AxiosInstance {
		const http = axios.create({
			baseURL: URL,
		});
		http.interceptors.response.use(null, error => {
			const { response, config: originalRequest } = error;
			if (response) {
				console.log(response?.status);
			}
		});
		return http;
	}

	async get(url: string, params: object): Promise<any[]> {
		const res = await CreditCardsApi.http.get(
			`${URL}/${url}?size=100&type=visa`,
			{
				params: params,
			},
		);
		return res?.data;
	}
}
