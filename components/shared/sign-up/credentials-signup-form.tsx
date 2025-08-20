'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpDefaultValues } from '@/lib/constants';
import {signUp} from '@/lib/actions/user.actions';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const CredentialsSignUpForm = () => {
  const [data, action] = useActionState(signUp, {
    message: '',
    success: false,
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    );
  };

  return (
    <form action={action} noValidate>
      <Input name='callbackUrl' defaultValue={callbackUrl} type='hidden' />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            required
            type='text'
            defaultValue={signUpDefaultValues.name}
            autoComplete='name'
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            required
            type='email'
            defaultValue={signUpDefaultValues.email}
            autoComplete='email'
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            required
            type='password'
            defaultValue={signUpDefaultValues.password}
            autoComplete='current-password'
          />
        </div>
        <div>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            required
            type='password'
            defaultValue={signUpDefaultValues.confirmPassword}
            autoComplete='current-password'
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className='text-red-500 text-center'>{data.message}</div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          Do you have an account?{' '}
          <Link target='_self' className='link' href='/sign-in'>
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignUpForm;