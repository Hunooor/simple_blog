import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from 'bcrypt'

@Schema()
export class User {

    @Prop({required: true})
    username: string;

    @Prop({required: true})
    authorname: string;

    @Prop({required: true})
    password: string;

}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre<User>('save', async function (next: Function) {
    this.password = await hash(this.password, 10)
    next()
})