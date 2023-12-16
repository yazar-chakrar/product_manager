import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { GetProductsFilterDto } from "./dto/get-products-filter.dto";
import { Product, ProductDocument } from "./product.model";
import { Model } from "mongoose";
import { DeleteResult } from "mongodb";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductRepository {
	constructor(
		@InjectModel(Product.name)
		private readonly productModel: Model<Product>,
	) {}

	async filterProducts(
		filterDto: GetProductsFilterDto,
	): Promise<{ total: number; data: Product[] }> {
		const {
			currency,
			name,
			description,
			category,
			max_price,
			min_price,
			offset,
			limit,
			sortField,
			sortOrder,
		} = filterDto;
		const limit_ = Math.min(limit || 30, 30);
		const offset_ = offset || 1;
		const skip_ = limit_ * (offset_ - 1);
		const priceFilter = () => {
			if (max_price && min_price) {
				return {
					price: {
						$gte: min_price,
						$lte: max_price,
					},
				};
			} else if (max_price) {
				return {
					price: {
						$lte: max_price,
					},
				};
			} else if (min_price) {
				return {
					price: {
						$gte: min_price,
					},
				};
			}
		};
		const nameFilter = name
			? {
					name: {
						$regex: name,
						$options: "i",
					},
			  }
			: {};
		const currencyFilter = currency
			? {
					currency: {
						$regex: currency,
						$options: "i",
					},
			  }
			: {};
		const descriptionFilter = description
			? {
					description: {
						$regex: description,
						$options: "i",
					},
			  }
			: {};
		const categoryFilter = category
			? {
					category: {
						$regex: category,
						$options: "i",
					},
			  }
			: {};
		const query = {
			...nameFilter,
			...currencyFilter,
			...descriptionFilter,
			...categoryFilter,
			...priceFilter(),
		};
		const response = await this.productModel
			.aggregate([
				{ $match: query },
				{ $sort: { [sortField || "_id"]: sortOrder ? 1 : -1 } },
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

		return response[0];
	}

	async createProduct(createProductDto: CreateProductDto): Promise<Product> {
		const { name, description, price, category } = createProductDto;
		const product: ProductDocument = new this.productModel({
			name,
			description,
			price,
			category,
		});

		await product.save();
		return product;
	}

	async getProductById(id: string): Promise<Product> {
		return this.productModel.findById(id).exec();
	}

	async deleteProductById(id: string): Promise<DeleteResult> {
		const product = await this.productModel.deleteOne({ _id: id }).exec();
		return product;
	}

	async updateProduct(
		id: string,
		updateProductDto: UpdateProductDto,
	): Promise<Product> {
		const existingProduct = await this.productModel.findByIdAndUpdate(
			id,
			updateProductDto,
			{
				new: true,
			},
		);

		if (!existingProduct) {
			throw new NotFoundException(`Product with ID '${id}' not found`);
		}

		return existingProduct;
	}
}
