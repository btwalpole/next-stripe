import Head from "next/head";
import { FaShoppingCart } from "react-icons/fa";
import styles from "../styles/Cart.module.css";
import { useCart } from "../hooks/use-cart";
import Image from "next/image";

import Table from "../components/Table";
import products from "../products.json";

const columns = [
  {
    columnId: "title",
    Header: "Product Name",
  },
  {
    columnId: "quantity",
    Header: "Quantity",
  },
  {
    columnId: "pricePerUnit",
    Header: "Price Per Item",
  },
  {
    columnId: "total",
    Header: "Item Total",
  },
];

export default function Cart() {
  const { cartItems, checkout, updateItem } = useCart();

  const data = cartItems.map((item) => {
    const product = products.find(({ id }) => id === item.id);

    const Quantity = () => {
      function handleOnSubmit(e) {
        e.preventDefault();
        const { currentTarget } = e; //form which has a list of nodes (not an array)
        const inputs = Array.from(currentTarget.elements);
        const quantity = inputs.find((input) => input.name === "quantity")
          ?.value;
        updateItem({
          id: item.id,
          quantity: quantity && parseInt(quantity),
        });
      }
      return (
        <form onSubmit={handleOnSubmit}>
          <input
            type="number"
            name="quantity"
            min={0}
            defaultValue={item.quantity}
          />
          <button>Update</button>
        </form>
      );
    };

    return {
      ...item,
      quantity: <Quantity />,
      total: item.quantity * item.pricePerItem,
      pricePerUnit: item.pricePerItem,
      title: product.title,
    };
  });
  /*  const data = [
    {
      id: "my-product",
      title: "My Cool Product",
      quantity: 1,
      pricePerUnit: 10.0,
      total: 10.0,
    },
  ];
 */
  return (
    <div className={styles.container}>
      <Head>
        <title>Shopping Cart - Space Jelly</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <FaShoppingCart /> Cart
        </h1>

        <Table className={styles.table} data={data} columns={columns} />

        <p className={styles.checkout}>
          <button className={styles.button} onClick={checkout}>
            Check Out
          </button>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
