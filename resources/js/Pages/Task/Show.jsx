import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constant';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';
import TaskTable from '../Task/TaskTable';

const Show = ({ auth, task, tasks, queryParams }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex items-center justify-between">
            <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {`Task "${task.name}"`}
            </h2>
            <Link href={route('tasks.edit', task.id)} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">Edit Task</Link>
        </div>
        
      }
    >
      <Head title={`Task "${task.name}"`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            
            {/* Task Image */}
            {task.image_path && (
              <div>
                <img
                  src={task.image_path}
                  alt={`Image of ${task.name}`}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Task Details */}
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                {/* Left Column */}
                <div>
                  <div>
                    <label className="font-bold text-lg">Task ID</label>
                    <p className="mt-1">{task.id}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Name</label>
                    <p className="mt-1">{task.name}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Status</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded " + TASK_STATUS_CLASS_MAP[task.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Priority</label>
                    <p className="mt-1">
                      <span
                        className={
                          "px-2 py-1 rounded " + TASK_PRIORITY_CLASS_MAP[task.priority]
                        }
                      >
                        {TASK_PRIORITY_TEXT_MAP[task.priority]}
                      </span>
                    </p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Project</label>
                    <p className="mt-1">{task.project?.name || 'N/A'}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Assigned User</label>
                    <p className="mt-1">{task.assignedUser?.name || 'Unassigned'}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Due Date</label>
                    <p className="mt-1">{task.due_date}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Task Created Date</label>
                    <p className="mt-1">{task.created_at}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Created By</label>
                    <p className="mt-1">{task.createdBy?.name || 'Unknown'}</p>
                  </div>

                  <div className="mt-4">
                    <label className="font-bold text-lg">Last Updated By</label>
                    <p className="mt-1">{task.updatedBy?.name || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Task Description */}
              <div className="mt-4">
                <label className="font-bold text-lg">Task Description</label>
                <p className="mt-1">{task.description || 'No description available.'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
