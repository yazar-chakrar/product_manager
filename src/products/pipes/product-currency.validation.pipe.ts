import { BadRequestException, PipeTransform } from "@nestjs/common";
import { ProductCurrency } from "../product.types";

export class ProductCurrencyValidationPipe implements PipeTransform {
	readonly allowedProductCurrencies = Object.keys(ProductCurrency).map(
		key => ProductCurrency[key],
	);

	transform(value: any) {
		value = value.toUpperCase();
		if (!this.isCurrencyValid(value)) {
			throw new BadRequestException(`"${value}" is invalid currency`);
		}
		return value;
	}

	private isCurrencyValid(status: any) {
		const idx = this.allowedProductCurrencies.indexOf(status);
		return idx != -1;
	}
}
