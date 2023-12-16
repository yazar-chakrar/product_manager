import { IsOptional } from "class-validator";

export class GetPurchaseOrdersFilterDto {
	@IsOptional()
	offset: number;

	@IsOptional()
	limit: number;

	@IsOptional()
	sortField: string;

	@IsOptional()
	sortOrder: 1 | -1;
}
