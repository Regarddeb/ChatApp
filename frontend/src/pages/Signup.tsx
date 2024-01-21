// import React from 'react';
import { IconAt, IconLock, IconUser } from '@tabler/icons-react';
import { Input, PasswordInput, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

import Container from "@components/layouts/Container";
import SignupMessage from '@components/misc/SignupMessage';
import Front from '@components/misc/Front';


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

    const { handleSubmit, formState: { errors }, control } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const SignupSubmit: SubmitHandler<FormValues> = data => {
        if (schema.parse(data)) {
            console.log('data valid')
        }
    }

    return (
        <Container>
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
    )
}