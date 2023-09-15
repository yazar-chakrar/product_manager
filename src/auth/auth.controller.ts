import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post("/signup")
	async signUp(
		@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
	): Promise<void> {
		return this.authService.signUp(authCredentialsDto);
	}

	@Post("/signin")
	async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
		return this.authService.signIn(authCredentialsDto);
	}
}
