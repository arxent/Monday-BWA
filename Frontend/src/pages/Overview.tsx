import { useState } from "react";
import { useFetchAllTransactions } from "../hooks/useTransactions"; 
import { useFetchProduct } from "../hooks/useProducts"; 
import Sidebar from "../components/Sidebar";
import UserProfileCard from "../components/UserProfileCard";

const Overview = () => { 

  const { data: transactions, isPending } = useFetchAllTransactions();

  const [openTransactionIds, setOpenTransactionIds] = useState<number[]>([]);

  const toggleAccordion = (id: number) => {
    setOpenTransactionIds((prev) =>
      prev.includes(id) ? prev.filter((openId) => openId !== id) : [...prev, id]
    );
  };

  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const { data: selectedProduct } = useFetchProduct(selectedProductId || 0);

  if (!transactions) return <p> transactions notfound...</p>;

  const totalRevenue =
    transactions.reduce((sum, tx) => sum + tx.grand_total, 0) ?? 0;

  const totalProductsSold =
    transactions.reduce(
      (sum, tx) =>
        sum + tx.transaction_products.reduce((acc, p) => acc + p.quantity, 0),
      0
    ) ?? 0; 

  if (isPending) return <p>Loading data...</p>;

  return (
    <>
      <div id="main-container" className="flex flex-1">
        <Sidebar/>
        <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
          <div
            id="Top-Bar"
            className="flex items-center w-full gap-6 mt-[30px] mb-6"
          >
            <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
              <div className="flex flex-col gap-[6px] w-full">
                <h1 className="font-bold text-2xl">Overview</h1>
              </div>
              <div className="flex items-center flex-nowrap gap-3">
                <a href="#">
                  <div className="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
                    <img
                      src="assets/images/icons/search-normal-black.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </div>
                </a>
                <a href="#">
                  <div className="flex size-14 rounded-full bg-monday-gray-background items-center justify-center overflow-hidden">
                    <img
                      src="assets/images/icons/notification-black.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </div>
                </a>
                <div className="relative w-fit">
                  <div className="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden">
                    <img
                      src="assets/images/icons/crown-black-fill.svg"
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
            <section className="grid grid-cols-3 gap-6">
              <div
                id="Total-Revenue"
                className="flex flex-col rounded-3xl p-[18px] gap-5 bg-white"
              >
                <div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                  <img
                    src="assets/images/icons/wallet-blue-fill.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <p className="font-semibold text-[32px]">
                    Rp {totalRevenue.toLocaleString("id")}
                  </p>
                  <p className="font-medium text-lg text-monday-gray">
                    Total Revenue
                  </p>
                </div>
              </div>
              <div
                id="Total-Transactions"
                className="flex flex-col rounded-3xl p-[18px] gap-5 bg-white"
              >
                <div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                  <img
                    src="assets/images/icons/document-text-blue-fill.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <p className="font-semibold text-[32px]">
                    {transactions.length.toLocaleString("id") || 0}
                  </p>
                  <p className="font-medium text-lg text-monday-gray">
                    Total Transactions
                  </p>
                </div>
              </div>
              <div
                id="Products-Sold"
                className="flex flex-col rounded-3xl p-[18px] gap-5 bg-white"
              >
                <div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                  <img
                    src="assets/images/icons/bag-blue-fill.svg"
                    className="size-6"
                    alt="icon"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <p className="font-semibold text-[32px]">
                    {totalProductsSold.toLocaleString("id") || 0}
                  </p>
                  <p className="font-medium text-lg text-monday-gray">
                    Products Sold
                  </p>
                </div>
              </div>
            </section>
            <div className="flex gap-6 flex-1">
              <section className="flex flex-col gap-6 w-[262px] shrink-0">
                <div className="flex flex-col rounded-3xl p-[18px] gap-9 blue-gradient">
                  <div className="relative w-fit">
                    <div className="flex size-14 rounded-full bg-monday-lime-green items-center justify-center overflow-hidden">
                      <img
                        src="assets/images/icons/crown-black-fill.svg"
                        className="size-6"
                        alt="icon"
                      />
                    </div>
                    <p className="absolute transform -translate-x-1/2 left-1/2 -bottom-2 rounded-[20px] py-1 px-2 bg-monday-black text-white w-fit font-extrabold text-[8px]">
                      PRO
                    </p>
                  </div>
                  <div className="flex flex-col gap-[18px]">
                    <div className="flex flex-col gap-[6px]">
                      <p className="font-medium text-monday-lime-green-char">
                        — Access Pro Featured
                      </p>
                      <p className="font-extrabold text-2xl text-white">
                        Track, Manage, and Distribute Stock Easily! 🎯
                      </p>
                    </div>
                    <a
                      href="#"
                      className="flex items-center justify-between rounded-2xl p-4 gap-[10px] bg-white"
                    >
                      <p className="font-semibold">Upgrade Now</p>
                      <img
                        src="assets/images/icons/arrow-right-black.svg"
                        className="flex size-6 shrink-0"
                        alt="icon"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex flex-col rounded-3xl p-[18px] gap-9 bg-white">
                  <div className="flex size-14 rounded-full bg-monday-blue/10 items-center justify-center">
                    <img
                      src="assets/images/icons/receive-square-blue-fill.svg"
                      className="size-6"
                      alt="icon"
                    />
                  </div>
                  <div className="flex flex-col gap-[18px]">
                    <div className="flex flex-col gap-[6px]">
                      <p className="font-medium text-monday-blue">
                        — Download Report
                      </p>
                      <p className="font-bold text-2xl">
                        Download Your Sales Summary Instantly
                      </p>
                    </div>
                    <a
                      href="#"
                      className="flex items-center justify-between rounded-2xl p-4 gap-[10px] bg-monday-blue/10"
                    >
                      <p className="font-semibold text-monday-blue">
                        Download Now
                      </p>
                      <img
                        src="assets/images/icons/arrow-right-blue.svg"
                        className="flex size-6 shrink-0"
                        alt="icon"
                      />
                    </a>
                  </div>
                </div>
              </section>
              <section
                id="Lastest-Transaction"
                className="flex flex-col gap-5 flex-1 rounded-3xl p-[18px] bg-white"
              >
                <h2 className="font-bold text-xl">Lastest Transaction</h2>

                {transactions.length > 0 ? (
                  transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="card-merchant flex flex-col rounded-2xl border border-monday-border"
                    >
                      <div className="flex items-center justify-between p-4 gap-3 pb-5">
                        <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                          <img
                            src="assets/images/icons/user-thin-grey.svg"
                            className="flex size-[42px] shrink-0"
                            alt="icon"
                          />
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                          <p className="font-semibold text-xl">{tx.name}</p>
                          <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
                            <img
                              src="assets/images/icons/call-grey.svg"
                              className="size-6 flex shrink-0"
                              alt="icon"
                            />
                            <span>{tx.phone}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-[6px]">
                          <img
                            src="assets/images/icons/shop-black.svg"
                            className="size-6 flex shrink-0"
                            alt="icon"
                          />
                          <p className="font-semibold text-lg text-nowrap">
                            {tx.merchant.name}
                          </p>
                        </div>
                      </div>
                      <hr className="border-monday-border" />
                      <div className="flex flex-col px-4 gap-5 py-5">
                        <button
                          onClick={() => toggleAccordion(tx.id)}
                          className="flex items-center justify-between"
                        >
                          <p className="font-semibold text-lg">
                            Product Assigned ({tx.transaction_products.length})
                          </p>
                          <img
                            src="assets/images/icons/arrow-circle-up.svg"
                            className={`size-6 flex shrink-0 transition-300 ${
                              openTransactionIds.includes(tx.id)
                                ? "rotate-180"
                                : ""
                            }`}
                            alt="icon"
                          />
                        </button>

                        {openTransactionIds.includes(tx.id) && (
                          <div className="flex flex-col gap-5">
                            {tx.transaction_products.map((tp) => (
                              <div key={tp.id}>
                                <div className="card flex items-center justify-between gap-3">
                                  <div className="flex items-center gap-3 w-full">
                                    <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                                      <img
                                        src={tp.product.thumbnail}
                                        className="size-full object-contain"
                                        alt="icon"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                      <p className="font-semibold text-xl line-clamp-1">
                                        {tp.product.name}
                                      </p>
                                      <p className="font-semibold text-xl text-monday-blue">
                                        Rp {tp.price.toLocaleString("id")}
                                        <span className="text-monday-gray">
                                          ({tp.quantity.toLocaleString("id")}
                                          x)
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-[6px] w-full">
                                    <img
                                      src="assets/images/icons/Makeup-black.svg"
                                      className="size-6 flex shrink-0"
                                      alt="icon"
                                    />
                                    <p className="font-semibold text-lg text-nowrap">
                                      {tp.product.category.name}
                                    </p>
                                  </div>

                                  <button
                                    onClick={() => {
                                      setSelectedProductId(tp.product.id);
                                    }}
                                    className="btn btn-primary-opacity min-w-[130px] font-semibold"
                                  >
                                    Details
                                  </button>
                                </div>
                                <hr className="border-monday-border last:hidden" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <hr className="border-monday-border" />
                      <div className="flex items-center justify-between px-4 py-5">
                        <p className="flex items-center gap-1 font-semibold text-lg text-monday-gray">
                          <img
                            src="assets/images/icons/money-grey.svg"
                            className="size-6 flex shrink-0"
                            alt="icon"
                          />
                          Grandtotal:
                        </p>
                        <p className="font-semibold text-xl text-monday-blue">
                          Rp {tx.grand_total.toLocaleString("id")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    id="Empty-State"
                    className=" flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
                  >
                    <img
                      src="assets/images/icons/document-text-grey.svg"
                      className="size-[52px]"
                      alt="icon"
                    />
                    <p className="font-semibold text-monday-gray">
                      Oops, it looks like there's no data yet.
                    </p>
                  </div>
                )}
              </section>
            </div>
          </main>
        </div>
      </div>

      {selectedProductId && selectedProduct && (
        <div className="modal flex flex-1 items-center justify-center h-full fixed top-0 w-full">
          <div
            onClick={() => setSelectedProductId(null)}
            className="absolute w-full h-full bg-[#292D32B2] cursor-pointer"
          />
          <div className="relative flex flex-col w-[406px] shrink-0 rounded-3xl p-[18px] gap-5 bg-white">
            <div className="modal-header flex items-center justify-between">
              <p className="font-semibold text-xl">Product Details</p>
              <button
                onClick={() => setSelectedProductId(null)}
                className="flex size-14 rounded-full items-center justify-center bg-monday-gray-background"
              >
                <img
                  src="assets/images/icons/close-circle-black.svg"
                  className="size-6"
                  alt="icon"
                />
              </button>
            </div>
            <div className="modal-content flex flex-col rounded-3xl border border-monday-border p-4 gap-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                  <p className="flex items-center gap-[6px] font-semibold text-lg">
                    <img
                      src={selectedProduct.category.photo}
                      className="size-6 flex shrink-0"
                      alt="icon"
                    />
                    {selectedProduct.name}
                  </p>
                  <p className="font-bold text-lg">
                    {selectedProduct.category.name}
                  </p>
                  <p className="font-semibold text-[17px] text-monday-blue">
                    Rp {selectedProduct.price.toLocaleString("id")}
                  </p>
                </div>
                <div className="flex size-[100px] rounded-2xl bg-monday-gray-background items-center justify-center overflow-hidden">
                  <img
                    src={selectedProduct.thumbnail}
                    className="size-full object-contain"
                    alt="icon"
                  />
                </div>
              </div>
              <hr className="border-monday-border" />
              <div>
                <p className="font-medium text-sm text-monday-gray">
                  Product About
                </p>
                <p className="font-semibold leading-[160%]">
                  {selectedProduct.about}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
