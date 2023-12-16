import {
	Controller,
	Get,
	Query,
	UseGuards,
	ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetCreditCardsFilterDto } from "./dto/get-purchase_orders-filter.dto";
import { CreditCardsService } from "./credit_cards.service";

@Controller("credit_cards")
export class CreditCardsController {
	constructor(private purchaseOrderService: CreditCardsService) {}

	@Get()
	@UseGuards(AuthGuard())
	getPurchaseOrdersFilter(
		@Query(new ValidationPipe({ transform: true }))
		filterDto: GetCreditCardsFilterDto,
	) {
		return this.purchaseOrderService.getCreditCards(filterDto);
	}
}
