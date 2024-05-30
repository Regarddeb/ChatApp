import { lazy } from 'react';

interface AuthRouteProps {
    element: JSX.Element;
}

const Login = lazy(() => import('@pages/Login'));

export function AuthRoute({ element }: AuthRouteProps): JSX.Element {
    const token: string | null = localStorage.getItem('token');

    if (!token) {
        return <Login />
    }

    return element;
}