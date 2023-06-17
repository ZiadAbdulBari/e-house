import { AuthContext } from '@/contaxt/AuthContext';
import Link from 'next/link';
import React, { useContext } from 'react';

const Header = () => {
    const {setAuthData,isLoggedIn} = useContext(AuthContext);
    const logout = ()=>{
        setAuthData(false);
    }
    return (
        <div className='bg-gray-50'>
            <div className='lg:container mx-auto'>
                <div className='flex justify-between py-[20px]'>
                    <div>
                        <p className='text-[#025464] text-[25px] font-semibold'><Link href="/">Repliq</Link></p>
                    </div>
                    <div className='flex gap-4'>
                        {
                            !isLoggedIn &&
                                <button className='px-4 py-[2px] rounded-[5px] bg-[#025464] text-white'><Link href="/signup">Login</Link></button>
                        }
                        {
                            !isLoggedIn &&
                                <button className='px-4 py-[2px] rounded-[5px] bg-orange-700 text-white'><Link href="/signin">Registration</Link></button>
                        }
                        {
                            isLoggedIn &&
                            <button className='px-4 py-[2px] rounded-[5px] bg-orange-700 text-white' onClick={logout}>Logout</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;