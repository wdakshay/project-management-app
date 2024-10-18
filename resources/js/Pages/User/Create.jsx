import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

const Create = ({auth}) => {
  const { data, setData, post, processing, errors, reset } =  useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('users.store'));
    }
  return (
    <AuthenticatedLayout
         user={auth.user}
            header={
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create New User</h2>
            </div>
            }>

            <Head title="Create New User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_name" value="User Name" />
                                    <TextInput id="user_name" type="text" name="name" value={data.name} isFocused={true} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full"/>
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_email" value="User Email" />
                                    <TextInput id="user_email" type="email" name="email" value={data.email}  onChange={(e) => setData('email', e.target.value)} className="mt-1 block w-full"/>
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password" value="Password" />
                                    <TextInput id="user_password" type="password" name="password" value={data.password}  onChange={(e) => setData('password', e.target.value)} className="mt-1 block w-full"/>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="user_password_confirmation" value="Confirm Password" />
                                    <TextInput id="user_password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation}  onChange={(e) => setData('password_confirmation', e.target.value)} className="mt-1 block w-full"/>
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                                <div className='mt-4 text-right'>
                                    <Link href={route('users.index')} className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded">
                                    Cancel
                                    </Link>
                                    <button className='bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 px-4 rounded ml-2' type='submit'>Submit</button>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
  )
}

export default Create