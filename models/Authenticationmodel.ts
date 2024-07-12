const mangoose1 = require("mongoose");

const authenticationSchema = new mangoose1.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mangoose1.model("Users", authenticationSchema);
export default userModel;
