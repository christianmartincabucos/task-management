<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Routing\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Repositories\TaskRepositoryInterface;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    use AuthorizesRequests;

    protected TaskRepositoryInterface $tasks;

    public function __construct(TaskRepositoryInterface $tasks)
    {
        $this->authorizeResource(Task::class, 'task');
        $this->tasks = $tasks;

    }


    public function index(Request $request)
    {
        $user = $request->user();
        $date = $request->query('date');
        $search = $request->query('search');
        $sort = $request->query('sort');


        if ($search) {
            $tasks = $this->tasks->searchForUser($user->id, (string)$search);
        } else {
            $dateToUse = $date ?? now()->toDateString();
            $tasks = $this->tasks->forUserOnDate($user->id, $dateToUse);
        }


        if ($sort === 'priority') {
            $tasks = $tasks->sortBy('priority')->values();
        }


        return TaskResource::collection($tasks);
    }


    public function store(StoreTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;


        // compute order: last + 1 for given date
        $maxOrder = Task::where('user_id', $data['user_id'])->whereDate('date', $data['date'])->max('order') ?? -1;
        $data['order'] = $maxOrder + 1;


        $task = $this->tasks->create($data);


        return (new TaskResource($task))->response()->setStatusCode(201);
    }


    public function show(Task $task)
    {
        return new TaskResource($task);
    }


    public function update(UpdateTaskRequest $request, Task $task)
    {
        $updated = $this->tasks->update($task, $request->validated());
        return new TaskResource($updated);
    }


    public function destroy(Request $request, Task $task)
    {
        $this->tasks->delete($task);
        return response()->json(['message' => 'Deleted'], 200);
    }


    public function reorder(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'ordered_ids' => 'required|array',
            'ordered_ids.*' => 'integer|exists:tasks,id',
        ]);


        $this->tasks->reorder($request->user()->id, $request->date, $request->ordered_ids);
        return response()->json(['message' => 'Order saved'], 200);
    }
}
