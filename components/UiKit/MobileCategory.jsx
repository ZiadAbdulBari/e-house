import { Disclosure } from "@headlessui/react";
import React from "react";

const MobileCategory = () => {
  return (
    <div className="mb-[20px]">
      <Disclosure>
        {({ open }) => (
          <div>
            <Disclosure.Button className="flex justify-between w-[350px] sm:w-[450px] md:w-[700px] lg:w-[500px] xl:w-[616px] xxl:w-[700px] h-[44px] bg-[#18181C] px-[30px] md:pl-4 md:pr-[60px] lg:px-4 py-[12px] text-left text-sm font-medium">
              <span>{question}</span>
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                </svg>
              )}
            </Disclosure.Button>
            {open && (
              <hr className="border-t border-gray-500 w-[350px] sm:w-[450px] md:w-[660px] lg:w-[500px] xl:w-[616px] xxl:w-[700px]  px-4" />
            )}

            <Disclosure.Panel className="py-[2%] px-[30px] md:pl-4 md:pr-[65px] lg:px-4 text-sm bg-[#18181C] w-[350px] sm:w-[450px] md:w-[700px] lg:w-[500px] xl:w-[616px] xxl:w-[700px] text-gray-500">
              <span className="my-4">{answer}</span>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

export default MobileCategory;
