import {
	Controller,
	Get,
	Injectable,
	Query,
	UseGuards,
	ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetCreditCardsFilterDto } from "./dto/get-purchase_orders-filter.dto";
import { CreditCardsApi } from "./api.service";

@Injectable()
export class CreditCardsService {
	constructor(private apiService: CreditCardsApi) {}

	async getCreditCards(filterDto: GetCreditCardsFilterDto) {
		const { offset, limit } = filterDto;
		const limit_ = Math.min(limit || 100, 100);
		const offset_ = offset || 1;
		const skip_ = limit_ * (offset_ - 1);
		const params = {
			size: 100,
		};
		const cards = await this.apiService.get("credit_cards", params);
		return cards
			.filter(card => card.credit_card_type === "visa")
			.slice(skip_, limit_);
	}
}
