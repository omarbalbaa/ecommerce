import React from "react";
import Image from "next/image";
function ProductBanner({ product }) {
  const imageUrl = product?.banner?.[0]?.url;

  return (
    <div>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="product-details-banner"
          width={400}
          height={400}
          className="rounded-lg"
        />
      ) : (
        <div className="w-[400px] h-[400px] bg-slate-900 rounded-lg animate-pulse"></div>
      )}
    </div>
  );
}

export default ProductBanner;
