import Cart from '@/components/Cart/Cart';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const MainLayout = ({children}) => {
    const router = useRouter();
    return (
        <div>
        <Header/>
        <div>
            <div>
            {children}
            </div>
            {
                router.pathname != '/checkout' && <Cart/>
            }
        </div>
        </div>
    );
};

export default MainLayout;