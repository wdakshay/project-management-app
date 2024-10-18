import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextAreaInput from '@/Components/TextAreaInput';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

const Edit = ({ auth, task, projects, users }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    image: '',
    project_id: task.project_id || '',
    name: task.name || '',
    description: task.description || '',
    status: task.status || '',
    priority: task.priority || '',
    due_date: task.due_date || '',
    assigned_user_id: task.assigned_user_id || '',
    _method: 'PUT',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route('tasks.update', task.id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit Task "{task.name}"
          </h2>
        </div>
      }
    >
      <Head title="Edit Task" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <form onSubmit={onSubmit} className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
              
              {/* Image Preview */}
              {task.image_path && (
                <div className="mb-4">
                  <img src={task.image_path} className="w-64" alt="Task" />
                </div>
              )}

              {/* Task Image Upload */}
              <div>
                <InputLabel htmlFor="task_image_path" value="Task Image" />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  onChange={(e) => setData('image', e.target.files[0])}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.image} className="mt-2" />
              </div>

              {/* Project Selection */}
              <div className="mt-4">
                <InputLabel htmlFor="task_project_id" value="Project Name" />
                <SelectInput
                  id="task_project_id"
                  name="project_id"
                  value={data.project_id}
                  onChange={(e) => setData('project_id', e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Select Project</option>
                  {projects.data.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.project_id} className="mt-2" />
              </div>

              {/* Assigned User Selection */}
              <div className="mt-4">
                <InputLabel htmlFor="task_assigned_user_id" value="Assigned User" />
                <SelectInput
                  id="task_assigned_user_id"
                  name="assigned_user_id"
                  value={data.assigned_user_id}
                  onChange={(e) => setData('assigned_user_id', e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Select User</option>
                  {users.data.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.assigned_user_id} className="mt-2" />
              </div>

              {/* Task Name */}
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" />
                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              {/* Task Description */}
              <div className="mt-4">
                <InputLabel htmlFor="task_description" value="Task Description" />
                <TextAreaInput
                  id="task_description"
                  name="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              {/* Task Deadline */}
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  onChange={(e) => setData('due_date', e.target.value)}
                  className="mt-1 block w-full"
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>

              {/* Task Status */}
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" />
                <SelectInput
                  id="task_status"
                  name="status"
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>

              {/* Task Priority */}
              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Task Priority" />
                <SelectInput
                  id="task_priority"
                  name="priority"
                  value={data.priority}
                  onChange={(e) => setData('priority', e.target.value)}
                  className="mt-1 block w-full"
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
              </div>

              {/* Buttons */}
              <div className="mt-4 text-right">
                <Link
                  href={route('tasks.index')}
                  className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </Link>
                <button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1.5 px-4 rounded ml-2"
                  type="submit"
                  disabled={processing}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
