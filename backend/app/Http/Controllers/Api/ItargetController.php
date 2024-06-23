<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ItargetController extends Controller
{
    public function index()
    {
        $itargetService = new \App\Http\Services\ItargetService();
        $events = $itargetService->getEvents();

        return response()->json($events);
    }
}
