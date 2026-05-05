<?php

namespace App\Http\Controllers;

use App\helpers\ImageManager;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Index', [
            'blogs' => Inertia::scroll(fn () => Blog::with('user', 'category')->latest()->paginate(10)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all()->select('id', 'name');
        return Inertia::render('Blog/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'category_id' => "required|exists:categories,id",
            'title' => "required|string|max:100",
            'description' => "required|string|max:200",
            'content' => "required|string",
            'cover_image' => "nullable|image|mimes:jpeg,png,jpg|max:2048"
        ]);
        
        $userId = Auth::id();

        $slug = Str::slug($data['title'] . '-' . rand(100, 999));

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = ImageManager::storeImage($request->file('cover_image'), 'covers', 'public');
        }

        $blog = Blog::create([
            'user_id' => $userId,
            'category_id' => $data['category_id'],
            'slug' => $slug,
            'title' => $data['title'],
            'description' => $data['description'],
            'content' => $data['content'],
            'cover_image' => $data['cover_image'] ?? null,
        ]);

        Inertia::flash('toast', [
            'message' => 'Blog created successfully.',
            'id' => $blog->id,
        ]);

        return redirect('/profile');
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        $blog->load(['user', 'comments' => function ($query) {
            $query->with('user')->latest();
        }, 'category']);

        return Inertia::render('Blog/Show', [
            'blog' => $blog,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blog $blog)
    {
        Gate::authorize('update', $blog);

        $categories = Category::all()->select('id', 'name');

        return Inertia::render('Blog/Edit', [
            'categories' => $categories,
            'blog' => $blog,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        Gate::authorize('update', $blog);

        $data = $request->validate([
            'category_id' => "required|exists:categories,id",
            'title' => "required|string|max:100",
            'description' => "required|string|max:200",
            'content' => "required|string",
            'cover_image' => "nullable|image|mimes:jpeg,png,jpg|max:2048"
        ]);

        if($blog->title !== $data['title']) {
            $data['slug'] = Str::slug($data['title']). '-' . rand(100,999);
        }

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = ImageManager::storeImage($request->file('cover_image'), 'covers', 'public', $blog->cover_image);
        } else {
            $data['cover_image'] = $blog->cover_image;
        }

        $blog->update($data);

        Inertia::flash('toast', [
            'message' => 'Blog updated successfully.',
            'id' => $blog->id,
        ]);

        return redirect('/home');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        Gate::authorize('delete', $blog);
        ImageManager::deleteImage($blog->cover_image, 'public');
        $blog->delete();

        Inertia::flash('toast', [
            'message' => 'Blog deleted successfully.',
            'id' => microtime(),
        ]);

        return back();
    }

    public function deleteCoverImage(Blog $blog)
    {
        Gate::authorize('delete', $blog);
        ImageManager::deleteImage($blog->cover_image, 'public');

        $blog->update([
            'cover_image' => null,
        ]);

        $blog->visibleCoverImage = null;

        Inertia::flash('toast', [
            'message' => "You have deleted this blog's cover image.",
            'id' => microtime(),
        ]);

        return back();
    }
}
