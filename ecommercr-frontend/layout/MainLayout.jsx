import Cart from '@/components/Cart/Cart';
import React from 'react';

const MainLayout = ({children}) => {
    return (
        <div className="lg:container mx-auto">
            <div>
            {children}
            </div>
            <Cart/>
        </div>
    );
};

export default MainLayout;