"use client";
import BreadCrumb from '../../_components/BreadCrumb';
import ProductApis from "../../_utils/ProductApis";
import React, { useEffect, useState } from "react";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";

function ProductDetails({ params }) {
  const path = usePathname();
  const [productDetails, setProductDetails] = useState({});
  const [productList, setProductList] = useState([])
  
  useEffect(() => {
    getProductById_();
  }, [params?.productId]);
  
  const getProductById_ = () => {
    ProductApis.getProductById(params?.productId).then((res) => {
      setProductDetails(res.data.data);
      getProductListByCategory(res.data.data);
    });
  };

  const getProductListByCategory = (product) => {
    ProductApis.getProductsByCategory(product?.category).then((res) => {
      setProductList(res?.data?.data);
    });
  };

  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumb path={path} />
      <div className="grid grid-cols-1 mt-10 gap-5 sm:gap-0 justify-around sm:grid-cols-2">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      <div>
        <h2 className="mt-20 mb-4 text-xl">Recommended Products</h2>
        <ProductList productList={productList} />
      </div>
    </div>
  );
}

export default ProductDetails;
