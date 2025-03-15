'use client'
import React, { useContext } from "react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { ShoppingCart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CartApis from '../../../_utils/CartApis';
import { CartContext } from "../../../_context/CartContext";

function ProductInfo({ product }) {
  const {user} = useUser();
  const router = useRouter();
  const {cart, setCart} = useContext(CartContext);
  const handleAddToCart = ()=> {
    if (!user) {
      router.push('/sign-in');
    }else {
      /*add to cart*/
      const data = {
        data: {
          username: user.fullName,
          email : user.primaryEmailAddress.emailAddress,
          products: [product?.id]
        }
      }
      CartApis.addToCart(data).then(res => {
        console.log('cart created successfully',res.data.data)
        setCart(oldCart => [
          ...oldCart, {
            id: res?.data?.data?.id,
            product
          }
        ])
      }).catch(error => {
        console.log('error',error)
      })
    }
  }
  return (
    <div>
      {product?.id ?
      <div>
      <h2 className="text-[20px]">{product?.title}</h2>
      <h2 className="text-[11px] text-gray-400">{product?.category}</h2>
      <h2 className="text-[15px] mt-5">{product?.description}</h2>
      <div className="text-[12px] text-gray-500">{product?.instantDelivery ? <h2>Eligible for Instant Delivery</h2> : <h2></h2> }</div>
      <h2 className="text-[32px] mt-3">$ {product?.price}</h2>
      
      <button onClick={() => handleAddToCart()} className="flex gap-3 bg-teal-600 hover:bg-teal-700 dark:hover:bg-teal-500 p-2 rounded-lg">
        <ShoppingCart />
        Add to cart
      </button>
    </div> : <SkeletonProductInfo /> }
      
    
    </div>
  );
}

export default ProductInfo;
