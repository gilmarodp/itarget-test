<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', 'App\Http\Controllers\Api\AuthController@login');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', 'App\Http\Controllers\Api\AuthController@logout');

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/events', 'App\Http\Controllers\Api\ItargetController@index');

    Route::resource('/registration', 'App\Http\Controllers\Api\RegistrationController')
        ->except(['create', 'edit']);
});
