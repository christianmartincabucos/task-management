<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first() ?? User::factory()->create([
            'name' => 'Matt Recruiter',
            'email' => 'matt@goteam.test',
            'password' => bcrypt('password'),
        ]);


        Task::factory()->count(6)->create(['user_id' => $user->id, 'date' => now()->toDateString()]);
        Task::factory()->count(10)->create(['user_id' => $user->id]);
    }
}
