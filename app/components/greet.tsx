'use client'

import { useEffect } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

export default function Greet() {
  useEffect(() => {
    invoke<string>('greet', { name: 'Next.js' })
      .then(console.log)
      .catch(console.error)
  }, [])

  const handleSayHello = () => {
    invoke<string>('greet', { name: 'Next.js' });
    invoke('say_hello').then((message) => console.log(message));
  }

  return <div onClick={handleSayHello}>hello wolrd</div>
}