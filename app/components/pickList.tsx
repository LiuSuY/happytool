"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const PickList = ({ title }: { title: string }) => {
    const currentRouter = useRouter();
    const handleTo = (path: string) => {
        currentRouter.push(path)
    };

    return <div>
        <h3 className='text-lg text-red-600 pb-8'>{title} </h3>
        <ul className='pl-4 py-0'>
            <li><span className='cursor-pointer' onClick={() => handleTo('/welcome')}>1. edit or watch todo list</span></li>
            <li><span className='cursor-pointer' onClick={() => handleTo('/welcome')}>2. audio or video pla</span>y</li>
            <li><span className='cursor-pointer' onClick={() => handleTo('/welcome')}>3. 3d modal show</span></li>
        </ul>
    </div>
}

PickList.dispalyName = "PickList";
export default PickList;