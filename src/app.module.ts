import { Module, MiddlewareConsumer } from "@nestjs/common";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { ProductsModule } from "./products/products.module";
import { AuthModule } from "./auth/auth.module";
import { throttlerModuleConfig } from "./config/sec/throttlerModule.config";
import { RequestLoggerMiddleware } from "./middlewares/request-logger.middleware";
import { MongooseModule } from "@nestjs/mongoose";
import { PurchaseOrdersModule } from "./purchase_order/purchase_orders.module";
import { CreditCardsModule } from "./credit_cards_service/credit_cards.module";

@Module({
	imports: [
		ThrottlerModule.forRoot(throttlerModuleConfig),
		MongooseModule.forRoot("mongodb://localhost:27017", {
			dbName: "local",
		}),
		ProductsModule,
		PurchaseOrdersModule,
		CreditCardsModule,
		AuthModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: ThrottlerGuard,
		},
	],
})
export class AppModule {
	// add a middleware on all routes
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestLoggerMiddleware).forRoutes("*");
	}
}
