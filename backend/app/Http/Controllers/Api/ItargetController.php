<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ItargetService;

class ItargetController extends Controller
{
    public function index()
    {
        $itargetService = new ItargetService();
        $events = $itargetService->getEvents();

        return response()->json($events);
    }

    public function show(int $id)
    {
        $itargetService = new ItargetService();
        $event = $itargetService->getEvent($id);

        return response()->json($event);
    }
}
