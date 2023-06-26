import { Tab } from "@headlessui/react";
import React from "react";
import { Fragment } from "react";
const UiTab = () => {
  return (
    <Tab.Group>
      <Tab.List className="border-b">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`px-[30px] py-[5px] text-[18px] text-gray-600 ${
                selected ? "font-semibold border-b border-orange-500" : "font-regular"
              }`}
            >
              Description
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`px-[30px] py-[5px] text-[18px] mx-8 text-gray-600 ${
                selected ? "font-semibold border-b border-orange-500" : "font-regular"
              }`}
            >
              Style Guide
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="p-4">
        <Tab.Panel>
          <div>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using Content here, content
              here, making it look like readable English.
            </p>
          </div>
        </Tab.Panel>
        <Tab.Panel>
          <div></div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default UiTab;
