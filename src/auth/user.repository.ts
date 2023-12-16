import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepository {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const { username, password } = authCredentialsDto;

		const user = new this.userModel();
		user.username = username;
		user.salt = await bcrypt.genSalt();
		user.password = await this.hashPassword(password, user.salt);

		try {
			await user.save();
		} catch (error) {
			const { code } = error;
			if (code === 11000) {
				throw new ConflictException("username already exist!");
			} else {
				throw new InternalServerErrorException();
			}
		}
	}

	async validateUserPassword(
		authCredentialsDto: AuthCredentialsDto,
	): Promise<string> {
		const { username, password } = authCredentialsDto;
		const user = await this.getUserByName(username);

		if (user && (await user.validatePassword(password))) {
			return user.username;
		}
		return null;
	}

	private async hashPassword(password: string, salt: string): Promise<string> {
		return bcrypt.hash(password, salt);
	}

	async getUserByName(username: string) {
		return await this.userModel.findOne({ username }).exec();
	}
}
