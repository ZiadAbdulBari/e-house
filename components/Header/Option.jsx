import Link from 'next/link';
import React from 'react';

const Option = ({type,option_name,id,destination=""}) => {
    return (
        <li><Link href={`/subcategory/${id}`}>{option_name}</Link></li>
    );
};

export default Option;