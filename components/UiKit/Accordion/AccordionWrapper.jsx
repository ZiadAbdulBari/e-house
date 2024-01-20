import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import React from "react";

const AccordionWrapper = ({ children, id, title }) => {
  return (
    <div className="w-full mb-[20px]">
      <Disclosure>
        {({ open }) => (
          <div>
            <Disclosure.Button className="flex w-full justify-between items-center px-[10px] py-2 text-[16px] text-color-1 focus:outline-none focus-visible:none ">
              <Link href={`/category/${encodeURIComponent(id)}`}>{title}</Link>
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-gray-300"
                >
                  <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  className="fill-gray-300"
                >
                  <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                </svg>
              )}
            </Disclosure.Button>
            {children}
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default AccordionWrapper;
