<?php

namespace Database\Factories;

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => fake()->sentence(),
            'slug' => function (array $attributes) {
                return Str::slug($attributes['title']). '-'. rand(100,999);
            },
            'description' => fake()->sentence(),
            'content' => fake()->paragraphs(rand(3,5), true),
            'cover_image' => 'https://picsum.photos/640/480',
        ];
    }
}
