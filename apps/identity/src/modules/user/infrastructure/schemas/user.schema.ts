import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  displayName: string;

  @Prop({ type: String, required: true, unique: true })
  emailAddress: string;

  @Prop({ type: String, required: true })
  passwordHash: string;

  createdAt: Date;

  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
