import { lazy } from 'react';

interface AuthRouteProps {
    element: JSX.Element;
}

const ChatList = lazy(() => import('@pages/Chat'));

export function GuestRoute({ element }: AuthRouteProps): JSX.Element {
    const token: string | null = localStorage.getItem('token');

    if (token) {
        return <ChatList />
    }

    return element;
}