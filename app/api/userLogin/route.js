import ConnectDB from "@/lib/Config/db";
import userAuthenticationModel from "@/lib/models/UserAuthenticationModel";
import { NextResponse } from "next/server";
const bcrypt = require("bcrypt");

export async function POST(request) {
  try {
    const requestBody = await request.json();
    const { email, password } = requestBody;

    const connectionToDB = await ConnectDB();
    if (connectionToDB) {
      const user = await userAuthenticationModel.findOne({ email });
      console.log(user);
      if (!user) {
        return NextResponse.json({
          status: "error",
          message: "User not found",
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({
          status: "error",
          message: "Invalid credentials",
        });
      }

      // Handle successful login (e.g., generate a token, set a cookie, etc.)
      return NextResponse.json({
        status: "success",
        message: "Login successful",
      });
    } else {
      throw new Error("Couldn't connect to database");
    }
  } catch (error) {
    console.error(error, "Request in server error");
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
