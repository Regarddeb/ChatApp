import { IconAt, IconLock, IconUser } from '@tabler/icons-react';
import { Input, PasswordInput, Button } from '@mantine/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';


import axios from '@utilities/axios';
import { useAtom } from 'jotai';
import Container from "@components/layouts/Container";
import SignupMessage from '@components/misc/SignupMessage';
import Front from '@components/misc/Front';
import { userAtom } from '@atoms/userAtoms';
import Toast from '@components/feedback/Toast';
import { LoadingOverlay } from '@components/loader/LoadingOverlay';

const schema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password_confirmation: z.string().min(8, 'Password confirmation must be at least 8 characters')
}).refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords do not match',
});

type FormValues = z.infer<typeof schema>;

export default function Signup() {
    const [, setUser] = useAtom(userAtom);
    const navigate = useNavigate();

    const { handleSubmit, formState: { errors }, control, setError } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
        }
    });

    const mutation = useMutation(
        (data: FormValues) => axios.post('api/user/store', schema.parse(data)),
        {
            onSuccess: (res) => {
                const { token, user } = res.data.userData.original;
                setUser((prev) => ({
                    ...prev,
                    token: token ?? prev.token,
                    username: user?.username ?? prev.username,
                    email: user?.email ?? prev.email,
                }));
                Toast({ icon: 'success', title: 'Signed in successfully' });
                navigate('/chat');
            },
            onError: (err: any) => {
                if (axios.isAxiosError(err) && err.response?.status === 422) {
                    setError('email', {
                        type: 'manual',
                        message: err.response.data.message,
                    });
                } else {
                    Toast({ icon: 'error', title: 'Something went wrong' });
                    console.error('An error occurred:', err.message);
                }
            },
        }
    );

    const SignupSubmit: SubmitHandler<FormValues> = (data) => {
        mutation.mutate(data);
    };

    return (
        <Container>
            {mutation.isLoading && (
                <LoadingOverlay />
            )}
            
            <div className="flex justify-between items-center overflow-auto w-full p-2 mt-2">
                <div className="w-5/12 h-full flex flex-col space-y-7">

                    <SignupMessage />

                    <form onSubmit={handleSubmit(SignupSubmit)} className="flex flex-col space-y-4">

                        <Controller
                            control={control}
                            name='username'
                            render={({ field }) => (
                                <Input.Wrapper error={errors.username && (errors.username.message)}>
                                    <Input
                                        placeholder="Username"
                                        radius="md"
                                        className="w-8/12"
                                        leftSection={<IconUser size={16} />}
                                        aria-label="Username"
                                        {...field}
                                        error={!!errors.username}
                                    />
                                </Input.Wrapper>
                            )}
                        />

                        <Controller
                            control={control}
                            name='email'
                            render={({ field }) => (
                                <Input.Wrapper error={errors.email && (errors.email.message)}>
                                    <Input
                                        placeholder="Email"
                                        radius="md"
                                        className="w-8/12"
                                        leftSection={<IconAt size={16} />}
                                        aria-label="Email"
                                        {...field}
                                        error={!!errors.email}
                                    />
                                </Input.Wrapper>
                            )}
                        />

                        <Controller
                            control={control}
                            name='password'
                            render={({ field }) => (
                                <Input.Wrapper error={errors.password && (errors.password.message)}>
                                    <PasswordInput
                                        radius="md"
                                        placeholder="Password"
                                        leftSection={<IconLock size={16} />}
                                        className="w-8/12"
                                        aria-label='Password'
                                        {...field}
                                        error={!!errors.password}
                                    />
                                </Input.Wrapper>
                            )}
                        />

                        <Controller
                            control={control}
                            name='password_confirmation'
                            render={({ field }) => (
                                <Input.Wrapper error={errors.password_confirmation && (errors.password_confirmation.message)}>
                                    <PasswordInput
                                        radius="md"
                                        placeholder="Confirm Password"
                                        leftSection={<IconLock size={16} />}
                                        className="w-8/12"
                                        aria-label='Password Confirmation'
                                        {...field}
                                        error={!!errors.password_confirmation}
                                    />
                                </Input.Wrapper>
                            )}
                        />

                        <Button
                            variant="filled"
                            className='bg-primary w-8/12 active:ring-2 active:ring-primary hover:bg-opacity-90 ring-offset-2'
                            radius="md"
                            type='submit'
                            loading={mutation.isLoading}
                            disabled={mutation.isLoading}
                        >
                            Signup
                        </Button>

                        <Link to='/' className='w-8/12'>
                            <Button
                                variant="subtle"
                                className='w-full hover:bg-primary hover:bg-opacity-20 hover:text-primary'
                                radius="md"
                                color='#7a84ba'
                            >
                                Already registered? Log in.
                            </Button>
                        </Link>

                    </form>

                </div>

                <Front />

            </div>
        </Container>
    );
}
