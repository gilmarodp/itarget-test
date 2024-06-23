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
            'start_date' => '2024-06-23',
            'end_date' => '2024-06-25',
            'status' => false
        ], $response);
    }
}
