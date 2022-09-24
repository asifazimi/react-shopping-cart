import { useShoppingCart } from "../context/ShoppingCartContext";
import { items } from "../data/Items";
import { Stack, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
  i: object;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeCartFrom } = useShoppingCart();
  const item = items.find((i: CartItemProps) => i.id === id);
  const { name, imgUrl, price } = item;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={imgUrl}
        alt="item"
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: "0.65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: "0.75rem" }}>
          {formatCurrency(price)}
        </div>
      </div>
      <div>{formatCurrency(price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeCartFrom(id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
