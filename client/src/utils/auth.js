import router from '@/router';
import LS     from './localStorage';

export function logout() {
    LS.deleteData('auth_token');
    router.push('/');
}
