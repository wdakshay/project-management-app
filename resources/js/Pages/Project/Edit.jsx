import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'

const Edit = ({auth, project}) => {
  const { data, setData, post, processing, errors, reset } =  useForm({
        image: '', 
        name: project.name || '',
        status: project.status || '',
        description: project.description || '',
        due_date: project.due_date || '',
        _method: 'PUT',
    })

    const onSubmit = (e) => {
        e.preventDefault();

        post(route('projects.update', project.id));
    }
  return (
    <AuthenticatedLayout
         user={auth.user}
            header={
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Porject "{project.name}"</h2>
            </div>
            }>

            <Head title="Project Edit" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                                {project.image_path && <div className='mb-4'>
                                    <img src={project.image_path} className="w-64" alt="" />
                                </div>}
                                <div>
                                    <InputLabel htmlFor="project_image_path" value="Project Image" />
                                    <TextInput id="project_image_path" type="file" name="image" onChange={(e) => setData('image', e.target.files[0])} className="mt-1 block w-full"/>
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_name" value="Project Name" />
                                    <TextInput id="project_name" type="text" name="name" value={data.name} isFocused={true} onChange={(e) => setData('name', e.target.value)} className="mt-1 block w-full"/>
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_description" value="Project Description" />
                                    <TextAreaInput id="project_description" name="description" value={data.description} isFocused={true} onChange={(e) => setData('description', e.target.value)} className="mt-1 block w-full"/>
                                    <InputError message={errors.description} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_due_date" value="Project Deadline" />
                                    <TextInput id="project_due_date" type="date" name="due_date" value={data.due_date} isFocused={true} onChange={(e) => setData('due_date', e.target.value)} className="mt-1 block w-full"/>
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="project_status" value="Project Status" />
                                    <SelectInput id="project_status" name="status" value={data.status} onChange={(e) => setData('status', e.target.value)} className="mt-1 block w-full">
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </SelectInput>
                                    <InputError message={errors.due_date} className="mt-2" />
                                </div>
                                <div className='mt-4 text-right'>
                                    <Link href={route('projects.index')} className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded">
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

export default Edit