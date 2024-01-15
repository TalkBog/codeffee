"use client";

import { FC, memo, Fragment, use } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuBar, Button } from "tp-kit/components";
import { ShoppingBag, X, User } from "@phosphor-icons/react";
import { Cart } from "./cart";
import { CartCounter } from "./cart-counter";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getUser } from "../utils/supabase";
import { connected } from "process";

type Props = {
  connected: boolean;
};

const Menu: FC<Props> = memo(function ({ connected }) {
  return (
    <MenuBar
      trailing={
        <div className="flex flex-row items-center justify-end gap-4">
          <Link href="/mon-compte">
            <Button
              variant="ghost"
              className="relative flex aspect-square h-[44px] w-[44px] items-center justify-center !rounded-full !p-0 text-3xl"
            >
              <User size="18" weight="bold" />
            </Button>
          </Link>
          {connected ? (
            <Popover as="div" className="flex justify-end">
              {({ open }) => (
                <>
                  <Popover.Button
                    as={Button}
                    variant={"ghost"}
                    className={
                      "relative flex aspect-square h-[44px] w-[44px] items-center justify-center !rounded-full !p-0 text-3xl"
                    }
                  >
                    {open ? (
                      <X size={18} weight="regular" />
                    ) : (
                      <ShoppingBag size={24} weight="regular" />
                    )}

                    <div className="absolute -right-1 -top-1 flex aspect-square h-[20px] w-[20px] items-center justify-center rounded-full bg-brand text-center text-xs text-white">
                      <div>
                        <CartCounter />
                      </div>
                    </div>
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-0 right-0 top-full z-10 mt-6 sm:left-auto sm:w-full sm:max-w-sm">
                      <Cart />
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          ) : (
            ""
          )}
        </div>
      }
    />
  );
});

Menu.displayName = "Menu";
export { Menu };
