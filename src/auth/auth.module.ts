import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User, UserSchema } from "./user.entity";
import { UserRepository } from "./user.repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt/jwt.strategy";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: "jwt" }),
		JwtModule.register({
			secret: "topSecretYazar",
			signOptions: {
				expiresIn: 3600,
			},
		}),
		MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
	],
	controllers: [AuthController],
	providers: [JwtStrategy, AuthService, UserRepository],
	exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
