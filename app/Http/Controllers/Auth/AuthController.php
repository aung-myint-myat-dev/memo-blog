<?php

namespace App\Http\Controllers\Auth;

use App\helpers\ImageManager;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|max:255|email|unique:users,email',
            'password' => 'required|string',
            'password_confirmation' => 'required|same:password',
        ]);

        $user = User::create($data);

        Auth::login($user);

        Inertia::flash('toast', [
            'message' => "Welcome to Memo. Hello $user->name",
            'id' => $user->id,
        ]);

        return redirect('/home');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required',
            'remember_token' => 'nullable|boolean',
        ]);

        $credentials = $request->only('email', 'password');

        $remember_token = $request->boolean('remember_token');

        if (Auth::attempt($credentials, $remember_token)) {
            $request->session()->regenerate();
            $username = Auth::user()->name;

            Inertia::flash('toast', [
                'message' => "Welcomw back $username",
                'id' => microtime(),
            ]);
            return redirect()->intended('/home');
        }

        return back()->withErrors([
            'email' => 'Your credentials are not match!.'
        ])->onlyInput('email');
    }

    public function logout()
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        return redirect('/');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        foreach($user->blogs as $blog) {
            if($blog->cover_image) {
                ImageManager::deleteImage($blog->cover_image, 'public');
            }
        }

        if($user->profile_image) {
            ImageManager::deleteImage($user->profile_image, 'public');
        }

        Auth::logout();
        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
