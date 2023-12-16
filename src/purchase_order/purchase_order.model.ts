import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { User } from "src/auth/user.entity";
import { Product } from "src/products/product.model";

@Schema({ timestamps: true })
export class PurchaseOrder extends Document {
	@Prop({ type: Types.ObjectId, ref: Product.name, required: true })
	product: Product;

	@Prop({ required: true })
	quantity: number;

	@Prop({ type: Types.ObjectId, ref: User.name, required: true })
	userId: string;
}

export const PurchaseOrderSchema = SchemaFactory.createForClass(PurchaseOrder);
