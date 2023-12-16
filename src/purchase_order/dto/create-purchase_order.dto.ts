import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
export class CreatePurchaseOrderDto {
	@IsNotEmpty()
	productId: Types.ObjectId;

	@IsNotEmpty()
	quantity: number;
}
