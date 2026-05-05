<?php

namespace App\Models;

use App\Models\Comment as ModelsComment;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\helpers\ImageManager;

#[Fillable(['user_id', 'category_id', 'title', 'slug', 'description', 'content', 'cover_image'])]
class Blog extends Model
{
    /** @use HasFactory<\Database\Factories\BlogFactory> */
    use HasFactory;

    protected $appends = ['readable_created_at', 'visible_cover_image'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ModelsComment::class);
    }

    public function readableCreatedAt(): Attribute
    {
        return Attribute::make(function () {
            return $this->created_at->diffForHumans();
        });
    }

    public function visibleCoverImage(): Attribute
    {
        return Attribute::make(function () {
            return ImageManager::getImage($this->cover_image, $this->slug, '-');
        });
    }
}
