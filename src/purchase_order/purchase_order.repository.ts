import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePurchaseOrderDto } from "./dto/create-purchase_order.dto";
import { PurchaseOrder } from "./purchase_order.model";
import { User } from "src/auth/user.entity";
import { Model } from "mongoose";
import { DeleteResult } from "mongodb";
import { Product } from "src/products/product.model";
import { GetPurchaseOrdersFilterDto } from "./dto/get-purchase_orders-filter.dto";

@Injectable()
export class PurchaseOrderRepository {
	constructor(
		@InjectModel(PurchaseOrder.name)
		private readonly purchaseOrderModel: Model<PurchaseOrder>,
		@InjectModel(Product.name) private readonly productModel: Model<Product>,
	) {}

	async filterPurchaseOrders(
		filterDto: GetPurchaseOrdersFilterDto,
	): Promise<PurchaseOrder[]> {
		const { offset, limit } = filterDto;
		const limit_ = Math.min(limit || 30, 30);
		const offset_ = offset || 1;
		const skip_ = limit_ * (offset_ - 1);
		const response = await this.purchaseOrderModel
			.aggregate([
				{
					$facet: {
						total: [{ $count: "total" }],
						data: [{ $skip: skip_ }, { $limit: limit_ }],
					},
				},
				{
					$project: {
						total: { $arrayElemAt: ["$total.total", 0] },
						data: "$data",
					},
				},
			])
			.exec();
		return response;
	}

	async createPurchaseOrder(
		createProductDto: CreatePurchaseOrderDto,
		user: User,
	): Promise<PurchaseOrder> {
		const { productId, quantity } = createProductDto;
		const product = await this.productModel
			.findById(productId)
			.select("name price");
		if (!product) {
			throw new NotFoundException(`Product with ID '${productId}' not found`);
		}
		const purchase: PurchaseOrder = new this.purchaseOrderModel({
			product,
			quantity,
			userId: user._id,
		});
		await purchase.save();
		return purchase;
	}

	async getPurchaseOrderById(id: string): Promise<PurchaseOrder> {
		return this.purchaseOrderModel.findById(id).exec();
	}

	async deletePurchaseOrderById(id: string): Promise<DeleteResult> {
		return await this.purchaseOrderModel.deleteOne({ _id: id }).exec();
	}
}
