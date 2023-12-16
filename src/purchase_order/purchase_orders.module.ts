import { Module } from "@nestjs/common";
import { PurchaseOrdersController } from "./purchase_orders.controller";
import { PurchaseOrderService } from "./purchase_orders.service";
import { PurchaseOrder, PurchaseOrderSchema } from "./purchase_order.model";
import { PurchaseOrderRepository } from "./purchase_order.repository";
import { AuthModule } from "src/auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductsModule } from "src/products/products.module";
import { Product, ProductSchema } from "src/products/product.model";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: PurchaseOrder.name, schema: PurchaseOrderSchema },
			{ name: Product.name, schema: ProductSchema },
		]),
		ProductsModule,
		AuthModule,
	],
	controllers: [PurchaseOrdersController],
	providers: [PurchaseOrderService, PurchaseOrderRepository],
})
export class PurchaseOrdersModule {}
