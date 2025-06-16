import React from "react";
import { useTransaction } from "../../../context/TransactionContext";

const StepTwo = ({
  handleNextStep,
  handlePrevStep,
  handleOpenModal,
}: {
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleOpenModal: () => void; // tambahin ini
}) => {
  const { cart, setCart } = useTransaction(); 
  
  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  return (
    <>
      <section
        id="Products"
        className="flex flex-col flex-1 gap-6 rounded-3xl p-[18px] px-0 bg-white"
      >
        <div
          id="Header"
          className="flex items-center justify-between px-[18px]"
        >
          <div className="flex flex-col gap-[6px]">
            <p className="flex items-center gap-[6px]">
              <img
                src="/assets/images/icons/shopping-cart-black.svg"
                className="size-6 flex shrink-0"
                alt="icon"
              />
              <span className="font-semibold text-2xl">{cart.length} Total Items</span>
            </p>
            <p className="font-semibold text-lg text-monday-gray">
              Manage Your Product Assigned
            </p>
          </div>

          <button
            onClick={handleOpenModal}
            className="btn btn-primary font-semibold"
          >
            Assign Product
            <img
              src="/assets/images/icons/add-square-white.svg"
              className="flex size-6 shrink-0"
              alt="icon"
            />
          </button>
        </div>
        <hr className="border-monday-border" />
        <div id="Product-List" className="flex flex-col px-4 gap-5 flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-xl">Product Assigned</p>
          </div>

          {cart.length > 0 ? (
            <div className="flex flex-col gap-5">
              {cart.map((product, index) => (
                <React.Fragment key={index}>
                  <div className="card flex items-center justify-between gap-6">
                    <div className="flex items-center gap-3 w-[340px] shrink-0">
                      <div className="flex size-[86px] rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
                        <img
                          src={product.thumbnail}
                          className="size-full object-contain"
                          alt="icon"
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <p className="font-semibold text-xl w-[242px] truncate">
                          {product.name}
                        </p>
                        <p className="font-semibold text-xl text-monday-blue">
                          Rp {product.price.toLocaleString('id')}
                          <span className="text-monday-gray">({product.quantity}x)</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-[6px] w-[187px] shrink-0">
                      <img
                        src="/assets/images/icons/Makeup-black.svg"
                        className="size-6 flex shrink-0"
                        alt="icon"
                      />
                      <p className="font-semibold text-lg text-nowrap w-[124px] truncate">
                        {product.category}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 w-[187px] shrink-0">
                      <p className="flex items-center gap-1 font-medium text-monday-gray">
                        <img
                          src="/assets/images/icons/money-grey.svg"
                          className="size-4 flex shrink-0"
                          alt="icon"
                        />
                        Subtotal
                      </p>
                      <p className="font-semibold text-xl text-monday-blue">
                        Rp {(product.quantity * product.price).toLocaleString('id')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => removeFromCart(index)} className="btn bg-monday-red/10 rounded-2xl text-monday-red w-[146px] font-semibold">
                        <img
                          src="/assets/images/icons/trash-red.svg"
                          className="size-6"
                          alt="icon"
                        />
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr className="border-monday-border" />
                </React.Fragment>
              ))}
            </div>
          ) : (
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
          )}

          <div className="flex items-center justify-end gap-4 mt-auto">
            <button onClick={handlePrevStep} 
              className="btn btn-red font-semibold"
            >
              Cancel
            </button> 
            <button onClick={handleNextStep}
              className="btn btn-primary font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default StepTwo;
