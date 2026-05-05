<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'blog_id' => 'required|exists:blogs,id',
            'content' => 'required|string|max:100',
        ]);
        Comment::create([
            'user_id' => Auth::id(),
            'blog_id' => $data['blog_id'],
            'content' => $data['content'],
        ]);
        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {   
        Gate::authorize('update', $comment);
        $data = $request->validate([
            'content' => 'required|string|max:100'
        ]);
        $comment->update($data);
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        Gate::authorize('delete', $comment);
        $comment->delete();
        return back();
    }
}
