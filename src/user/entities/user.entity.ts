import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export enum USER_ROLE {
  JOUEUR = 'joueur',
  ADMIN = 'admin',
}

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, unique: true, required: true })
  tel: string;

  @Prop({ type: String, required: true })
  prenom: string;

  @Prop({ type: String, required: true })
  nom: string;

  @Prop({ type: String })
  licence: string;

  @Prop({ type: String, required: true })
  @Exclude()
  password: string;

  @Prop({ type: String })
  resetPasswordToken: string;

  @Prop({ type: Boolean, required: true, default: false })
  isActive: boolean;

  @Prop({ type: Array, default: [USER_ROLE.JOUEUR] })
  role: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
