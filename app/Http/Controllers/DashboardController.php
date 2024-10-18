<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Auth;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $myPendingTasks = Task::query()->where('assigned_user_id', $user->id)->where('status', 'pending')->count();

        $totalInProgressTasks = Task::query()->where('status', 'in_progress')->count();
        $myInProgressTasks = Task::query()->where('assigned_user_id', $user->id)->where('status', 'in_progress')->count();

        $totalCompletedTasks = Task::query()->where('status', 'completed')->count();
        $myCompletedTasks = Task::query()->where('assigned_user_id', $user->id)->where('status', 'completed')->count();

        $activeTasks = Task::query()->whereIn('status', ['pending', 'in_progress'])->where('assigned_user_id', $user->id)->limit(10)->get();
        $activeTasks = TaskResource::collection($activeTasks);


        return inertia('Dashboard', compact('totalPendingTasks', 'myPendingTasks', 'totalInProgressTasks', 'myInProgressTasks', 'totalCompletedTasks', 'myCompletedTasks', 'activeTasks'));
    }
}
