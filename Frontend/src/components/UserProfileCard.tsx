// components/UserProfileCard.tsx
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UserProfileCard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex items-center gap-3 h-[92px] bg-white w-fit rounded-3xl p-[18px]">
      <div className="flex rounded-full overflow-hidden size-14">
        <img src={user?.photo} className="size-full object-cover" alt="photo" />
      </div>
      <div className="flex flex-col gap-1 min-w-[120px] max-w-[160px] w-fit">
        <p className="font-semibold">{user?.name}</p>
        <p className="flex items-center gap-1 font-medium text-monday-gray">
          <img
            src={"/assets/images/icons/user-grey.svg"}
            className="size-4"
            alt="icon"
          />
          {user?.roles}
        </p>
      </div>
      <button onClick={handleLogout} className="flex w-6">
        <img
          src="/assets/images/icons/logout.svg"
          className="flex size-6 shrink-0"
          alt="logout"
        />
      </button>
    </div>
  );
};

export default UserProfileCard;
