import Cart from '@/components/Cart/Cart';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import MobileNavbar from '@/components/MobileNavbar/MobileNavbar';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const MainLayout = ({children}) => {
    const router = useRouter();
    return (
        <div>
        <Header/>
        <div>
            <div className='body-height'>
            {children}
            </div>
            {
                router.pathname != '/checkout' && <Cart/>
            }
        </div>
        <MobileNavbar/>
        <Footer/>
        </div>
    );
};

export default MainLayout;