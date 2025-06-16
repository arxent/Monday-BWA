import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useFetchUsers, useDeleteUser } from "../../hooks/useUsers";
import { User } from "../../types/types";
import UserProfileCard from "../../components/UserProfileCard";
import React from "react";

const UserList = () => {
  const { data: users, isPending } = useFetchUsers();
  const { mutate: deleteUser } = useDeleteUser();

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  if (!users) return <p>not found users...</p>;
  if (isPending) return <p>Loading users...</p>;

  return (
    <div id="main-container" className="flex flex-1">
      <Sidebar />
      <div id="Content" className="flex flex-col flex-1 p-6 pt-0">
        <div
          id="Top-Bar"
          className="flex items-center w-full gap-6 mt-[30px] mb-6"
        >
          <div className="flex items-center gap-6 h-[92px] bg-white w-full rounded-3xl p-[18px]">
            <div className="flex flex-col gap-[6px] w-full">
              <h1 className="font-bold text-2xl">Manage Users</h1>
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
          <UserProfileCard />
        </div>
        <main className="flex flex-col gap-6 flex-1">
          <section
            id="Products"
            className="flex flex-col gap-6 flex-1 rounded-3xl p-[18px] px-0 bg-white"
          >
            <div
              id="Header"
              className="flex items-center justify-between px-[18px]"
            >
              <div className="flex flex-col gap-[6px]">
                <p className="flex items-center gap-[6px]">
                  <img
                    src="assets/images/icons/profile-2user-black.svg"
                    className="size-6 flex shrink-0"
                    alt="icon"
                  />
                  <span className="font-semibold text-2xl">
                    {users.length} Total Users
                  </span>
                </p>
                <p className="font-semibold text-lg text-monday-gray">
                  View and update Total User list here.
                </p>
              </div>
              <Link to="/users/add" className="btn btn-primary font-semibold">
                Add New
                <img
                  src="assets/images/icons/add-square-white.svg"
                  className="flex sixe-6 shrink-0"
                  alt="icon"
                />
              </Link>
            </div>
            <hr className="border-monday-border" />
            <div id="Product-List" className="flex flex-col px-4 gap-5 flex-1">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-xl">All Users</p>
              </div>
              {users.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {users.map((user) => (
                    <React.Fragment key={user.id}>
                      <div className="card flex items-center justify-between gap-6">
                        <div className="flex items-center gap-3">
                          <div className="flex size-[76px] rounded-full bg-monday-background items-center justify-center overflow-hidden">
                            <img
                              src={user.photo}
                              className="size-full object-cover"
                              alt="icon"
                            />
                          </div>
                          <div className="flex flex-col gap-2 flex-1">
                            <p className="font-semibold text-xl">
                              {user.name}
                            </p>
                            <p className="flex items-center gap-1 font-medium text-lg text-monday-gray">
                              <img
                                src="assets/images/icons/call-grey.svg"
                                className="size-6 flex shrink-0"
                                alt="icon"
                              />
                              <span>{user.phone}</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 w-[226px] shrink-0">
                          <div className="flex size-[54px] rounded-2xl bg-monday-gray-background items-center justify-center">
                            <img
                              src="assets/images/icons/user-octagon-grey.svg"
                              className="flex size-6 shrink-0"
                              alt="icon"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="font-medium text-sm text-monday-gray">
                              User Role:
                            </p>
                            <p className="font-semibold text-lg text-nowrap">
                            {user.roles?.join(", ") || "No Role"}
                            </p>
                          </div>
                        </div>
                        <Link to={`/users/edit/${user.id}`}
                          className="btn btn-black min-w-[130px] font-semibold"
                        >
                          <img
                            src="assets/images/icons/edit-white.svg"
                            className="flex size-6 shrink-0"
                            alt="icon"
                          />
                          Edit
                        </Link>
                      </div>
                      <hr className="border-monday-border last:hidden" />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <div
                  id="Empty-State"
                  className="hidden flex flex-col flex-1 items-center justify-center rounded-[20px] border-dashed border-2 border-monday-gray gap-6"
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
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default UserList;
