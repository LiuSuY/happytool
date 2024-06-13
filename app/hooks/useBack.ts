

import { useRouter } from 'next/navigation';

const useBack = () => {
    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    return [goBack];
}

export default useBack;