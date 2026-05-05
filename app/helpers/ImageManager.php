<?php

namespace App\helpers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageManager {
    static function storeImage($image, $folder, $disk, $oldImage = null)
    {
        if($oldImage && Storage::disk($disk)->exists($oldImage)) {
            Storage::disk($disk)->delete($oldImage);
        }

        return Storage::disk($disk)->putFile($folder, $image);
    }

    static function deleteImage($image, $disk)
    {
        if($image && Storage::disk($disk)->exists($image)) {
            Storage::disk($disk)->delete($image);
        }
    }

    static function getImage($image, $placeholder, $sperator)
    {
        if($image) {
            return Storage::url($image);
        }

        $words = explode($sperator, $placeholder);
        $ucLetters = '';

        if(count($words) >= 2) {
            $ucLetters = Str::upper(substr($words[0], 0, 1) . substr($words[1], 0, 1));
        } else {
            $ucLetters = Str::upper(substr($placeholder, 0, 2));
        }

        return "https://placehold.co/400x400?text=$ucLetters";
    }
}