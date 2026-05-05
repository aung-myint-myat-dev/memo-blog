<?php

namespace App\Http\Controllers\Profile;

use App\helpers\ImageManager;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function profile(Request $request)
    {
        $user = $request->user()->load(['blogs.user', 'blogs.category', 'followers', 'followings']);
        return Inertia::render('Profile/Index', [
            'user' => $user,
            'isMyProfile' => true,
        ]);
    }

    public function uploadImage(Request $request, User $user)
    {
        if (Auth::id() !== $user->id) {
            return abort(403);
        }

        $data = $request->validate([
            'profile_image' => 'required|image|mimes:png,jpg,jpeg|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            $data['profile_image'] = ImageManager::storeImage($request->file('profile_image'), 'profiles', 'public', $user->profile_image);
        } else {
            $data['profile_image'] = $user->profile_image;
        }

        $user->update([
            'profile_image' => $data['profile_image'],
        ]);

        Inertia::flash('toast', [
            'message' => 'Profile uploaded successfully.',
            'id' => $user->id,
        ]);

        return back();
    }

    public function removeImage(User $user)
    {
        if (Auth::id() !== $user->id) {
            return abort(403);
        }

        if(!$user->profile_image) {
            return back()->with('toast', [
                'message' => 'You have no image to delete.',
                'id' => $user->id,
            ]);
        }

        ImageManager::deleteImage($user->profile_image, 'public');
        $user->update([ 'profile_image' => null, ]);

        Inertia::flash('toast', [
            'message' => 'Profile image removed successfully.',
            'id' => $user->id,
        ]);

        return back();
    }

    public function show(Request $request, User $user)
    {
        $user->load(['blogs.user', 'blogs.category', 'followers', 'followings']);

        $isFollowed = $request->user()->followings()->where('following_id', $user->id)->exists();

        return Inertia::render('Profile/Index', [
            'user' => $user,
            'isMyProfile' => false,
            'isFollowed' => $isFollowed,
        ]);
    }

    public function toggleFollow(Request $request, User $user)
    {
        $follower = $request->user();

        if ($follower->id === $user->id) {
            return back()->withErrors('error', 'You cannot follow yourself');
        }

        $follower->followings()->toggle($user->id);

        return back();
    }

    public function getFollowers(Request $request)
    {
        $user = $request->user();
        $followers = $user->followers()->get()->append('readable_followed_at');
        return Inertia::render('Profile/Followers', [
            'followers' => $followers,
        ]);
    }

    public function showFollowers(User $user)
    {
        $followers = $user->followers()->get()->append('readable_followed_at');
        return Inertia::render('Profile/Followers', [
            'followers' => $followers,
        ]);
    }

    public function showFollowings(User $user)
    {
        $followings = $user->followings()->get()->append('readable_followed_at');
        return Inertia::render('Profile/Followings', [
            'followings' => $followings,
        ]);
    }

    public function getFollowings(Request $request)
    {
        $user = $request->user();
        $followings = $user->followings()->get()->append('readable_followed_at');
        return Inertia::render('Profile/Followings', [
            'followings' => $followings,
        ]);
    }
}
