import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    otpCode: {
      type: Number,
      default: null,
    },
    otpCreatedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
