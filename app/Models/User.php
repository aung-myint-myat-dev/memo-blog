<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\helpers\ImageManager;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Carbon;

#[Fillable(['name', 'email', 'password', 'profile_image'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    protected $appends = ['visible_profile_image'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function blogs(): HasMany
    {
        return $this->hasMany(Blog::class);
    }

    public function followers(): BelongsToMany 
    {
        return $this->belongsToMany(User::class, 'follows', 'following_id', 'follower_id')->withPivot('created_at')->withTimestamps();
    }

    public function followings(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'following_id')->withPivot('created_at')->withTimestamps();
    }

    public function visibleProfileImage(): Attribute
    {
        return Attribute::get(function () {
            return ImageManager::getImage($this->profile_image, $this->name, ' ');
        });
    }

    public function readableFollowedAt(): Attribute
    {
        return Attribute::make(function () {
            if($this->pivot && $this->pivot->created_at) {
                return Carbon::parse($this->pivot->created_at)->diffForHumans();
            }
            return null;
        });
    }
}
