import { IconAt, IconLock } from '@tabler/icons-react';
import { Input, PasswordInput, Button, Checkbox } from '@mantine/core';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Toast from '@sharedComponents/feedback/Toast';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { LoadingOverlay } from '@sharedComponents/loader/LoadingOverlay';
import Container from "@sharedComponents/layout/Container";
import Slogan from '@sharedComponents/misc/Slogan';
import Front from '@sharedComponents/misc/Front';
import { userAtom } from '@atoms/userAtoms';
import axios from '@utilities/axios'
import LoginValues from '@type/loginValues';
import { loginSchema } from '@type/loginValues';

export default function Login() {
    const [, setUser] = useAtom(userAtom);
    const navigate = useNavigate();

    const { handleSubmit, control, formState: { errors }, setValue } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email_username: '',
            password: '',
            remember_me: false
        }
    });

    const mutation = useMutation(
        (data: LoginValues) => axios.post('api/user/login', loginSchema.parse(data)),
        {
            onSuccess: (res) => {
                const { token, user } = res.data.user.original;
                localStorage.setItem('token', token);
                setUser(user);
                Toast({ icon: 'success', title: 'Signed in successfully' });
                navigate('/chat');
            },
            onError: (err: any) => {
                if (axios.isAxiosError(err) && err.response?.status === 422) {
                    Toast({ icon: 'error', title: err.response.data.message });
                } else if (axios.isAxiosError(err) && err.response?.status === 401) {
                    Toast({ icon: 'error', title: err.response.data.error });
                } else {
                    Toast({ icon: 'error', title: 'Something went wrong' });
                }
                console.error('An error occurred:', err.message);
            }
        }
    );

    const handleLoginSubmit: SubmitHandler<LoginValues> = data => {
        if (loginSchema.parse(data)) {
            mutation.mutate(data);
        }
    }

    return (
        <Container>
            {mutation.isLoading && (
                <LoadingOverlay />
            )}
            <div className="flex justify-between items-center overflow-auto w-full h-full p-2 mt-2">
                <div className="w-5/12 h-full flex flex-col justify-center space-y-7">

                    <Slogan />

                    <form onSubmit={handleSubmit(handleLoginSubmit)} className="flex flex-col space-y-4">

                        <Controller
                            name='email_username'
                            control={control}
                            render={({ field }) => (
                                <Input.Wrapper error={errors.email_username && (errors.email_username.message)}>
                                    <Input
                                        placeholder="Email or username"
                                        radius="md"
                                        className="w-8/12"
                                        leftSection={<IconAt size={16} />}
                                        aria-label="Email"
                                        variant='default'
                                        error={!!errors.email_username}
                                        {...field}
                                    />
                                </Input.Wrapper>
                            )}
                        />

                        <Controller
                            name='password'
                            control={control}
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
                                </Input.Wrapper >
                            )}
                        />

                        <div className="w-8/12 flex justify-between items-center">

                            <Controller
                                name='remember_me'
                                control={control}
                                render={({ field }) => (
                                    <Checkbox
                                        styles={{ label: { opacity: 0.7, cursor: 'pointer' }, input: { cursor: 'pointer' } }}
                                        variant='outline'
                                        color='#7a84ba'
                                        label="Remember me"
                                        size="xs"
                                        checked={field.value || false}
                                        onChange={(e) => {
                                            field.onChange(e.target.checked);
                                            setValue('remember_me', e.target.checked);
                                        }}
                                    />
                                )}
                            />
                            <p className="text-xs text-primary cursor-pointer hover:underline">Forgot password?</p>
                        </div>

                        <Button
                            type='submit'
                            variant="filled"
                            className='bg-primary w-8/12 active:ring-2 active:ring-primary hover:bg-opacity-90 ring-offset-2'
                            radius="md"
                        >
                            Log in
                        </Button>
                        <Link to="signup" className='w-8/12'>
                            <Button
                                variant="subtle"
                                className='hover:bg-primary hover:bg-opacity-20 hover:text-primary w-full'
                                radius="md"
                                color='#7a84ba'
                            >
                                New here? Register now.
                            </Button>
                        </Link>

                    </form>

                </div>

                <Front />

            </div>
        </Container>
    )
}