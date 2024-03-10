import { useRef, ChangeEvent } from 'react';
import { IconSend2 } from "@tabler/icons-react";
import { IconCirclePlus } from "@tabler/icons-react";
import { Input } from "@mantine/core";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import axios from '@utilities/axios';
// import { useQuery } from 'react-query';

import { IconButton } from "@components/button/IconButton";
import { selectedUserAtom } from '@atoms/chatAtoms';
import chatInput from '@type/chatInput';
import { chatInputSchema } from '@type/chatInput';

export const InputArea: React.FC = () => {
    const [selectedUser] = useAtom(selectedUserAtom);
    const { control, formState: { errors }, handleSubmit, setValue } = useForm<chatInput>({
        resolver: zodResolver(chatInputSchema),
        defaultValues: {
            message: '',
        }
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddFileClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setValue('attachment', files[0]);
        }
    };

    const handleChatSubmit: SubmitHandler<chatInput> = data => {
        const formData = new FormData();
        formData.append('message', data.message);
        if (data.attachment) {
            formData.append('attachment', data.attachment);
        }
        formData.append('user_id', selectedUser.id.toString());

        axios.post('api/chat/send', formData)
            .then((res: any) => {
                console.log(res)
            })
            .catch((err: any) => {
                console.log(err)
            });

    };


    return (
        <form onSubmit={handleSubmit(handleChatSubmit)} className="w-full py-2 px-0.5 flex items-center space-x-2">

            <IconButton
                icon={<IconCirclePlus size={19} />}
                className="p-2"
                onClick={handleAddFileClick}
                disabled={selectedUser.id === 0}
            />
            <Controller
                name='attachment'
                control={control}
                render={({ field }) => (
                    <input
                        {...field}
                        disabled={selectedUser.id === 0}
                        type="file"
                        accept='image/*'
                        id="fileInput"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        value=''
                        onChange={handleFileInputChange}
                    />
                )}
            />

            <Controller
                name='message'
                control={control}
                render={({ field }) => (
                    <Input
                        className="w-full"
                        radius={20}
                        variant="default"
                        placeholder="Enter your message here..."
                        error={!!errors.message}
                        disabled={selectedUser.id === 0}
                        autoComplete='off'
                        {...field}
                    />
                )}
            />

            <IconButton
                disabled={selectedUser.id === 0}
                icon={<IconSend2 size={20} />}
                className="p-2 pl-2.5"
                type='submit'
            />

        </form>
    );
};
