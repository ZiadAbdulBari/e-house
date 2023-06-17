import Cart from '@/components/Cart/Cart';
import Header from '@/components/Header/Header';
import React from 'react';

const MainLayout = ({children}) => {
    return (
        <div>
        <Header/>
        <div className="lg:container mx-auto">
            <div>
            {children}
            </div>
            <Cart/>
        </div>
        </div>
    );
};

export default MainLayout;