import * as bcrypt from "bcrypt";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
	@Prop({ unique: true })
	username: string;

	@Prop()
	salt: string;

	@Prop()
	password: string;

	validatePassword: (password: string) => Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function (
	password: string,
): Promise<boolean> {
	const hash = await bcrypt.hash(password, this.salt);
	return hash === this.password;
};
