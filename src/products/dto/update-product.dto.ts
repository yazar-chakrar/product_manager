import { IsOptional, IsPositive } from "class-validator";
import { ProductCurrency } from "../product.types";
export class UpdateProductDto {
	@IsOptional()
	name: string;

	@IsOptional()
	description: string;

	@IsOptional()
	category: string;

	@IsOptional()
	currency: ProductCurrency;

	@IsOptional()
	productCategoryId: number;

	@IsOptional()
	price: number;
}
