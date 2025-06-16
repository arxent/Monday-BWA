import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import StepOne from "./components/StepOne";
import StepTwo from "./components/StepTwo";
import StepThree from "./components/StepThree";
import UserProfileCard from "../../components/UserProfileCard";
import ProductModal from "./components/ProductModal";
import { Link } from "react-router-dom";

const AddTransaction = () => {
  const [step, setStep] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const steps = [
    {
      label: "Customer Detail",
      iconActive: "/assets/images/icons/tick-square-blue.svg",
      iconInactive: "/assets/images/icons/tick-square-grey.svg",
    },
    {
      label: "Assign Products",
      iconActive: "/assets/images/icons/tick-square-blue.svg",
      iconInactive: "/assets/images/icons/tick-square-grey.svg",
    },
    {
      label: "Review Transaction",
      iconActive: "/assets/images/icons/tick-square-blue.svg",
      iconInactive: "/assets/images/icons/tick-square-grey.svg",
    },
  ];

  const ProgressBar = ({ step }: { step: number }) => {
    return (
      <div className="flex justify-between relative w-full h-[127px] rounded-3xl p-[18px] bg-white">
        {steps.map((item, index) => {
          const isDone = step > index + 1;
          const isActive = step === index + 1;
          // const isFuture = step < index + 1;
  
          return (
            <div
              key={index}
              className="relative flex flex-col gap-3 items-center text-center w-full"
            >
              <img
                src={
                  isDone
                    ? "/assets/images/icons/tick-square-checked-blue.svg"
                    : isActive
                    ? item.iconActive
                    : item.iconInactive
                }
                className="size-8"
                alt="icon"
              />
  
              <div className="flex flex-col gap-1">
                <p className="font-medium text-monday-gray">
                  Step {index + 1}
                </p>
                <p className="font-semibold text-lg">{item.label}</p>
              </div>
  
              {/* Render line to next step */}
              {index < steps.length && (
                <div className="absolute top-[34px] right-[-50%] h-[3px] w-full">
                  <img
                    src={
                      isDone
                        ? "/assets/images/icons/Line-blue.svg"
                        : isActive
                        ? "/assets/images/icons/line-half-blue.svg"
                        : "/assets/images/icons/Line-grey.svg"
                    }
                    className="size-full object-cover"
                    alt="line"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };
  

  return (
    <>
    <div id="main-container" className="flex flex-1">
      <Sidebar />
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        <div
          id="Top-Bar"
          className="flex items-center w-full gap-6 mt-[30px] mb-6"
        >
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Add New Transaction</h1>
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
          <UserProfileCard />
        </div>

        <main className="flex flex-col gap-6 flex-1">
          <ProgressBar step={step} />

          {step === 1 && <StepOne handleNextStep={() => setStep(2)} />}
           
          {step === 2 && (
  <StepTwo
    handleNextStep={() => setStep(3)}
    handlePrevStep={() => setStep(1)}
    handleOpenModal={() => setIsModalOpen(true)} // tambahan ini
  />
)}
          {step === 3 && <StepThree handlePrevStep={() => setStep(2)} />}
        </main>
      </div>
    </div>

<ProductModal
isOpen={isModalOpen}
onClose={() => setIsModalOpen(false)}
/>
    </>
  );
};

export default AddTransaction;
