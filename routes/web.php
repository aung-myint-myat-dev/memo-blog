<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Profile\ProfileController;
use App\Models\Blog;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::inertia('/', 'Guest/About');
    Route::inertia('/contact', 'Guest/Contact');

    Route::controller(AuthController::class)->group(function () {
        Route::get('/login', 'showLogin')->name('login');
        Route::post('/login', 'login')->name('login.post');
        Route::get('/register', 'showRegister')->name('register');
        Route::post('/register', 'store')->name('register.post');
    });
});


Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::delete('/delete-account', [AuthController::class, 'destroy']);
    Route::controller(BlogController::class)->group(function () {
        Route::get('/home', 'index');
        Route::get('/create', 'create');
        Route::post('/create', 'store');
        Route::get('/blog/edit/{blog:slug}', 'edit');
        Route::delete('/blog/{blog:slug}/cover-image', 'deleteCoverImage');
        Route::get('/blog/{blog:slug}', 'show');
        Route::put('/blog/{blog:slug}', 'update');
        Route::delete('/{blog:slug}', 'destroy');
    });

    Route::controller(CommentController::class)->group(function () {
        Route::post('/comment', 'store');
        Route::delete('/comment/{comment:id}', 'destroy');
        Route::put('/comment/{comment:id}', 'update');
    });

    Route::controller(ProfileController::class)->group(function () {
        Route::get('/profile', 'profile');
        Route::get('/followers', 'getFollowers');
        Route::get('/followings', 'getFollowings');
        Route::post('/profile/follow/{user:id}', 'toggleFollow');
        Route::put('/profile/upload-image/{user:id}', 'uploadImage');
        Route::put('/profile/remove-image/{user:id}', 'removeImage');
        Route::get('/profile/{user:name}/followers', 'showFollowers');
        Route::get('/profile/{user:name}/followings', 'showFollowings');
        Route::get('/profile/{user:name}', 'show');
    });
});
