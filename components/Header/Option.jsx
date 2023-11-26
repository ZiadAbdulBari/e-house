import Link from 'next/link';
import React from 'react';

const Option = ({type,option_name,destination=""}) => {
    return (
        <li><Link href={destination} >{option_name}</Link></li>
    );
};

export default Option;