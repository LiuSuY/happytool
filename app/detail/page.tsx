"use client";
import Mind from '@/app/mind'
import { useSearchParams } from 'next/navigation';
export default () => {
    const searchParams  = useSearchParams();
    const title = searchParams.get("title") || 'title';
    return <div className='min-h-screen'>
        <Mind title={title} />
    </div>
}