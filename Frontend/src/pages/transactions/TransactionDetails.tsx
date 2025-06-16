import { Link, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useFetchTransaction } from "../../hooks/useTransactions";
import UserProfileCard from "../../components/UserProfileCard";
import { useMyMerchantProfile } from "../../hooks/useMerchants";

const TransactionDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get transaction ID from URL
  const { data: transaction, isPending, error } = useFetchTransaction(Number(id));
  const { data: merchant } = useMyMerchantProfile();

  if (!merchant) return <p>no merchant</p>;
  if (isPending) return <p>Loading transaction details...</p>;
  if (error || !transaction) return <p>Transaction not found</p>;

  return (
    <div id="main-container" className="flex flex-1">
  <Sidebar/>
  <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
    <div id="Top-Bar" className="flex items-center w-full gap-6 mt-[30px] mb-6">
      <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
        <div className="flex flex-col gap-[6px] w-full">
          <h1 className="font-bold text-2xl">Transaction Details</h1>
          <Link to={'/transactions'}
            className="flex items-center gap-[6px] text-monday-gray font-semibold"
          >
            <img
              src="/assets/images/icons/arrow-left-grey.svg"
              className="size-4 flex shrink-0"
              alt="icon"
            />
            Manage Transactions
          </Link>
        </div>
        <div className="flex items-center flex-nowrap gap-3">
          <a href="#">
            <div className="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
              <img
                src="/assets/images/icons/search-normal-black.svg"
                className="size-6"
                alt="icon"
              />
            </div>
          </a>
          <a href="#">
            <div className="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
              <img
                src="/assets/images/icons/notification-black.svg"
                className="size-6"
                alt="icon"
              />
            </div>
          </a>
          <div className="relative w-fit">
            <div className="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden">
              <img
                src="/assets/images/icons/crown-black-fill.svg"
                className="size-6"
                alt="icon"
              />
            </div>
            <p className="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]">
              PRO
            </p>
          </div>
        </div>
      </div>
      <UserProfileCard/>
    </div>
    <main className="flex flex-col gap-6 flex-1">
      <section
        id="Merchant-Info"
        className="flex items-center justify-between rounded-3xl p-[18px] gap-3 bg-white"
      >
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
        <div className="flex flex-col gap-2 flex-1">
          <p className="flex items-center gap-1 font-medium text-monday-gray">
            <img
              src="/assets/images/icons/user-grey.svg"
              className="size-4 flex shrink-0"
              alt="icon"
            />
            <span>Keeper Name:</span>
          </p>
          <p className="font-semibold text-lg">{merchant.keeper.name} (You)</p>
        </div>
      </section>
      <section
        id="Products"
        className="flex flex-col gap-6 rounded-3xl p-[18px] px-0"
      >
        <div className="flex gap-6">
          <div className="flex flex-col w-full h-fit rounded-3xl p-[18px] gap-5 bg-white">
            <p className="font-semibold text-xl">Product Purchased</p>

            {transaction.transaction_products.map((item) => (
            <div className="card flex flex-col w-full rounded-3xl border border-monday-border p-4 gap-5">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-3 w-[316px] shrink-0">
                  <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                    <img
                      src={item.product.thumbnail}
                      className="size-full object-contain"
                      alt="icon"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <p className="font-semibold text-xl w-[218px] truncate">
                      {item.product.name}
                    </p>
                    <p className="price font-semibold text-xl text-monday-blue">
                      Rp {item.price.toLocaleString('id')} <span className="text-monday-gray">({item.quantity}x)</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[6px] w-fit shrink-0">
                  <img
                    src="/assets/images/icons/Makeup-black.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <p className="font-semibold text-lg text-nowrap">{item.product.category.name}</p>
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
                  Rp {item.sub_total.toLocaleString('id')}
                </p>
              </div>
            </div>
            ))}

          </div>
          <div className="flex flex-col gap-6 w-[392px] shrink-0">
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
                    <p className="font-semibold text-lg">{transaction.transaction_products.length} Item</p>
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
                    <p className="font-semibold text-lg">{transaction.transaction_products.reduce((acc, item) => acc + item.quantity, 0)}x</p>
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
                    <p className="font-semibold text-lg">Rp {transaction.sub_total.toLocaleString('id')}</p>
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
                    <p className="font-semibold text-lg">Rp {transaction.tax_total.toLocaleString('id')}</p>
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
                      Rp {transaction.grand_total.toLocaleString('id')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</div>

  );
};

export default TransactionDetails;
