import { Link, useLocation, useNavigate } from "react-router-dom";

const TransactionSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/transactions");
    return null;
  }

  const {
    customerName,
    totalItems,
    totalQuantity,
    subTotal,
    taxTotal,
    grandTotal,
    transactionId,
  } = state;

  return (
    <div id="main-container" className="flex flex-1">
  <div className="flex flex-1 items-center justify-center py-[60px]">
    <div className="flex flex-col w-[430px] shrink-0 rounded-2xl pt-9 p-[18px] gap-6 bg-white">
      <div className="flex flex-col items-center justify-center gap-5">
        <img
          src="/assets/images/icons/transaction-success.svg"
          className="flex size-[106px] shrink-0"
          alt="icon"
        />
        <p className="font-bold text-2xl text-center">
          Your transaction has been successfully created
        </p>
      </div>
      <div className="flex flex-col w-full items-center justify-between gap-5 rounded-2xl border border-monday-border p-4">
        <div className="flex w-full items-center justify-between">
          <p className="flex items-center gap-1 font-medium text-monday-gray">
            <img
              src="/assets/images/icons/user-thin-grey.svg"
              className="size-6 flex shrink-0"
              alt="icon"
            />
            <span>Customer Name</span>
          </p>
          <p className="font-semibold text-lg">{customerName}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="flex items-center gap-1 font-medium text-monday-gray">
            <img
              src="/assets/images/icons/shopping-cart-grey.svg"
              className="size-6 flex shrink-0"
              alt="icon"
            />
            <span>Total Items</span>
          </p>
          <p className="font-semibold text-lg">{totalItems} Item</p>
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
          <p className="font-semibold text-lg">{totalQuantity}x</p>
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
          <p className="font-semibold text-lg">Rp {subTotal.toLocaleString('id')}</p>
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
          <p className="font-semibold text-lg">Rp {taxTotal.toLocaleString('id')}</p>
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
          <p className="font-semibold text-xl text-monday-blue">Rp {grandTotal.toLocaleString('id')}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
      <Link to={`/transactions/details/${transactionId}`}
          className="btn btn-black font-semibold w-full rounded-full"
        >
          View Details
        </Link>
        <Link to={'/transactions'}
          className="btn btn-primary font-semibold w-full"
        >
          Back to Transaction
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default TransactionSuccess;
