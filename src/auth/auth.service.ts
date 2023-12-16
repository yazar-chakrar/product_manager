import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt/jwt-payload.interface";

@Injectable()
export class AuthService {
	constructor(
		private userRepository: UserRepository,
		private jwtService: JwtService,
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.userRepository.signUp(authCredentialsDto);
	}

	async signIn(
		authCredentialsDto: AuthCredentialsDto,
	): Promise<{ accesToken: string }> {
		const username = await this.userRepository.validateUserPassword(
			authCredentialsDto,
		);

		if (!username) {
			throw new UnauthorizedException("Invalid crendentials");
		}

		const payload: JwtPayload = { username };
		const accesToken = this.jwtService.sign(payload);

		return { accesToken };
	}
}
