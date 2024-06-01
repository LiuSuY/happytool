'use client'
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { WebviewWindow, appWindow } from '@tauri-apps/api/window'

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

    const handleToDance = () => {
        router.push(`/welcome`)
    }

    const handleOpenUrl = () => {
        invoke("open_window_url", { url: "https://tauri.app/" })
    }
    const handleOpenRoute = () => {
        invoke("open_window_route", { path: "/chat" })
    }

    const handleCloseWindow = () => {
        // const mainWindow = WebviewWindow.getByLabel('chat')
        // mainWindow?.close();
        invoke("close_window", { name: "chat" })
    }

    return <div>
        <div className='mb-2'>今日的代办事项</div>
        <div className='h3' onClick={handleOpenUrl}>openUrl</div>
        <div className='h3' onClick={handleOpenRoute}>openChat</div>
        <div className='h3' onClick={handleCloseWindow}>closeWindow</div>
        <ul className='mt-5'>
            {
                todo_txt?.length !== 0 ? todo_txt?.map((item) =>
                    <li className='cursor-pointer' key={item} onClick={() =>
                        handleToDetail(item)
                    } >{item}</li>
                ) : <li className='text-3xl text-[red]'>请检查计划文本文件是否存在</li>
            }
            <li className='cursor-pointer' onClick={handleToDance}>请欣赏舞蹈胡乱跳</li>
        </ul>
    </div>
}