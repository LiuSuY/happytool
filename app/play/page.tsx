

'use client'
import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const Play = () => {
    return <div className='flex min-h-screen flex-col items-center justify-between pt-24'>
        hello play
    </div>
}


Play.displayName = "Play";

export default Play;