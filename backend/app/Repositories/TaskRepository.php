<?php


namespace App\Repositories;


use App\Models\Task;
use Illuminate\Support\Collection;


class TaskRepository implements TaskRepositoryInterface
{
    public function forUserOnDate(int $userId, string $date): Collection
    {
        return Task::where('user_id', $userId)
            ->whereDate('date', $date)
            ->orderBy('order')
            ->get();
    }


    public function searchForUser(int $userId, string $term): Collection
    {
        return Task::where('user_id', $userId)
            ->whereRaw('LOWER(statement) LIKE ?', ['%'.strtolower($term).'%'])
            ->orderBy('date', 'desc')
            ->orderBy('order')
            ->get();
    }


    public function create(array $data): Task
    {
        return Task::create($data);
    }


    public function update(Task $task, array $data): Task
    {
        $task->update($data);
        return $task;
    }


    public function delete(Task $task): bool
    {
        return (bool) $task->delete();
    }


    public function find(int $id): ?Task
    {
        return Task::find($id);
    }


    public function reorder(int $userId, string $date, array $ordered_ids): void
    {
        foreach ($ordered_ids as $index => $id) {
            Task::where('id', $id)
                ->where('user_id', $userId)
                ->update(['order' => $index]);
        }
    }
}