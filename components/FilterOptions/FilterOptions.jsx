import React from 'react';
import UiInput from '../UiKit/UiInput';

const FilterOptions = () => {
    return (
        <div className='h-screen'>
            <p className='text-gray-700 font-semibold text-[18px]'>Filter By</p>
            <div className='category-filter mt-4'>
                <p className='text-gray-500 mb-2'>Category</p>
                <div className='px-[10px]'>
                <UiInput type='checkbox' id='cat-man' label='Men'/>
                <UiInput type='checkbox' id='cat-woman' label='Women'/>
                <UiInput type='checkbox' id='cat-accessories' label='Accessories'/>
                </div>
            </div>
            <div className='category-filter mt-4'>
                <p className='text-gray-500 mb-2'>Color</p>
                <div className='px-[10px] grid grid-flow-col grid-cols-6 gap-2'>
                    <UiInput type='checkbox' id='color-1' colorCode="red" specialClass="h-[20px] w-[20px]"/>
                    <UiInput type='checkbox' id='color-2' colorCode="blue" specialClass="h-[20px] w-[20px]"/>
                    <UiInput type='checkbox' id='color-3' colorCode="orange" specialClass="h-[20px] w-[20px]"/>
                    <UiInput type='checkbox' id='color-4' colorCode="green" specialClass="h-[20px] w-[20px]"/>
                </div>
            </div>
            <div className='category-filter mt-4'>
                <p className='text-gray-500 mb-2'>Size</p>
                <div className='px-[10px]'>
                    <UiInput type='checkbox' id='size-s' label='Small'/>
                    <UiInput type='checkbox' id='size-m' label='Medium'/>
                    <UiInput type='checkbox' id='size-l' label='Large'/>
                    <UiInput type='checkbox' id='size-xl' label='Extra Large'/>
                </div>
            </div>
        </div>
    );
};

export default FilterOptions;