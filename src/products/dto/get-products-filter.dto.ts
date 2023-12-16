import { IsIn, IsOptional } from "class-validator";
import { ProductCurrency } from "../product.types";

export class GetProductsFilterDto {
	@IsOptional()
	@IsIn(Object.keys(ProductCurrency).map(key => ProductCurrency[key]))
	currency: ProductCurrency;

	@IsOptional()
	name: string;

	@IsOptional()
	description: string;

	@IsOptional()
	category: string;

	@IsOptional()
	max_price: number;

	@IsOptional()
	min_price: number;

	@IsOptional()
	offset: number;

	@IsOptional()
	limit: number;

	@IsOptional()
	sortField: string;

	@IsOptional()
	sortOrder: 1 | -1;
}
