import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../hooks/use-cart";
import styles from "./Nav.module.css";
import Link from "next/link";

const Nav = () => {
  const { subTotal, checkout } = useCart();
  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>Space Jelly Shop</p>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a>
            <FaShoppingCart /> £{subTotal}
          </a>
        </Link>
      </p>
    </nav>
  );
};

export default Nav;
