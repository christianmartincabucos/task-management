<?php

namespace Database\Factories;

use App\Models\Task;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{    
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        
        return [
            'user_id' => null, // set when used
            'statement' => $this->faker->sentence(6),
            'is_done' => $this->faker->boolean(20),
            'date' => $this->faker->dateTimeBetween('-10 days', '+10 days')->format('Y-m-d'),
            'priority' => $this->faker->numberBetween(1,5),
            'order' => 0,
        ];
    }
}
