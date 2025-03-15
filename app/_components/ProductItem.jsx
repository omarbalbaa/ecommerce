import React from "react";
import Image from "next/image";
import Link from "next/link";

function ProductItem({ product }) {
  return (
    <Link href={`/product-details/${product?.documentId}`} className="p-1 hover:border hover:shadow-md rounded-lg border-teal-950 hover:cursor-pointer">
      <Image
        src={product?.banner[0].url}
        alt={product?.title}
        width={400}
        height={350}
        className="rounded-t-lg h-[270px] object-cover"
      />
      <div className="flex justify-between p-3 items-center bg-gray-900">
        <div className="">
          <h2 className="text-[14px] font-semibold line-clamp-1">{product?.title}</h2>
          <h2 className="text-[10px] text-gray-400">{product?.category}</h2>
        </div>
        <div>
          <h2 className="font-semibold">$ {product?.price}</h2>
        </div>
      </div>
    </Link>
  );
}

export default ProductItem;
