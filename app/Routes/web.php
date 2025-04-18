<?php

namespace App\Routes;

use Scandiweb\Http\Route;   

Route::get('/graphql', [\App\Http\Controllers\GraphQLController::class, 'index']);
Route::post('/graphql', [\App\Http\Controllers\GraphQLController::class, 'index']);

