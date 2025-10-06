const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const addressSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: { type: String, required: true }, // hashed
    addresses: [addressSchema],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   const salt = await bcrypt.genSalt(10);
//   this.password = bcrypt.hash(this.password, salt);
//   next();
// });

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" } // adjust as you like
  );
};

module.exports = mongoose.model("User", userSchema);