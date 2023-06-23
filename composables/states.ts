export const useSignIn = () => useState('signIn', () => false);
export const useTokenCookies = () => {
    const cookie = useCookie("token");
    return toRef(cookie.value);
};