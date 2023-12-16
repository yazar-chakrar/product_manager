import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePurchaseOrderDto } from "./dto/create-purchase_order.dto";
import { PurchaseOrderRepository } from "./purchase_order.repository";
import { PurchaseOrder } from "./purchase_order.model";
import { User } from "src/auth/user.entity";
import { GetPurchaseOrdersFilterDto } from "./dto/get-purchase_orders-filter.dto";

@Injectable()
export class PurchaseOrderService {
	constructor(private purchaseOrderRepository: PurchaseOrderRepository) {}

	async getPurchaseOrders(
		filterDto: GetPurchaseOrdersFilterDto,
	): Promise<PurchaseOrder[]> {
		return await this.purchaseOrderRepository.filterPurchaseOrders(filterDto);
	}

	async getPurchaseOrderById(id: string): Promise<PurchaseOrder> {
		const product = await this.purchaseOrderRepository.getPurchaseOrderById(id);
		return product;
	}

	async deletePurchaseOrderById(id: string): Promise<void> {
		const result = await this.purchaseOrderRepository.deletePurchaseOrderById(
			id,
		);
		if (!result.deletedCount) {
			throw new NotFoundException(`Product with ID '${id}' not found`);
		}
	}

	async createPurchaseOrder(
		createProductDto: CreatePurchaseOrderDto,
		user: User,
	): Promise<PurchaseOrder> {
		return this.purchaseOrderRepository.createPurchaseOrder(
			createProductDto,
			user,
		);
	}
}
