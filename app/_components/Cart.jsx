import React, { useContext } from "react";
import { CartContext } from "../_context/CartContext";
import Link from 'next/link';

function Cart() {
  const {cart, setCart} = useContext(CartContext);
  return (
    <div
      className="h-[300px] w-[250px] bg-gray-300
    z-10 rounded-md border shadow-sm absolute
    mx-10 right-10 top-12 p-5 overflow-auto"
    >

      <div className="mt-2 space-y-6">
        <ul className="space-y-4">
          {cart?.map((item) => (
            <li key={item?.id} className="flex items-center gap-4">
            <img
              src={item?.product?.banner[0]?.url}
              alt=""
              className="size-16 rounded object-cover"
            />

            <div>
              <h3 className="text-sm text-gray-900 line-clamp-1">{item?.product?.title}</h3>

              <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                <div>
                  <dt className="inline">Category: </dt>
                  <dd className="inline">{item?.product?.category}</dd>
                </div>

                <div>
                  <dt className="inline">Price: </dt>
                  <dd className="inline">{item?.product?.price}</dd>
                </div>
              </dl>
            </div>
          </li>
          ))}
          
        </ul>

        <div className="space-y-4 text-center">
          <Link
            href="/cart"
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            View my cart ({cart?.length})
          </Link>

          <Link
            href="/"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
