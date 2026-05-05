<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Category;
use App\Models\Comment;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // $categories = Category::factory()->count(6)->create();
        // $users = User::factory()->count(20)->create();
        // $blogs = Blog::factory()->recycle($categories)->recycle($users)->count(30)->create();
        // $comments = Comment::factory()->recycle($users)->recycle($blogs)->count(50)->create();

        // $users->each(function ($user) use ($users) {
        //     $otherUserIds = $users->where('id', '!=', $user->id)->pluck('id');
        //     $user->followings()->attach($otherUserIds->random(rand(1,5)));
        // });

        if (Category::count() === 0) {
            Category::factory()->count(6)->create();
        }

        User::firstOrCreate(
            ['email' => 'test@gmail.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
            ]
        );
    }
}
