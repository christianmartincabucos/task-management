<?php

use App\Models\User;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;


uses(RefreshDatabase::class)->beforeEach(function () {
    $this->withHeader('Accept', 'application/json');
})->in('Feature');

it('creates a task successfully', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum')
    ->postJson('/api/tasks', [
    'statement' => 'Test task',
    'date' => now()->toDateString(),
    ])->assertStatus(201)->assertJsonFragment(['statement' => 'Test task']);
});


it('validates required fields when creating', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum')
    ->postJson('/api/tasks', [])->assertStatus(422);
});


it('returns tasks for a date', function () {
    $user = User::factory()->create();
    Task::factory()->create(['user_id' => $user->id, 'date' => now()->toDateString()]);


    $this->actingAs($user, 'sanctum')
    ->getJson('/api/tasks?date=' . now()->toDateString())
    ->assertStatus(200)->assertJsonStructure(['data']);
});


it('prevents non-owner from deleting task', function () {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $task = Task::factory()->create(['user_id' => $owner->id]);


    $this->actingAs($other, 'sanctum')
    ->deleteJson('/api/tasks/' . $task->id)
    ->assertStatus(403);
});


it('reorders tasks', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'sanctum');


    $date = today()->toDateString();
    $t1 = Task::factory()->create(['user_id' => $user->id, 'date' => $date, 'order' => 0]);
    $t2 = Task::factory()->create(['user_id' => $user->id, 'date' => $date, 'order' => 1]);


    $this->postJson('/api/tasks/reorder', ['date' => $date, 'ordered_ids' => [$t2->id, $t1->id]])->assertStatus(200);


    expect(Task::find($t2->id)->order)->toBe(0);
    expect(Task::find($t1->id)->order)->toBe(1);
});