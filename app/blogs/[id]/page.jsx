"use client";
import { assets } from "@/assets/assets";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const SingleBlogPage = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSingleBlog = useCallback(async () => {
    try {
      const response = await axios.get(`/api/blog`, {
        params: {
          id: params.id,
        },
      });
      if (response.data.status === "success") {
        console.log(response);
        setData(response.data.data); // Assuming data is an array and you need the first item
      } else {
        setError("Blog not found");
      }
    } catch (err) {
      setError("Failed to fetch blog data");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchSingleBlog();
  }, [fetchSingleBlog]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return data ? (
    <>
      <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src={assets.logo}
              width={120}
              alt="Logo"
              className="w-[120px] sm:w-auto"
            />
          </Link>
          <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
            Get started <Image src={assets.arrow} alt="Arrow" />
          </button>
        </div>
        <div className="text-center my-24">
          <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
            {data.title}
          </h1>
          <Image
            src={data.authorImg}
            width={60}
            height={60}
            alt="Author"
            className="mx-auto mt-6 border-white rounded-full"
          />
          <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
            {data.author}
          </p>
        </div>
      </div>
      <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image
          src={data.image}
          width={1280}
          height={720}
          alt="Blog Image"
          className="border-4 border-white"
        />
        <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>
        <p>{data.description}</p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step1: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
          consequatur dolore molestias ipsa aliquam obcaecati distinctio eius
          consequuntur.
        </p>
        <p className="my-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
          consequatur dolore molestias ipsa aliquam obcaecati distinctio eius
          consequuntur.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step2: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
          consequatur dolore molestias ipsa aliquam obcaecati distinctio eius
          consequuntur.
        </p>
        <p className="my-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
          consequatur dolore molestias ipsa aliquam obcaecati distinctio eius
          consequuntur.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">
          Step3: Self-Reflection and Goal Setting
        </h3>
        <p className="my-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
          consequatur dolore molestias ipsa aliquam obcaecati distinctio eius
          consequuntur.
        </p>
        <p className="my-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et
          consequatur dolore molestias ipsa aliquam obcaecati distinctio eius
          consequuntur.
        </p>
        <h3 className="my-5 text-[18px] font-semibold">Conclusion</h3>
        <p className="my-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut nesciunt
          esse modi ipsam similique dicta alias nihil laboriosam, quod veritatis
          eius asperiores tempora illum, laborum quidem corporis labore,
          exercitationem earum.
        </p>
        <div className="my-24">
          <p>Save this article on social media</p>
          <div className="flex">
            <Image src={assets.facebook_icon} alt="Facebook" width={50} />
            <Image src={assets.twitter_icon} alt="Twitter" width={50} />
            <Image src={assets.googleplus_icon} alt="Google Plus" width={50} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <p>Blog not found</p>
  );
};

export default SingleBlogPage;
