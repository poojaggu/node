import jwt from "jsonwebtoken";
import Users from "../models/Authenticationmodel";
export const validate = function (req, res, next) {
  const { name, email, phone, organization, role, password } = req.body;
  if (!name || name.trim() === "") {
    return res.json("name is required");
  }
  if (!email || email.trim() === "") {
    return res.json("email is required");
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.json("Invalid email");
  }
  if (!phone || phone.trim() === "") {
    return res.json("phone number is required");
  }
  if (!password || password.trim() === "") {
    return res.json("password is required");
  }
  next();
};
export const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || email.trim() === "") {
    return res.json("email is required");
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return res.json("Invalid email");
  }

  if (!password || password.trim() === "") {
    return res.json("password is required");
  }

  next();
};

const createUser = async (req, res) => {
  try {
    const { name, email, phone, organization, role, password } = req.body;
    const find = Users.findOne({email});
    if(find) return res.json({message:'Already registired',statusCode:400})
    const user = new Users({
      name,
      email,
      phone,
      organization,
      role,
      password,
    });
    res.json({
      data: user,
      statusCode: 200,
      message: " user created successfully ",
    });
  } catch (err) {
    console.log(err, "rerrrr");

    return res
      .status(400)
      .json({ message: "Internal Servor Error", statusCode: 400 });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await Users.findOne({ email });
    if (!data) {
      res.json("user not found");
    }
    console.log(data);
    if (data.password !== password) {
      res.json("password is wrong");
    }
    const token = jwt.sign(
      { role: data.role, email: data.email },
      process.env.jwt,
      { expiresIn: "1day" }
    );
    console.log(token);
    res.json({
      data,
      statusCode: 200,
      message: "logged in successfully",
      token: token,
    });
  } catch (err) {
    res.status(400).json({ message: "Internal Servor Error", statusCode: 400 });
  }
};

export { createUser, loginUser };
