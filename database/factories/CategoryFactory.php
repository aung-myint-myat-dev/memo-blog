<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            "Technology",
            "Programming",
            "Lifestyle",
            "Education",
            "Entertainment",
            "Travel"
        ];

        return [
            'name' => fake()->unique()->randomElement($categories),
            'slug' => function (array $attributes) {
                return Str::slug($attributes['name']) . '-' . rand(100, 999);
            }
        ];
    }
}
