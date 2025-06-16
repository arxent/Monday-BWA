import { useTransaction } from "../../../context/TransactionContext";
import { useMyMerchantProfile } from "../../../hooks/useMerchants";
import { useCreateTransaction } from "../../../hooks/useTransactions";

const StepThree = ({ handlePrevStep }: { handlePrevStep: () => void }) => {
  const { transaction, cart } = useTransaction();
  const { mutate: createTransaction, isPending } = useCreateTransaction(); // ✅ Destructured style
  const { data: merchant } = useMyMerchantProfile();
    
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const grandTotal = subtotal + tax;

  const onSubmit = () => {

    if (!merchant) return;

    const payload = {
      name: transaction.name,
      phone: transaction.phone,
      merchant_id: merchant.id,
      products: cart.map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      })),
    };

    createTransaction(payload);  
  };

  if (!merchant) return <p>Not found merchant details...</p>;


  return (
    <section
  id="Products"
  className="flex flex-col gap-6 rounded-3xl p-[18px] px-0"
>
  <div className="flex gap-6">
    <div className="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
      <p className="font-semibold text-xl">Review Transaction</p>

      {cart.length > 0 ? (
        cart.map((product) => (
      <div className="card flex flex-col w-full rounded-3xl border border-monday-border p-4 gap-5">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 w-[316px] shrink-0">
            <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
              <img
                src={product.thumbnail}
                className="size-full object-contain"
                alt="icon"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <p className="font-semibold text-xl w-[218px] truncate">
                {product.name}
              </p>
              <p className="price font-semibold text-xl text-monday-blue">
                Rp {product.price.toLocaleString('id')} <span className="text-monday-gray">({product.quantity}x)</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-[6px] w-fit shrink-0">
            <img
              src="/assets/images/icons/Makeup-black.svg"
              className="size-6 flex shrink-0"
              alt="icon"
            />
            <p className="font-semibold text-lg text-nowrap">{product.category}</p>
          </div>
        </div>
        <hr className="border-monday-border" />
        <div className="flex w-full items-center justify-between">
          <p className="flex items-center gap-1 font-medium text-monday-gray">
            <img
              src="/assets/images/icons/money-grey.svg"
              className="size-6 flex shrink-0"
              alt="icon"
            />
            Subtotal
          </p>
          <p className="subtotal font-semibold text-xl text-monday-blue">
            Rp {product.sub_total.toLocaleString('id')}
          </p>
        </div>
      </div>
        ))
      ) : (
        <p>no items added</p>
      )}

    </div>
    <div className="flex flex-col gap-6 w-[392px] shrink-0">
      <div className="flex w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
        <div className="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
          <img
            src={merchant.photo}
            className="size-full object-contain"
            alt="icon"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="font-semibold text-xl">{merchant.name}</p>
          <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
            <img
              src="/assets/images/icons/call-grey.svg"
              className="size-6 flex shrink-0"
              alt="icon"
            />
            <span>{merchant.phone}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
        <div className="flex flex-col gap-5">
          <p className="font-semibold text-lg">Customer Information</p>
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-monday-border p-4">
            <div className="flex flex-col gap-2 flex-1">
              <p className="font-semibold text-lg">{transaction.name}</p>
              <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
                <img
                  src="/assets/images/icons/call-grey.svg"
                  className="size-6 flex shrink-0"
                  alt="icon"
                />
                <span>{transaction.phone}</span>
              </p>
            </div>
            <div className="flex size-[56px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
              <img
                src="/assets/images/icons/user-thin-grey.svg"
                className="flex size-6 shrink-0"
                alt="icon"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-semibold text-lg">Payment Information</p>
          <div className="flex flex-col w-full items-center justify-between gap-5 rounded-2xl border border-monday-border p-4">
            <div className="flex w-full items-center justify-between">
              <p className="flex items-center gap-1 font-medium text-monday-gray">
                <img
                  src="/assets/images/icons/shopping-cart-grey.svg"
                  className="size-6 flex shrink-0"
                  alt="icon"
                />
                <span>Total Items</span>
              </p>
              <p className="font-semibold text-lg">3 Item</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="flex items-center gap-1 font-medium text-monday-gray">
                <img
                  src="/assets/images/icons/box-grey.svg"
                  className="size-6 flex shrink-0"
                  alt="icon"
                />
                <span>Total Quantity</span>
              </p>
              <p className="font-semibold text-lg">{(cart.reduce((sum, item) => sum + item.quantity, 0)).toLocaleString('id')}x</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="flex items-center gap-1 font-medium text-monday-gray">
                <img
                  src="/assets/images/icons/receipt-2-grey.svg"
                  className="size-6 flex shrink-0"
                  alt="icon"
                />
                <span>Subtotal</span>
              </p>
              <p className="font-semibold text-lg">Rp {subtotal.toLocaleString('id')}</p>
            </div>
            <div className="flex w-full items-center justify-between">
              <p className="flex items-center gap-1 font-medium text-monday-gray">
                <img
                  src="/assets/images/icons/note-text-grey.svg"
                  className="size-6 flex shrink-0"
                  alt="icon"
                />
                <span>PPN 10%</span>
              </p>
              <p className="font-semibold text-lg">Rp {tax.toLocaleString('id')}</p>
            </div>
            <hr className="border-monday-border w-full" />
            <div className="flex w-full items-center justify-between">
              <p className="flex items-center gap-1 font-medium text-monday-gray">
                <img
                  src="/assets/images/icons/moneys-grey.svg"
                  className="size-6 flex shrink-0"
                  alt="icon"
                />
                <span>Grand Total</span>
              </p>
              <p className="font-semibold text-xl text-monday-blue">
                Rp {grandTotal.toLocaleString('id')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
        <button onClick={handlePrevStep}
            className="btn btn-red font-semibold"
          >
            Cancel
          </button> 
          <button
          onClick={onSubmit}
            className="btn btn-primary font-semibold w-full"
          >
          {isPending ? "Saving..." : "Save Transaction"}

          </button> 
        </div>
      </div>
    </div>
  </div>
</section>

  );
};

export default StepThree;
