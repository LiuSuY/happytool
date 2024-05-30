

import { useRouter} from 'next/navigation';

export default () => {
    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    return [goBack];
}