import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);

  const toggleAccordion = (label: string) => {
    setOpenAccordions((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const userRoles = user?.roles || [];

  const sidebarMenus = [
    {
      section: "Main Menu",
      items: [
        {
          label: "Overview",
          path: "/overview",
          iconBlack: "/assets/images/icons/home-black.svg",
          iconBlue: "/assets/images/icons/home-blue-fill.svg",
          roles: ["manager"],
        },
        {
          label: "Overview",
          path: "/overview-merchant",
          iconBlack: "/assets/images/icons/home-black.svg",
          iconBlue: "/assets/images/icons/home-blue-fill.svg",
          roles: ["keeper"],
        },
        {
          label: "Products",
          path: "/products",
          iconBlack: "/assets/images/icons/bag-black.svg",
          iconBlue: "/assets/images/icons/bag-blue-fill.svg",
          roles: ["manager"],
        },
        {
          label: "Transactions",
          path: "/transactions",
          iconBlack: "/assets/images/icons/card-black.svg",
          iconBlue: "/assets/images/icons/card-blue-fill.svg",
          roles: ["keeper"],
        },
        {
          label: "Categories",
          path: "/categories",
          iconBlack: "/assets/images/icons/note-2-black.svg",
          iconBlue: "/assets/images/icons/note-2-blue-fill.svg",
          roles: ["manager"],
        },
        {
          label: "Warehouses",
          path: "/warehouses",
          iconBlack: "/assets/images/icons/buildings-2-black.svg",
          iconBlue: "/assets/images/icons/buildings-2-blue-fill.svg",
          roles: ["manager"],
        },
        {
          label: "Merchants",
          path: "/merchants",
          iconBlack: "/assets/images/icons/shop-black.svg",
          iconBlue: "/assets/images/icons/shop-blue-fill.svg",
          roles: ["manager"],
        },
        {
          label: "My Merchant",
          path: "/my-merchant",
          iconBlack: "/assets/images/icons/shop-black.svg",
          iconBlue: "/assets/images/icons/shop-blue-fill.svg",
          roles: ["keeper"],
        },
      ],
    },
    {
      section: "Account Settings",
      items: [
        {
          label: "Roles",
          path: "/roles",
          iconBlack: "/assets/images/icons/stickynote-black.svg",
          iconBlue: "/assets/images/icons/stickynote-blue-fill.svg",
          roles: ["manager"],
        },
        {
          label: "Manage Users",
          iconBlack: "/assets/images/icons/user-square-black.svg",
          iconBlue: "/assets/images/icons/user-square-black.svg",
          roles: ["manager"],
          children: [
            {
              label: "Users List",
              path: "/users",
              iconBlack: "/assets/images/icons/profile-2user-black.svg",
              iconBlue: "/assets/images/icons/profile-2user-blue-fill.svg",
            },
            {
              label: "Assign Role",
              path: "/users/assign-roles",
              iconBlack: "/assets/images/icons/profile-tick-black.svg",
              iconBlue: "/assets/images/icons/profile-tick-blue.svg",
            },
          ],
        }, 
        {
          label: "Settings",
          path: "/settings",
          iconBlack: "/assets/images/icons/setting-black.svg",
          iconBlue: "/assets/images/icons/setting-black.svg",
          roles: ["manager", "keeper"],
        },
      ],
    },
  ];

  return (
    <aside className="relative flex h-auto w-[280px] shrink-0 bg-white">
      <div className="flex flex-col fixed top-0 w-[280px] shrink-0 h-screen pt-[30px] px-4 gap-[30px]">
        <img
          src="/assets/images/logos/logo.svg"
          className="h-8 w-fit"
          alt="logo"
        />
        <div className="flex flex-col gap-5 overflow-y-scroll hide-scrollbar h-full overscroll-contain">
          {sidebarMenus.map((section) => {
            const visibleItems = section.items.filter((item) =>
              item.roles?.some((r) => userRoles.includes(r))
            );

            if (visibleItems.length === 0) return null;

            return (
              <nav key={section.section} className="flex flex-col gap-4">
                <p className="font-medium text-monday-gray">
                  {section.section}
                </p>
                <ul className="flex flex-col gap-2">
                  {visibleItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const isAccordion = !!item.children;

                    if (isAccordion) {
                      const isOpen = openAccordions.includes(item.label);
                      return (
                        <li key={item.label} className="group flex flex-col">
                          <button
                            onClick={() => toggleAccordion(item.label)}
                            className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 transition-300"
                          >
                            <div className="relative flex size-6 shrink-0">
                              <img
                                src={item.iconBlack}
                                className="size-6"
                                alt="icon"
                              />
                            </div>
                            <p className="font-medium w-full text-left">
                              {item.label}
                            </p>
                            <img
                              src="/assets/images/icons/arrow-circle-up.svg"
                              className={`size-6 transition-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                              alt="icon"
                            />
                          </button>
                          {isOpen && (
                            <div className="flex">
                              <div className="flex w-[56px] shrink-0 justify-end items-start">
                                <img
                                  src="/assets/images/icons/accordion-branch.svg"
                                  className="w-[28px]"
                                  alt="icon"
                                />
                              </div>
                              <ul className="flex flex-col gap-1 w-full">
                                {item.children.map((child) => {
                                  const isChildActive =
                                    location.pathname === child.path;
                                  return (
                                    <li
                                      key={child.label}
                                      className={`group ${
                                        isChildActive ? "active" : ""
                                      }`}
                                    >
                                      <Link
                                        to={child.path}
                                        className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 transition-300"
                                      >
                                        <div className="relative flex size-6 shrink-0">
                                          <img
                                            src={child.iconBlack}
                                            className={`size-6 absolute ${
                                              isChildActive
                                                ? "opacity-0"
                                                : "opacity-100"
                                            } transition-300`}
                                            alt="icon"
                                          />
                                          <img
                                            src={child.iconBlue}
                                            className={`size-6 absolute ${
                                              isChildActive
                                                ? "opacity-100"
                                                : "opacity-0"
                                            } transition-300`}
                                            alt="icon"
                                          />
                                        </div>
                                        <p
                                          className={`font-medium transition-300 w-full ${
                                            isChildActive
                                              ? "text-monday-blue"
                                              : ""
                                          }`}
                                        >
                                          {child.label}
                                        </p>
                                        <div
                                          className={`w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden ${
                                            isChildActive ? "flex" : ""
                                          } transition-300`}
                                        ></div>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </li>
                      );
                    }

                    return (
                      <li
                        key={item.label}
                        className={`group ${isActive ? "active" : ""}`}
                      >
                        <Link
                          to={item.path}
                          className="flex items-center w-full min-h-14 gap-2 rounded-2xl overflow-hidden py-[10px] pl-4 transition-300"
                        >
                          <div className="relative flex size-6 shrink-0">
                            <img
                              src={item.iconBlack}
                              className={`size-6 absolute ${
                                isActive ? "opacity-0" : "opacity-100"
                              } transition-300`}
                              alt="icon"
                            />
                            <img
                              src={item.iconBlue}
                              className={`size-6 absolute ${
                                isActive ? "opacity-100" : "opacity-0"
                              } transition-300`}
                              alt="icon"
                            />
                          </div>
                          <p
                            className={`font-medium transition-300 w-full ${
                              isActive ? "text-monday-blue" : ""
                            }`}
                          >
                            {item.label}
                          </p>
                          <div
                            className={`w-2 h-9 shrink-0 rounded-l-xl bg-monday-blue hidden ${
                              isActive ? "flex" : ""
                            } transition-300`}
                          ></div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
