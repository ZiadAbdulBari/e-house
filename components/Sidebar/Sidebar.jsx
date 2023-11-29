import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
    return (
        <div className="w-[20%] h-[75vh] bg-red-500 rounded">
            <ul>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/order">Order</Link>
              </li>
            </ul>
          </div>
    );
};

export default Sidebar;