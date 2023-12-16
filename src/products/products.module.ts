import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { Product, ProductSchema } from "./product.model";
import { ProductRepository } from "./product.repository";
import { AuthModule } from "src/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
		AuthModule,
	],
	controllers: [ProductsController],
	providers: [ProductsService, ProductRepository],
})
export class ProductsModule {}
