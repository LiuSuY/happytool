'use client'
import { invoke } from '@tauri-apps/api/tauri'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default () => {
    const router = useRouter();
    const [todo_txt, set_todo_txt] = useState<Array<string>>([]);
    useEffect(() => {
        invoke<Array<string>>('open_todo')
            .then((res) => set_todo_txt(res))
            .catch((err) => console.log(err))

    }, []);


    const handleToDetail = (item: string) => {
        router.push(`/detail?title=${item}`)
    }

    return <div>
        <div className='mb-2'>今日的代办事项</div>
        <ul className='mt-5'>
            {
                todo_txt?.length !== 0 ? todo_txt?.map((item) =>
                    <li className='cursor-pointer' key={item} onClick={() =>
                        handleToDetail(item)
                    } >{item}</li>
                ) : <li className='text-3xl text-[red]'>请检查计划文本文件是否存在</li>
            }
        </ul>
    </div>
}