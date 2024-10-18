import React from 'react';
import { Pagination } from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constant";
import { Head, Link, router } from "@inertiajs/react";

const TaskTable = ({tasks, queryParams=null, hideProjectColumn=false, success}) => {

    queryParams = queryParams || {};
     const searchFieldChanged =(name, value) =>  {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route('tasks.index'), queryParams);
    }

    const onKeyPress = (name, e) => {
        if(e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    } 
    
    const sortChanged = (name) => {
        if(name === queryParams.sort_field){
            if(queryParams.sort_direction === 'asc'){
                queryParams.sort_direction = 'desc';
            }else{
                queryParams.sort_direction = 'asc';
            }
        }else{
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('tasks.index'), queryParams);
    }

    const deleteTask = (task) =>{
        if(!window.confirm('Are you sure you want to delete this task?')){
            return;
        }
        router.delete(route('tasks.destroy', task.id));
    }


  return (
    <>
    
        {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                        {success}
                    </div>
        )}
        <div className="overflow-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <TableHeading 
                            sortChanged={sortChanged} 
                            name="id" 
                            sort_field={queryParams.sort_field} 
                            sort_direction={queryParams.sort_direction}>
                            ID
                        </TableHeading>
                        <th className="px-3 py-2">Image</th>
                        {!hideProjectColumn && <th className="px-3 py-2">Project Name</th>}
                        <TableHeading 
                            sortChanged={sortChanged} 
                            name="name" 
                            sort_field={queryParams.sort_field} 
                            sort_direction={queryParams.sort_direction}>
                            Name
                        </TableHeading>
                        <TableHeading 
                            sortChanged={sortChanged} 
                            name="status" 
                            sort_field={queryParams.sort_field} 
                            sort_direction={queryParams.sort_direction}>
                            Status
                        </TableHeading>
                        <TableHeading 
                            sortChanged={sortChanged} 
                            name="created_at" 
                            sort_field={queryParams.sort_field} 
                            sort_direction={queryParams.sort_direction}>
                            Created Date
                        </TableHeading>
                        <TableHeading 
                            sortChanged={sortChanged} 
                            name="due_date" 
                            sort_field={queryParams.sort_field} 
                            sort_direction={queryParams.sort_direction}>
                            Due Date
                        </TableHeading>
                        <th className="px-3 py-2">Created By</th>
                        <th className="px-3 py-2 text-right">Actions</th>   
                    </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr className="text-nowrap">
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        {!hideProjectColumn && <th className="px-3 py-2"></th>}
                        <th className="px-3 py-2">
                            <TextInput className="w-full" placeholder="Search by Task Name"
                            defaultValue={queryParams.name}
                            onBlur={e => searchFieldChanged('name', e.target.value)}
                            onKeyPress={e => onKeyPress('name', e)} />   
                        </th>
                        <th className="px-3 py-2">
                            <SelectInput className="w-5" defaultValue={queryParams.status} onChange={e => searchFieldChanged('status', e.target.value)} >
                                <option value="">Select Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </SelectInput>
                        </th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2"></th>
                        <th className="px-3 py-2 text-right"></th>   
                    </tr>
                </thead>
                <tbody>
                    {tasks.data.map((task) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={task.id}>
                            <th className="px-3 py-3 text-nowrap">{task.id}</th>
                            <td className="px-3 py-3 text-nowrap"><img src={task.image_path} alt="" style={{width: 60}} /></td>
                            {!hideProjectColumn && 
                                <td className="px-3 py-3 text-white hover:underline">
                                    <Link href={route('projects.show', task.project_id)}>
                                    {task.project.name}
                                    </Link>
                                </td>
                            }
                            <td className="px-3 py-3 text-white hover:underline">
                                <Link href={route('tasks.show', task.id)}>
                                {task.name}
                                </Link>
                            </td>   
                            <td className="px-3 py-3 text-nowrap">
                                <span className={"px-2 py-2 rounded text-white "+TASK_STATUS_CLASS_MAP[task.status]}>
                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                </span>
                            </td>
                            <td className="px-3 py-3 text-nowrap">{task.created_at}</td>
                            <td className="px-3 py-3 text-nowrap">{task.due_date}</td>
                            <td className="px-3 py-3 text-nowrap">{task.createdBy.name}</td>
                            <td className="px-3 py-3 text-nowrap">
                                <Link href={route('tasks.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                <button onClick={e => deleteTask(task)} method="delete" as="button" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-2">Delete</button>
                            </td>
                        </tr>   
                    ))}
                    
                </tbody>
            </table>
        </div>
        <Pagination links={tasks.meta.links} />
    </>
  )
}

export default TaskTable