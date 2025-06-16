import { useState } from "react";
import { useTransaction } from "../../../context/TransactionContext";
import { useMyMerchantProfile } from "../../../hooks/useMerchants";

const ProductModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { cart, setCart } = useTransaction();

  const { data: merchant } = useMyMerchantProfile();

  const [selectedProducts, setSelectedProducts] = useState<{
    [key: number]: number;
  }>({});

  if (!isOpen) return null;

  const updateQuantity = (productId: number, delta: number) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }));
  };

  const handleAddToCart = () => {
    const updatedCart = [...cart];

    Object.entries(selectedProducts).forEach(([productId, quantity]) => {
      const mp = merchant?.products.find((mp) => mp.id === Number(productId));

      const product = mp;

      if (product) {
        const existing = updatedCart.find((item) => item.id === product.id);

        const sub_total = product.price * quantity;

        if (existing) {
          existing.quantity += quantity;
          existing.sub_total = existing.price * existing.quantity;
        } else {
          // updatedCart.push({ ...product, quantity, sub_total });
          updatedCart.push({
            id: product.id,
            name: product.name,
            category: product.category.name,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity,
            sub_total,
          });
        }
      }
    });

    setCart(updatedCart);
    onClose();
  };

  return (
    <div
      id="Assign-Products-Modal"
      className="modal flex flex-1 items-center justify-center h-full fixed top w-full py-10"
    >
      <div
        data-close-modal=""
        className="backdrop absolute w-full h-full bg-[#292D32B2]"
      />
      <div className="relative flex flex-col flex-1 w-full max-w-[1200px] h-full max-h-[752px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
        <div className="modal-header flex items-center justify-between">
          <p className="font-semibold text-xl">Assign Products</p>
          <button
            data-close-modal=""
            className="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
          >
            <img
              src="/assets/images/icons/close-circle-black.svg"
              className="size-6"
              alt="icon"
            />
          </button>
        </div>
        <div className="modal-content flex flex-1 overflow-y-auto overscroll-contain hide-scrollbar">
          <div className="flex flex-col gap-5 w-full">

          {merchant?.products.map((product) => {
            const quantity = selectedProducts[product.id] || 1;
            const subTotal = quantity * product.price;

            return (
            <div key={product.id}
              className="card-assign flex flex-col rounded-3xl border border-monday-border p-4 gap-5"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3 w-[270px] shrink-0">
                  <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                    <img
                      src={product.thumbnail}
                      className="size-full object-contain"
                      alt="icon"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <p className="font-semibold text-xl w-[172px] truncate">
                      {product.name}
                    </p>
                    <p className="price font-semibold text-xl text-monday-blue">
                      Rp {product.price.toLocaleString('id')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img
                    src={product.category.photo}
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-lg text-nowrap w-[124px] truncate">
                    {product.category.name}
                  </p>
                </div>
                <div className="flex items-center gap-[6px] w-[154px] shrink-0">
                  <img
                    src="/assets/images/icons/box-black.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p className="stock font-semibold text-lg text-nowrap w-[124px] truncate">
                  {product.pivot?.stock ?? 0} Stock
                  </p>
                </div>
                <div className="flex items-center rounded-2xl p-4 gap-3 bg-monday-blue/10 text-monday-blue">
                  <button onClick={() => updateQuantity(product.id, -1)} type="button" className="minus flex size-6 shrink-0">
                    <img
                      src="/assets/images/icons/minus-square-blue.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </button>
                  <p className="amount min-w-12 font-medium text-[22px] text-center">
                  {selectedProducts[product.id] || 1}
                  </p>
                  <button onClick={() => updateQuantity(product.id, 1)} type="button" className="plus flex size-6 shrink-0">
                    <img
                      src="/assets/images/icons/add-square-blue-fill.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </button>
                </div>
              </div>
              <hr className="border-monday-border" />
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-1 font-semibold text-monday-gray">
                  <img
                    src="/assets/images/icons/money-grey.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  Subtotal:
                </p>
                <p className="subtotal font-semibold text-xl text-monday-blue">
                  Rp {subTotal.toLocaleString('id')}
                </p>
              </div>
            </div>
            );
            })}

          </div>
          <div
            id="Empty-State"
            className="hidden flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
          >
            <img
              src="/assets/images/icons/document-text-grey.svg"
              className="size-[52px]"
              alt="icon"
            />
            <p className="font-semibold text-monday-gray">
              Oops, it looks like there's no data yet.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4"> 

          <button onClick={onClose} className="btn btn-red font-semibold">
            Cancel
          </button>
          <button onClick={handleAddToCart} type="submit" className="btn btn-primary font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
