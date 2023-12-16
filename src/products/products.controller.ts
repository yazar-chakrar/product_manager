import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	Patch,
	Query,
	UsePipes,
	UseGuards,
	ValidationPipe,
	ParseIntPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateProductDto } from "./dto/create-product.dto";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";
import { ProductCurrencyValidationPipe } from "./pipes/product-currency.validation.pipe";
import { ProductsService } from "./products.service";
import { Product } from "./product.model";
import { ProductCurrency } from "./product.types";
import { GetUser } from "../auth/decorators/get-user.decorator";
import { User } from "src/auth/user.entity";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller("products")
export class ProductsController {
	constructor(private productsService: ProductsService) {}

	@Get()
	@UseGuards(AuthGuard())
	getTasksFilter(
		@Query(new ValidationPipe({ transform: true }))
		filterDto: GetProductsFilterDto,
	) {
		return this.productsService.getProducts(filterDto);
	}

	@Get("/:id")
	@UseGuards(AuthGuard())
	getTaskById(@Param("id") id: string): Promise<Product> {
		return this.productsService.getProductById(id);
	}

	@Delete("/:id")
	@UseGuards(AuthGuard())
	deleteTaskById(@Param("id") id: string): Promise<void> {
		return this.productsService.deleteProductById(id);
	}

	@Post()
	@UseGuards(AuthGuard())
	@UsePipes(ValidationPipe)
	createTask(@Body() createProductDto: CreateProductDto): Promise<Product> {
		return this.productsService.createProduct(createProductDto);
	}

	@Patch("/:id")
	@UseGuards(AuthGuard())
	updateProduct(
		@Param("id") id: string,
		@Body("currency", ProductCurrencyValidationPipe)
		currency: ProductCurrency,
		@Body()
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		updateProductDto.currency = currency;
		return this.productsService.updateProduct(id, updateProductDto);
	}
}
