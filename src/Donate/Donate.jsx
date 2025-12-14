import React from "react";
import useAxios from "../hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const handleCheckOut = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donorEmail,
      donateAmount,
      donorName,
    };

    axiosInstance.post("/create-payment-checkout", formData).then((res) => {
      console.log(res);
      window.location.href = res.data.url;
    });
  };
  return (
    <div>
      <form
        onSubmit={handleCheckOut}
        className="flex justify-center items-center max-h-screen"
      >
        <input
          name="donateAmount"
          type="text"
          placeholder="Type here"
          className="input"
        />
        <button className="btn btn-primary" type="submit">
          Donate
        </button>
      </form>
    </div>
  );
};

export default Donate;
