import { IconCamera } from "@tabler/icons-react";
import { MouseEvent, useRef, ChangeEvent } from "react";
import { useMutation } from "react-query";

import axios from '@utilities/axios';
import { userAtom } from "@atoms/userAtoms";
import { useAtom } from "jotai";
import no_dp from '@assets/images/illustration/no_dp.svg';
import Toast from "@sharedComponents/feedback/Toast";

export const DisplayPic: React.FC = () => {
    const [user, setUser] = useAtom(userAtom);
    const imgInputRef = useRef<HTMLInputElement>(null);

    const handleChangeDP = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (imgInputRef.current) {
            imgInputRef.current.click();
        }
    }

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const files = event.target.files;
        if (files && files.length > 0) {
            const image = new FormData();
            image.append('dpFile', files[0]);
            mutation.mutate(image, {
                onSuccess: (res) => {
                    setUser(prevUser => ({
                        ...prevUser,
                        display_picture_path: res.data.path
                    }));
                    Toast({ icon: 'success', title: res.data.message });
                },
                onError: (err: any) => {
                    if (err.response.status === 422) {
                        Toast({ icon: 'error', title: 'Invalid input' })
                    } else {
                        Toast({ icon: 'error', title: 'Something went wrong, unable to update display pic.' })
                    }

                }
            });
        }
    }

    const mutation = useMutation((image: FormData) => (
        axios.post('/api/user/changeDP', image)
    ))

    return (
        <>
            <div
                style={{
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: user.display_picture_path ?
                        `url(${import.meta.env.VITE_API_URL}/storage/${user.display_picture_path})` :
                        `url(${no_dp})`
                }}
                onClick={handleChangeDP}
                className="h-44 relative w-44 rounded-full bg-gray-200 group cursor-pointer ring-4 ring-offset-4 ring-green-500"
            >
                <div className="bottom-0 group-hover:bg-gray-400 text-primary group-hover:text-white right-4 absolute bg-secondary p-2 rounded-full">
                    <IconCamera />
                </div>
            </div>

            <input
                type="file"
                ref={imgInputRef}
                accept='image/*'
                className="hidden"
                onChange={handleImageChange}
            />
        </>
    )
}
