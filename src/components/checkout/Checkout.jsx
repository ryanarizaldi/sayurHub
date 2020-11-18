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
    [cost, setCost] = useState(0),
    [statCost] = useState([
      {
        code: "pos",
        name: "POS Indonesia (POS)",
        costs: [
          {
            service: "Paket Kilat Khusus",
            description: "Paket Kilat Khusus",
            cost: [
              {
                value: 7000,
                etd: "1-2 HARI",
                note: "",
              },
            ],
          },
          {
            service: "Q9 Barang",
            description: "Q9 Barang",
            cost: [
              {
                value: 17000,
                etd: "9 JAM",
                note: "",
              },
            ],
          },
          {
            service: "Express Next Day Barang",
            description: "Express Next Day Barang",
            cost: [
              {
                value: 18000,
                etd: "1 HARI",
                note: "",
              },
            ],
          },
        ],
      },
      {
        code: "tiki",
        name: "Citra Van Titipan Kilat (TIKI)",
        costs: [
          {
            service: "ECO",
            description: "Economy Service",
            cost: [
              {
                value: 8000,
                etd: "4",
                note: "",
              },
            ],
          },
          {
            service: "REG",
            description: "Regular Service",
            cost: [
              {
                value: 9000,
                etd: "2",
                note: "",
              },
            ],
          },
          {
            service: "ONS",
            description: "Over Night Service",
            cost: [
              {
                value: 18000,
                etd: "1",
                note: "",
              },
            ],
          },
        ],
      },
      {
        code: "jne",
        name: "Jalur Nugraha Ekakurir (JNE)",
        costs: [
          {
            service: "CTC",
            description: "JNE City Courier",
            cost: [
              {
                value: 9000,
                etd: "1-2",
                note: "",
              },
            ],
          },
          {
            service: "CTCYES",
            description: "JNE City Courier",
            cost: [
              {
                value: 18000,
                etd: "1-1",
                note: "",
              },
            ],
          },
        ],
      },
    ]);

  const getTransaction = async () => {
    try {
      const transaction = await Axios({
        method: "GET",
        url: `https://pacific-oasis-23064.herokuapp.com/transaction/find`,
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setBills(transaction.data.data[transaction.data.data.length - 1]);
      console.log(transaction.data.data.length - 1, "ini length");
    } catch (error) {
      console.log("error get transaction", error);
    }
  };
  const cek = Object.keys(bills).length;

  const city = bills.city;
  const weight = bills.cart?.totalWeight;

  useEffect(() => {
    getTransaction();
    if (cek >= 1) {
      const getShipCost = async () => {
        try {
          const shipping = await Axios({
            method: "Post",
            url: `/api/rajaongkir/cost`,
            // url: `https://pacific-oasis-23064.herokuapp.com/delivery/cost`,
            // url: `https://api.rajaongkir.com/starter/cost`,
            data: qs.stringify({
              origin: 152,
              destination: city,
              weight: Math.ceil(weight) * 1000,
              courier: courier,
            }),
            headers: {
              "content-Type": "application/x-www-form-urlencoded",
              // token: localStorage.getItem("token"),
              key: `d1fcd86f931c3cbacfcebe2b9b8edbe2`,
            },
          });
          setCourOpt(shipping.data.data.rajaongkir.results[0].costs);
        } catch (error) {
          console.log("error get shipping cost", error);
        }
      };
      getShipCost();
    } else {
      getTransaction();
    }
  }, [courier, cek, city, weight]);

  const validateCourier = () => {
    if (cost < 1) {
      Swal.fire("Error!", "Pick Courier Service first!", "error");
    } else {
      setCredit(true);
      console.log(courOpt);
    }
  };

  const priceForm = (num) => {
    let str = String(num),
      split = str.split(","),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      let separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah;
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
                <p>Rp. {priceForm(item.price)} ,-</p>
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
          <p>
            Rp. {Object.keys(bills).length && priceForm(bills.cart.totalPrice)},
            -
          </p>
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
                {statCost
                  .filter((cour) => cour.code === courier)[0]
                  .costs.map((opt) => (
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
                            : opt.service === "CTCYES"
                            ? "REG"
                            : opt.service === "CTC"
                            ? "ODS"
                            : opt.service === "Q9 Barang"
                            ? "FCF"
                            : opt.service
                        }: RP ${priceForm(opt.cost[0].value)},-`}
                      </label>
                    </li>
                  ))}

                {/* {courOpt.map((opt) => (
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
                      }: RP ${priceForm(opt.cost[0].value)},-`}
                    </label>
                  </li>
                ))} */}
              </ul>
            </form>
          </div>
        </div>
        <div className={styles.TotalPay}>
          <p>Total</p>
          <p>
            Rp {priceForm(parseInt(bills.cart?.totalPrice) + parseInt(cost))} ,-
          </p>
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
