import Axios from "axios";
import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import Credit from "./ModalCreditForm";
import qs from "qs";
import Swal from "sweetalert2";

export default function Checkout() {
  const [credit, setCredit] = useState(false),
    [bills, setBills] = useState({}),
    [courier, setCour] = useState("pos"),
    [courOpt, setCourOpt] = useState([]),
    [cost, setCost] = useState(0);

  const getTransaction = async () => {
    try {
      const transaction = await Axios({
        method: "GET",
        url: `https://pacific-oasis-23064.herokuapp.com/transaction/find`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setBills(...transaction.data.data);
    } catch (error) {
      console.log("error get transaction", error);
    }
  };

  const getShipCost = async () => {
    try {
      const shipping = await Axios({
        method: "Post",
        url: `https://pacific-oasis-23064.herokuapp.com/delivery/cost`,
        data: qs.stringify({
          origin: 152,
          destination: bills.city,
          weight: Math.ceil(bills.cart.totalWeight),
          courier: courier,
        }),
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCourOpt(shipping.data.data.rajaongkir.results[0].costs);
    } catch (error) {
      console.log("error get shipping cost", error);
    }
  };

  useEffect(() => {
    if (Object.keys(bills).length >= 1) {
      getTransaction();
      getShipCost();
    } else {
      getTransaction();
    }
  }, [Object.keys(bills).length, courier]);

  const validateCourier = () => {
    if (cost < 1) {
      Swal.fire("Error!", "Pick Courier Service first!", "error");
    } else {
      setCredit(true);
    }
  };

  return (
    <div className={styles.Container}>
      {credit && (
        <Credit
          open={credit}
          onClose={() => setCredit(false)}
          amount={parseInt(bills.cart?.totalPrice) + parseInt(cost)}
        />
      )}
      <div className={styles.Title}>
        <h1>Billing</h1>
      </div>
      <div className={styles.Invoice}>
        <div className={styles.Thead}>
          <p>Product</p>
          <p>Quantity</p>
          <p>Weight</p>
          <p>Total</p>
        </div>
        <div className={styles.Products}>
          {Object.keys(bills).length &&
            bills.cart.items?.map((item) => (
              <div className={styles.RowProduct} key={item.id}>
                <p>{item.name}</p>
                <p>x {item.quantity}</p>
                <p>{item.weight} kg</p>
                <p>Rp. {item.price} ,-</p>
              </div>
            ))}
        </div>
        <div className={styles.TotalWeight}>
          <p>Total Weight</p>
          <p>
            {Object.keys(bills).length && Math.ceil(bills.cart.totalWeight)} kg
          </p>
        </div>
        <div className={styles.Subtotal}>
          <p>Subtotal</p>
          <p>Rp. {Object.keys(bills).length && bills.cart.totalPrice} , -</p>
        </div>
        <div className={styles.Shipping}>
          <p>Shipping</p>
          <div className={styles.ShippingOption}>
            <form>
              <label htmlFor="courier">Courier</label>
              <select
                className={styles.SelectCour}
                name="courier"
                id="courier"
                onChange={(e) => setCour(e.target.value)}
                value={courier}
              >
                <option disabled></option>
                <option value="pos">Pos</option>
                <option value="tiki">Tiki</option>
                <option value="jne">Jne</option>
              </select>
              <ul>
                {courOpt.map((opt) => (
                  <li key={opt.service}>
                    <input
                      type="radio"
                      id={opt.service}
                      name="courService"
                      value={opt.cost[0].value}
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <label htmlFor={opt.service}>
                      <span className={styles.Caps}>{courier}</span>
                      {` - ${
                        opt.service === "Paket Kilat Khusus"
                          ? "PKN"
                          : opt.service === "Express Next Day Barang"
                          ? "END"
                          : opt.service
                      }: RP ${opt.cost[0].value},-`}
                    </label>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        </div>
        <div className={styles.TotalPay}>
          <p>Total</p>
          <p>Rp {parseInt(bills.cart?.totalPrice) + parseInt(cost)} ,-</p>
        </div>
        <div className={styles.Button}>
          <button className={styles.Pay} onClick={validateCourier}>
            Pay Now
          </button>
        </div>
        <div className={styles.SupportPay}>
          <p>
            * Currently we only use Visa and Master Card as a payment method
          </p>
        </div>
      </div>
    </div>
  );
}
