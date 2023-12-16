import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductCurrency } from "./product.types";
import { CreateProductDto } from "./dto/create-product.dto";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";
import { ProductRepository } from "./product.repository";
import { Product } from "./product.model";
import { User } from "src/auth/user.entity";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductsService {
	constructor(private productRepository: ProductRepository) {}

	async getProducts(filterDto: GetProductsFilterDto) {
		return await this.productRepository.filterProducts(filterDto);
	}

	async getProductById(id: string): Promise<Product> {
		const product = await this.productRepository.getProductById(id);
		return product;
	}

	async deleteProductById(id: string): Promise<void> {
		const result = await this.productRepository.deleteProductById(id);
		if (!result.deletedCount) {
			throw new NotFoundException(`Product with ID '${id}' not found`);
		}
	}

	async createProduct(createProductDto: CreateProductDto): Promise<Product> {
		return this.productRepository.createProduct(createProductDto);
	}

	async updateProduct(
		id: string,
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		return this.productRepository.updateProduct(id, updateProductDto);
	}
}
