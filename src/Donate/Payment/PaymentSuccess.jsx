import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosInstance = useAxios();
  useEffect(() => {
    axiosInstance.post(`/success-payment?session_id=${sessionId}`);
  }, []);

  return <div>success</div>;
};

export default PaymentSuccess;
