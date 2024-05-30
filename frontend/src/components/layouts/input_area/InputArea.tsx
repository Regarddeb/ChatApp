import { KeyboardEvent, useState } from 'react';
import { IconSend2 } from "@tabler/icons-react";
import { Input, Loader } from "@mantine/core";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom, useAtomValue } from 'jotai';
import axios from '@utilities/axios';
import { useMutation } from 'react-query';

import { selectedUserAtom, threadAtom, replyToChatAtom } from '@atoms/chatAtoms';
import { chatInputSchema } from '@type/chatInput';
import chatInput from '@type/chatInput';
import { IconButton } from "@sharedComponents/button/IconButton";
import { AttachmentName } from './AttachmentName';
import { AttachmentSelector } from './AttachmentSelector';
import { replyToInitial } from '@type/replyToChat';
import { useAllChatsQuery } from '@queries/chats/allChatsQuery';

export const InputArea: React.FC = () => {
    const selectedUser = useAtomValue(selectedUserAtom);
    const [thread] = useAtom(threadAtom);
    const [attachment, setAttachment] = useState<File | null>(null);
    const [replyToChat, setReplyTo] = useAtom(replyToChatAtom);
    const { refetch: refetchThreadChats } = useAllChatsQuery();

    const { control, formState: { errors }, handleSubmit, setValue } = useForm<chatInput>({
        resolver: zodResolver(chatInputSchema),
        defaultValues: {
            message: '',
        }
    });

    const mutation = useMutation({
        mutationKey: ['sendChat'],
        mutationFn: (chat: FormData) => (
            axios.post('api/chat/send', chat)
        ),
        onSuccess: () => {
            refetchThreadChats();
            setValue('message', '');
            setAttachment(null);
            setReplyTo(replyToInitial);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !event.shiftKey && !mutation.isLoading) {
            event.preventDefault();
            handleSubmit(handleChatSubmit)();
        }
    };

    const handleChatSubmit: SubmitHandler<chatInput> = data => {
        if (chatInputSchema.parse(data)) {
            const formData = new FormData();
            formData.append('message', data.message);

            if (attachment) {
                formData.append('attachment', attachment);
            }
            if (!thread) {
                formData.append('user_id', selectedUser[0].id.toString());
            }
            if (replyToChat.chat_id) {
                formData.append('reply_to', replyToChat.chat_id.toString())
            }
            formData.append('thread_id', (thread ?? 0).toString());

            mutation.mutate(formData);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleChatSubmit)} className="w-full py-2 px-0.5 flex items-center space-x-2 truncate text-ellipsis">

            <AttachmentSelector setAttachment={setAttachment} attachment={attachment} />

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
                        rightSection={mutation.isLoading ? <Loader color="#7a84ba" size="sm" type="dots" /> : null}
                        variant="default"
                        placeholder="Enter your message here..."
                        error={!!errors.message}
                        disabled={selectedUser[0].id === 0}
                        autoComplete='off'
                        onKeyDown={handleKeyPress}
                        {...field}
                    />
                )}
            />

            <IconButton
                icon={<IconSend2 size={20} />}
                className="p-2 pl-2.5"
                disabled={selectedUser[0].id === 0 || mutation.isLoading}
                type='submit'
            />

        </form>
    );
};
