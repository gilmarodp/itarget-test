<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\ItargetService;

class ItargetServiceTest extends TestCase
{
    protected $itargetService;

    public function setUp(): void
    {
        parent::setUp();
        $this->itargetService = new ItargetService();
    }

    public function testGetEvents()
    {
        $response = $this->itargetService->getEvents();

        $this->assertNotEmpty($response);
    }

    public function testGetEvent()
    {
        $response = $this->itargetService->getEvent(1);

        $this->assertEquals([
            'id' => 1,
            'name' => 'Evento de programação backend java',
            'start_date' => now()->format('Y-m-d'),
            'end_date' => now()->addDays(2)->format('Y-m-d'),
            'status' => false
        ], $response);
    }
}
