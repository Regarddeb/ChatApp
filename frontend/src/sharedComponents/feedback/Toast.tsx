import React from 'react';
import Swal, { SweetAlertIcon } from 'sweetalert2';

interface ToastProps {
    icon: SweetAlertIcon;
    title: string;
}

const Toast: React.FC<ToastProps> = ({ icon, title }) => {
    const toastConfig = {
        toast: true,
        position: 'bottom-left' as const,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast: HTMLDivElement) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        },
        icon,
        title,
    };

    Swal.fire(toastConfig);

    return null;
};

export default Toast;
