import ConnectDB from "@/lib/Config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";
import path from "path";

// Ensure DB connection is established
const LoadDB = async () => {
    await ConnectDB();
};
LoadDB();

export async function GET(request) {
    try {
        const emailId = request.nextUrl.searchParams.get("email_Id");
        if (emailId) {
            const email = await EmailModel.findById(emailId);
            if (!email) {
                return NextResponse.json({ status: "failed", statusCode: 404, message: "Email not found" });
            }
            return NextResponse.json({ status: "success", statusCode: 200, data: email });
        } else {
            const emails = await EmailModel.find({});
            const total_items = emails.length;
            return NextResponse.json({ status: "success", statusCode: 200, total_items, data: emails });
        }
    } catch (error) {
        console.error("Error fetching emails:", error);
        return NextResponse.json({ status: "error", statusCode: 500, message: "Internal server error" });
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData(); // Await the formData
        const emailId = formData.get('email');

        if (!emailId) {
            return NextResponse.json({ statusCode: 400, status: "failed", message: "Email is missing" });
        }

        const emailPresent = await EmailModel.findOne({ email: emailId });

        if (emailPresent) {
            return NextResponse.json({ statusCode: 200, status: "success", message: `${emailId} already exists....` });
        }

        const emailData = {
            email: emailId
        };

        await EmailModel.create(emailData);
        return NextResponse.json({ statusCode: 201, status: "success", message: `${emailData.email} subscribed successfully.` });

    } catch (error) {
        console.error("Error subscribing email:", error);
        return NextResponse.json({ status: 'error', statusCode: 500, message: "Internal server error" });
    }
}

export async function DELETE(request) {
    try {
        const emailId = request.nextUrl.searchParams.get("email_Id");
        if (!emailId) {
            return NextResponse.json({ statusCode: 400, status: "failed", message: "Email ID is missing" });
        }

        const email = await EmailModel.findById(emailId);
        if (!email) {
            return NextResponse.json({ statusCode: 404, status: "failed", message: "Email not found" });
        }

        await EmailModel.findByIdAndDelete(emailId);
        return NextResponse.json({ statusCode: 200, status: "success", message: "Email deleted successfully" });
    } catch (error) {
        console.error("Error deleting email:", error);
        return NextResponse.json({ status: 'error', statusCode: 500, message: "Internal server error" });
    }
}
