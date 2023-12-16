import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { CreditCardsService } from "./credit_cards.service";
import { CreditCardsApi } from "./api.service";
import { CreditCardsController } from "./credit_cards.controller";

@Module({
	imports: [AuthModule],
	controllers: [CreditCardsController],
	providers: [CreditCardsService, CreditCardsApi],
})
export class CreditCardsModule {}
