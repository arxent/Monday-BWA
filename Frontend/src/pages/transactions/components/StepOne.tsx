import { useTransaction } from "../../../context/TransactionContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { transactionSchema } from "../../../schemas/transactionSchema";
import { CustomerFormData } from "../../../types/types";
import { Link } from "react-router-dom";
import { useMyMerchantProfile } from "../../../hooks/useMerchants";


const StepOne = ({ handleNextStep }: { handleNextStep: () => void }) => {
  const { transaction, setTransaction } = useTransaction();
  const { data: merchant } = useMyMerchantProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(transactionSchema), // ✅ Use Zod validation
    defaultValues: {
      name: transaction.name,
      phone: transaction.phone,
    },
  });

  // ✅ Handle form submission
  const onSubmit = (data: CustomerFormData) => {
    setTransaction({ ...transaction, ...data });
    handleNextStep(); // Proceed to next step only if valid
  };

  return (
    <div className="flex gap-6">
        <form onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full rounded-3xl p-[18px] gap-5 bg-white"
        >
          <h2 className="font-semibold text-xl">Customer Informations</h2>
          <label className="group relative">
            <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
              <img
                src="/assets/images/icons/user-thin-grey.svg"
                className="flex size-6 shrink-0"
                alt="icon"
              />
            </div>
            <p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
              Customer Name
            </p>
            <input
              type="text"
              {...register("name")}
              className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300"
              placeholder=""
            />
          </label> 
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <label className="group relative">
            <div className="flex items-center pr-4 absolute transform -translate-y-1/2 top-1/2 left-6 border-r-[1.5px] border-monday-border ">
              <img
                src="/assets/images/icons/call-grey.svg"
                className="flex size-6 shrink-0"
                alt="icon"
              />
            </div>
            <p className="placeholder font-medium text-monday-gray text-sm absolute -translate-y-1/2 left-[81px] top-[25px] group-has-[:placeholder-shown]:top-[36px] group-focus-within:top-[25px] transition-300">
              Phone Number
            </p>
            <input
              type="text"
              {...register("phone")}
              className="appearance-none w-full h-[72px] font-semibold text-lg rounded-3xl border-[1.5px] border-monday-border pl-20 pr-6 pb-[14.5px] pt-[34.5px] placeholder-shown:pt-[14.5px] focus:border-monday-black transition-300"
              placeholder=""
            />
          </label>
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}


          <div className="flex items-center justify-end gap-4">
            <Link to={'/transactions'} className="btn btn-red font-semibold">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary font-semibold">
              Continue
            </button>
          </div>
        </form>
        <div className="flex w-[392px] shrink-0 h-fit rounded-3xl p-[18px] gap-3 bg-white">
          <div className="flex size-16 rounded-2xl bg-monday-background items-center justify-center overflow-hidden">
            <img
              src={merchant?.photo}
              className="size-full object-contain"
              alt="icon"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <p className="font-semibold text-xl">{merchant?.name}</p>
            <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
              <img
                src="/assets/images/icons/call-grey.svg"
                className="size-6 flex shrink-0"
                alt="icon"
              />
              <span>{merchant?.phone}</span>
            </p>
          </div>
        </div>
      </div>
  );
};

export default StepOne;
