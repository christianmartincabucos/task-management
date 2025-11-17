<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Testing\Fluent\Concerns\Has;

class Task extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'user_id',
        'statement',
        'is_done',
        'date',
        'priority',
        'order',
        ];
        
        
        protected $casts = [
            'is_done' => 'boolean',
            'date' => 'date:Y-m-d',
        ];
        
        
        public function user()
        {
            return $this->belongsTo(User::class);
        }
}
