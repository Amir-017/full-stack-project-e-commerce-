import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // confirmedPassword: { type: String, required: true },
  role: { type: String, enum: ["admin", "member"], default: "member" },
  // image:{   
  //     type:String,
  //     required:true
  // }
});

// pre save    
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // مهم لمنع إعادة hash

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // this.confirmedPassword = await bcrypt.hash(this.confirmedPassword, salt);
  // next()
});

export const userModel = mongoose.model("User", userSchema);
