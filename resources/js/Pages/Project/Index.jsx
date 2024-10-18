import { Pagination } from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TableHeading from "@/Components/TableHeading";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/16/solid';

export default function Index({auth, projects, queryParams = null, success}){

    queryParams = queryParams || {};
    const searchFieldChanged =(name, value) =>  {
        if(value){
            queryParams[name] = value;
        }else{
            delete queryParams[name];
        }

        router.get(route('projects.index'), queryParams);
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
        router.get(route('projects.index'), queryParams);
    }

    const deleteProject = (project) =>{
        if(!window.confirm('Are you sure you want to delete this project?')){
            return;
        }
        router.delete(route('projects.destroy', project.id));
    }

    return (
        <AuthenticatedLayout 
         user={auth.user}
            header={
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>
                <Link href={route('projects.create')} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">Add New</Link>
            </div>
            }>

            <Head title="Projects" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                     {success && (<div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
                                    {success}
                                </div>
                    )}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
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
                                            <th className="px-3 py-2">
                                                <TextInput className="w-full" placeholder="Search by Project Name"
                                                defaultValue={queryParams.name}
                                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)} />   
                                            </th>
                                            <th className="px-3 py-2">
                                                <SelectInput className="w-full" defaultValue={queryParams.status} onChange={e => searchFieldChanged('status', e.target.value)} >
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
                                        {projects.data.map((project) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={project.id}>
                                                <th className="px-3 py-3 text-nowrap">{project.id}</th>
                                                <td className="px-3 py-3 text-nowrap"><img src={project.image_path} alt="" style={{width: 60}} /></td>
                                                <td className="px-3 py-3 text-nowrap text-white hover:underline">
                                                    <Link href={route('projects.show', project.id)}>
                                                    {project.name}
                                                    </Link>
                                                </td>
                                                <td className="px-3 py-3 text-nowrap">
                                                    <span className={"px-2 py-2 rounded text-white "+PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                        {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3 text-nowrap">{project.created_at}</td>
                                                <td className="px-3 py-3 text-nowrap">{project.due_date}</td>
                                                <td className="px-3 py-3 text-nowrap">{project.createdBy.name}</td>
                                                <td className="px-3 py-3 text-nowrap">
                                                    <Link href={route('projects.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                                    <button onClick={e => deleteProject(project)} method="delete" as="button" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-2">Delete</button>
                                                </td>
                                            </tr> 
                                        ))}
                                        
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}