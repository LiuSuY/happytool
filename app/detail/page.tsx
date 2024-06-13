"use client";
// import Mind from '@/app/mind'
import { useSearchParams } from 'next/navigation';
// import { Suspense } from 'react';
const Detail = () => {
    // const searchParams = useSearchParams();
    // const title = searchParams.get("title") || 'title';
    return <div className='min-h-screen'>
        {/* <Suspense>
            <Mind title={title} />
        </Suspense> */}
        hello world
    </div>
}

Detail.displayName = "Detail";

export default Detail;