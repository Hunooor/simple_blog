import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./User.schema";

@Schema({ timestamps: true })
export class Blog {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    createdAt: Date

    @Prop()
    updatedAt: Date

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    user: User;

}

export const blogSchema = SchemaFactory.createForClass(Blog);