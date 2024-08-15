import ConnectDB from "@/lib/Config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

// Ensure DB connection is established
const LoadDB = async () => {
    await ConnectDB();
};
LoadDB();

export async function GET(request) {
    const blogId = request.nextUrl.searchParams.get("id")
    if (blogId) {
        const blog = await BlogModel.findById(blogId)
        return NextResponse.json({ status: "success", statusCode: 200, data: blog });
    } else {
        const blogs = await BlogModel.find({})
        const total_items = blogs.length
        return NextResponse.json({ status: "success", statusCode: 200, total_items, data: blogs, });
    }
}

export async function POST(request) {
    try {
        await LoadDB(); // Ensure DB connection is established

        const formData = await request.formData();
        const timestamp = Date.now();

        const image = formData.get('image');
        const authorImg = formData.get('authorImg');
        if (!image || image === "" || image === undefined) {
            return NextResponse.json({ status: 'error', statusCode: 400, message: "Blog Image is missing" });
        }
        if (!authorImg || authorImg === "" || authorImg === undefined) {
            return NextResponse.json({ status: 'error', statusCode: 400, message: "Author Image is missing" });
        }

        const imageByteData = await image.arrayBuffer();
        const buffer = Buffer.from(imageByteData);
        const imagePath = path.join(process.cwd(), 'public/blogImages', `${timestamp}_${image.name}`);

        await writeFile(imagePath, buffer);
        const imgUrl = `/blogImages/${timestamp}_${image.name}`;

        const authorImageByteData = await authorImg.arrayBuffer();
        const authorImageBuffer = Buffer.from(authorImageByteData);
        const authorImagePath = path.join(process.cwd(), 'public/blogAuthorImages', `${timestamp}_${authorImg.name}`);

        await writeFile(authorImagePath, authorImageBuffer);
        const authorImgUrl = `/blogAuthorImages/${timestamp}_${authorImg.name}`;
        console.log('Author Image URL:', authorImgUrl);

        const blogData = {
            title: formData.get('title'),
            description: formData.get('description'),
            category: formData.get('category'),
            author: formData.get('author'),
            image: imgUrl,
            authorImg: authorImgUrl,
        };

        await BlogModel.create(blogData);
        console.log("Blog created successfully");

        return NextResponse.json({ status: 'success', statusCode: 201, message: "Blog created successfully..." });

    } catch (error) {
        console.error("Error creating blog:", error);
        return NextResponse.json({ status: 'error', statusCode: 500, message: "Internal server error" });
    }
}
