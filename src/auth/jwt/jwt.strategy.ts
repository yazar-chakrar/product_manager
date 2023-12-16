import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "./jwt-payload.interface";
import { UserRepository } from "../user.repository";
import { User } from "../user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userRepository: UserRepository) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: "topSecretYazar",
		});
	}

	async validate(payload: JwtPayload): Promise<User> {
		const { username } = payload;
		const user = await this.userRepository.getUserByName(username);

		if (!user) {
			throw new UnauthorizedException("");
		}

		return user;
	}
}
