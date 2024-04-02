import { useRef, ChangeEvent, KeyboardEvent, MouseEvent, useState } from 'react';
import { IconCirclePlus, IconSend2, IconX } from "@tabler/icons-react";
import { Input } from "@mantine/core";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue } from 'jotai';
import axios from '@utilities/axios';
import { useMutation } from 'react-query';

import { IconButton } from "@components/button/IconButton";
import { selectedUserAtom, threadAtom } from '@atoms/chatAtoms';
import chatInput from '@type/chatInput';
import { chatInputSchema } from '@type/chatInput';
import { AttachmentName } from './AttachmentName';

export const InputArea: React.FC = () => {
    const selectedUser = useAtomValue(selectedUserAtom);
    const [thread, setThread] = useAtom(threadAtom);
    const [attachment, setAttachment] = useState<File | null>(null);

    const { control, formState: { errors }, handleSubmit, setValue } = useForm<chatInput>({
        resolver: zodResolver(chatInputSchema),
        defaultValues: {
            message: '',
        }
    });

    const mutation = useMutation((chat: FormData) =>
        axios.post('api/chat/send', chat)
    );

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddFileClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleRemoveFile = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setAttachment(null);
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(handleChatSubmit)();
        }
    };

    const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setAttachment(files[0]);
        }
    };

    const handleChatSubmit: SubmitHandler<chatInput> = data => {
        const formData = new FormData();
        formData.append('message', data.message);

        if (attachment) {
            formData.append('attachment', attachment);
        }
        formData.append('user_id', selectedUser.id.toString());
        formData.append('thread_id', (thread ?? 0).toString());

        mutation.mutate(formData, {
            onSuccess: (res) => {
                setThread(res.data.chat.thread_id)
                setValue('message', '');
                setAttachment(null);
            },
            onError: (err) => {
                console.log(err);
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(handleChatSubmit)} className="w-full py-2 px-0.5 flex items-center space-x-2 truncate text-ellipsis">

           

            <Controller
                name='message'
                control={control}
                render={({ field }) => (
                    <Input
                        className="flex-grow"
                        radius={20}
                        leftSection={
                            attachment ? (
                                <AttachmentName attachment={attachment} />
                            ) : null
                        }
                        leftSectionWidth={attachment ? 100 : 0}
                        variant="default"
                        placeholder="Enter your message here..."
                        error={!!errors.message}
                        disabled={selectedUser.id === 0}
                        autoComplete='off'
                        onKeyDown={handleKeyPress}
                        {...field}
                    />
                )}
            />


            <IconButton
                icon={<IconSend2 size={20} />}
                className="p-2 pl-2.5"
                disabled={selectedUser.id === 0}
                type='submit'
            />

        </form>
    );
};
