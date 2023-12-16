import { ProductCurrency } from "./product.types";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
	@Prop()
	name: string;

	@Prop()
	description: string;

	@Prop()
	category: string;

	@Prop({ default: ProductCurrency.DA })
	currency: ProductCurrency;

	@Prop()
	price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
