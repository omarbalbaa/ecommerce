import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { CartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import CartApis from "../../_utils/CartApis";
import OrderApis from "../../_utils/OrderApis";

const CheckoutForm = ({ amount }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState();

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    createOrder();
    sendEmail();

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });
    const clientSecret = await res.json();

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const createOrder = () => {
    let productIds = [];
    cart.forEach((element) => {
      productIds.push(element?.product?.id);
    });
    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount,
        products: productIds,
      },
    };
    OrderApis.createOrder(data).then((res) => {
      if (res) {
        const deletePromises = cart.map((element) =>
          CartApis.deleteCartItem(element?.id)
        );
        Promise.all(deletePromises)
          .then((result) => {
            console.log("cart items have moved to order", result);
            setCart([]);
          })
          .catch((error) => {
            console.log("error deleting cart items:", error);
          });
      }
    });
  };
  const sendEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "POST",
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-32 md:mx-[320px] mt-12">
        <PaymentElement />
        <button className="rounded border border-teal-600 bg-teal-600 my-4 px-6 py-2 text-sm font-medium hover:bg-transparent focus:outline-none focus:ring active:text-opacity-75 sm:w-auto">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
