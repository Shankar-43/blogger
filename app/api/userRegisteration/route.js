import ConnectDB from "@/lib/Config/db";
import userAuthenticationModel from "@/lib/models/UserAuthenticationModel";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');
export async function POST(request) {
    try {
        // Parse the request body if it's JSON
        const requestBody = await request.json();
        console.log(requestBody, "Request in server");
        let {
            username,
            email,
            password
        } = requestBody;
        password = await bcrypt.hash(password, 10)

        let connectionToDB = await ConnectDB();
        console.log("Connecting to database", connectionToDB)
        if (connectionToDB) {
            const existingUser = await userAuthenticationModel.findOne({ email })
            if (existingUser) {
                return NextResponse.json({ status: "success", message: "User already exists" })
            } else {
                let newUser = await userAuthenticationModel({
                    username,
                    email,
                    password
                })
                await newUser.save()
                return NextResponse.json({ statusCode: 201, status: "success", message: "User successfully registered" })
            }
        } else {
            throw new Error("Couldn't connect to database")
        }
        // Return a JSON response
        return NextResponse.json({ message: "coming" });
    } catch (error) {
        console.error(error, "Request in server error");
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
