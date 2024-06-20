'use client'
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Todo = () => {
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
        router.push(`/welcome`);
    }

    const handleOpenUrl = () => {
        invoke("open_window_url", { url: "https://tauri.app/" })
    }
    const handleOpenRoute = () => {
        invoke("open_window_route", { path: "/chat" })
    }

    const handleCloseWindow = () => {
        // const mainWindow = WebviewWindow.getByLabel('chat')
        invoke("close_window", { name: "chat" })
    }
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        const newTodo = e.currentTarget.value;
        if (e.key === 'Enter' && newTodo) {
            set_todo_txt([...todo_txt, newTodo]);
            e.currentTarget.value = '';
            await invoke('write_todo', { todos: [...todo_txt, newTodo] })
        }
    }
    const handleDel = async (text: string) => {
        const res = delArrEl(todo_txt, text);
        set_todo_txt([...res]);
    }

    const delArrEl = (arr: Array<string>, target: string) => {
        return arr.filter(item => item !== target);
    }

    return <div className='flex min-h-screen flex-col items-center justify-between py-24'>
        <div>
            <input type="text" placeholder='请输入你的计划' onKeyDown={handleKeyDown} />
            <ul className='mt-5'>
                {
                    todo_txt?.map((item) =>
                        <li className='cursor-pointer' key={item}  >
                            <span onClick={() =>
                                handleToDetail(item)
                            }> {item}</span> <span onClick={() => handleDel(item)}>del</span>
                        </li>
                    )
                }
            </ul>
        </div>

    </div>
}


Todo.displayName = "Todo";

export default Todo;