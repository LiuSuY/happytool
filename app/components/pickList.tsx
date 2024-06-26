"use client";
import { invoke } from '@tauri-apps/api/tauri'
import React from 'react';
import { pickListItem } from '../page';

const PickList = ({ title, list }: { title: string, list: Array<pickListItem> }) => {
    const handleTo = (path: string) => {
        invoke("open_window_route", { path })
    };

    return <div>
        <h3 className='text-lg text-red-600 pb-8'>{title} </h3>
        <ul className='pl-4 py-0'>
            {list?.map((item: pickListItem, index: number) =>
                <li key={item.pagePath}><span className='cursor-pointer' onClick={() => handleTo('/todo')}>{index + 1}.{item.handleName}</span></li>
            )}
        </ul>
    </div>
}

PickList.dispalyName = "PickList";
export default PickList;