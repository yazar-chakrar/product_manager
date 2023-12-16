import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UsePipes,
	UseGuards,
	ValidationPipe,
	Query,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreatePurchaseOrderDto } from "./dto/create-purchase_order.dto";
import { PurchaseOrderService } from "./purchase_orders.service";
import { PurchaseOrder } from "./purchase_order.model";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { User } from "src/auth/user.entity";
import { GetPurchaseOrdersFilterDto } from "./dto/get-purchase_orders-filter.dto";

@Controller("purchases")
export class PurchaseOrdersController {
	constructor(private purchaseOrderService: PurchaseOrderService) {}

	@Get()
	@UseGuards(AuthGuard())
	getPurchaseOrdersFilter(
		@Query(new ValidationPipe({ transform: true }))
		filterDto: GetPurchaseOrdersFilterDto,
	) {
		return this.purchaseOrderService.getPurchaseOrders(filterDto);
	}

	@Get("/:id")
	@UseGuards(AuthGuard())
	getPurchaseOrderById(@Param("id") id: string): Promise<PurchaseOrder> {
		return this.purchaseOrderService.getPurchaseOrderById(id);
	}

	@Delete("/:id")
	@UseGuards(AuthGuard())
	deletePurchaseOrderById(@Param("id") id: string): Promise<void> {
		return this.purchaseOrderService.deletePurchaseOrderById(id);
	}

	@Post()
	@UseGuards(AuthGuard())
	@UsePipes(ValidationPipe)
	createPurchaseOrder(
		@GetUser() user: User,
		@Body() createPurchaseOrderDto: CreatePurchaseOrderDto,
	): Promise<PurchaseOrder> {
		return this.purchaseOrderService.createPurchaseOrder(
			createPurchaseOrderDto,
			user,
		);
	}
}
