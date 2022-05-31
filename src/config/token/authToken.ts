let inMemoryToken: string | null = null;

export class AuthToken {
    static get() {
        return (
            inMemoryToken || localStorage.getItem('jwt') || null
        );
    }

    static set(token: string | null , rememberMe: boolean) {
        if (rememberMe) {
            localStorage.setItem('jwt', token || '');
        } else {
            inMemoryToken = token;
            localStorage.setItem('jwt', '');
        }
    }
}
