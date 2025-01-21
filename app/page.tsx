import Banner from "@/components/Banner";
import DiscountItem from "@/components/DiscountItem";
import Feature2 from "@/components/Feature2";
import Featured from "@/components/Featured";
import Hero from "@/components/Hero";
import LeatestBlog from "@/components/LatestBlog";
import LatestProduct from "@/components/LatestProduct";
import TopCategory from "@/components/TopCategory";
import TrendingProduct from "@/components/TrendingProduct";
import UniqueFeature from "@/components/UniqueFeature";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

export default async function Home() {
  // Featured products data fetch
  const query1 = ` *[_type == "product" && isFeaturedProduct]{
    _id,
    name,
    "image":image.asset->url,
    price,
    stockLevel,
    category,
    discountPercentage
  }`;
  const featuredData1 = await client.fetch(query1);

  const query2 = ` *[_type == "product"]{
    _id,
    name,
    "image":image.asset->url,
    price,
    stockLevel,
    category,
    discountPercentage
}[0...6]`;
  const latestProduct = await client.fetch(query2);

  return (
    <div>
      <Hero />
      <Featured data={featuredData1} />
      <LatestProduct data={latestProduct} />
      <Feature2
        heading={"What Shopex Offer!"}
        className1="max-w-[1920px] px-5 sm:mx-10 lg:mx-32 xl:mx-auto my-20"
      />
      <UniqueFeature />
      <TrendingProduct />
      <DiscountItem />
      <TopCategory />
      <Banner />
      <div className="flex justify-center items-center my-9 ">
        <Image src={"/banner2.png"} alt={"banner"} width={1000} height={1000} />
      </div>
      <LeatestBlog />
    </div>
  );
}
