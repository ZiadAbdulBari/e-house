import Cart from '@/components/Cart/Cart';
import Header from '@/components/Header/Header';
import React from 'react';

const MainLayout = ({children}) => {
    return (
        <div>
        <Header/>
        <div>
            <div>
            {children}
            </div>
            <Cart/>
        </div>
        </div>
    );
};

export default MainLayout;