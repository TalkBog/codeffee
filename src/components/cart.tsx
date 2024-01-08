"use client";

import { FC, memo, useCallback, useState } from "react";
import {
  ProductCartLine,
  FormattedPrice,
  Button,
  NoticeMessageData,
  NoticeMessage,
} from "tp-kit/components";
import {
  removeLine,
  updateLine,
  computeCartTotal,
  useCart,
  clearCart,
} from "../hooks/use-cart";
import { createOrder } from "../actions/create-order";

type Props = {};

const Cart: FC<Props> = memo(function () {
  const lines = useCart((cart) => cart.lines);
  const wrapperClasses = "bg-white rounded-lg p-6 shadow-xl space-y-12";
  const [notices, setNotices] = useState<NoticeMessageData[]>([]);

  function addError() {
    setNotices((n) => [
      ...n,
      {
        type: "error",
        message: "Veuillez vous connecter pour passer commande",
      },
    ]);
  }

  function removeNotice(index: number) {
    setNotices((n) => {
      delete n[index];
      return Object.values(n);
    });
  }

  const handleCreateOrder = useCallback(async () => {
    const { error, success } = await createOrder(useCart.getState());
    if (success) {
      clearCart();
    } else {
      addError();
    }
  }, []);

  if (lines.length === 0)
    return (
      <div className={wrapperClasses}>
        <p className="my-12 text-center text-sm text-gray-600">
          Votre panier est vide
        </p>
      </div>
    );

  return (
    <div className={wrapperClasses}>
      <h2 className="text-sm font-bold uppercase tracking-wide">Mon panier</h2>
      {notices.map((notice, i) => (
        <NoticeMessage key={i} {...notice} onDismiss={() => removeNotice(i)} />
      ))}
      <div className="space-y-4">
        {lines.map(({ product, qty }) => (
          <ProductCartLine
            key={product.id}
            product={product}
            qty={qty}
            onDelete={() => removeLine(product.id)}
            onQtyChange={(qty) => updateLine({ product, qty })}
          />
        ))}
      </div>

      <table className="w-full">
        <tbody>
          <tr>
            <th className="text-left">Total</th>
            <td className="text-right font-bold">
              <FormattedPrice price={computeCartTotal(lines)} />
            </td>
          </tr>
        </tbody>
      </table>

      <Button fullWidth size="lg" onClick={handleCreateOrder}>
        Commander
      </Button>
    </div>
  );
});

Cart.displayName = "Cart";
export { Cart };
