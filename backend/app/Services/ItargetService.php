<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class ItargetService
{
    protected string $url;

    public function __construct()
    {
        $this->url = 'https://demo.ws.itarget.com.br';
    }

    public function getEvents()
    {
        $response = Http::get("{$this->url}/event.php");

        return $response->json()['data'];
    }

    public function getEvent(int $id)
    {
        $response = Http::get("{$this->url}/event.php")->json()['data'];

        return collect($response)->values()->where('id', $id)->first();
    }
}
