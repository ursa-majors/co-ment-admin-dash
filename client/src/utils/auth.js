import LS     from './localStorage';
import router from '@/router';

export function logout() {
    LS.deleteData('auth_token');
    router.push('/');
}
