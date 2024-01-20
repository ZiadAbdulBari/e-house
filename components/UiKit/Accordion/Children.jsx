import React from "react";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
const Children = ({ id, title }) => {
  return (
    <Disclosure.Panel className="px-6 pb-2 pt-2 text--[16px] text-gray-600 bg-gray-100">
      <Link href={`/subcategory/${encodeURIComponent(id)}`}>{title}</Link>
    </Disclosure.Panel>
  );
};

export default Children;
