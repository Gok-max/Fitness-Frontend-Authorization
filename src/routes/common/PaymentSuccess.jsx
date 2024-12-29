import { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import api from "../../service/ApiService.jsx";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const razorpay_payment_id = queryParams.get("razorpay_payment_id");
  const razorpay_order_id = queryParams.get("razorpay_order_id");
  const razorpay_signature = queryParams.get("razorpay_signature");
  const classId = queryParams.get("classId");
  const userId = sessionStorage.getItem("id");

  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        await api.post("/payment-success", {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          classId,
          userId,
        });
        toast.success("Class Booked Successfully!");
        setIsPaymentConfirmed(true);
      } catch (error) {
        console.error("Error confirming payment and booking:", error);
        toast.error("Payment confirmation failed.");
      }
    };

    if (razorpay_payment_id && razorpay_order_id && razorpay_signature) {
      confirmPayment();
    }
  }, [razorpay_payment_id, razorpay_order_id, razorpay_signature]);

  return (
    <div>
      {/* UI code similar to existing PaymentSuccess */}
    </div>
  );
};

export default PaymentSuccess;
