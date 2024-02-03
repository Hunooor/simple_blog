import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { hash } from 'bcrypt'

@Schema()
export class User {

    @Prop({required: true})
    userName: string;

    @Prop({required: true})
    authorName: string;

    @Prop({required: true, select: false})
    password: string;

}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre<User>('save', async function (next: Function) {
    this.password = await hash(this.password, 10)
    next()
})