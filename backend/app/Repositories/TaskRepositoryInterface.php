<?php


namespace App\Repositories;


use App\Models\Task;
use Illuminate\Support\Collection;


interface TaskRepositoryInterface
{
    public function forUserOnDate(int $userId, string $date): Collection;
    public function searchForUser(int $userId, string $term): Collection;
    public function create(array $data): Task;
    public function update(Task $task, array $data): Task;
    public function delete(Task $task): bool;
    public function find(int $id): ?Task;
    public function reorder(int $userId, string $date, array $ordered_ids): void;
}