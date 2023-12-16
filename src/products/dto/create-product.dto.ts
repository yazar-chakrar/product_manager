import { IsNotEmpty, IsOptional, IsPositive } from "class-validator";
export class CreateProductDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	description: string;

	@IsNotEmpty()
	category: string;

	@IsOptional()
	currency: string;

	@IsNotEmpty()
	price: number;
}
