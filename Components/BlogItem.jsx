import { assets } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogItem = ({ image, category, title, description, id }) => {
  return (
    <div className="max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] transition-shadow duration-300">
      <Link href={`/blogs/${id}`}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={300}
          className="border-b border-black w-full h-[200px] object-cover"
        />
      </Link>
      <div className="p-5">
        <p className="px-2 py-1 inline-block bg-black text-white text-sm">
          {category}
        </p>
        <h5 className="mt-3 mb-2 text-lg font-medium tracking-tight text-gray-900">
          {title}
        </h5>
        <p className="mb-4 text-sm tracking-tight text-gray-700 line-clamp-3">
          {description}
        </p>
        <Link
          href={`/blogs/${id}`}
          className="inline-flex items-center py-2 font-semibold text-center text-black hover:text-blue-600"
        >
          Read more{" "}
          <Image src={assets.arrow} alt="arrow" width={12} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
