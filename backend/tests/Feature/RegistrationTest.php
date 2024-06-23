<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use App\Models\Registration;

class RegistrationTest extends TestCase
{
    public function testStoreRegistrationWithoutName()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/api/registration', [
                'email' => fake()->valid()->email,
                'cpf' => fake()->cpf(),
                'event_id' => 5,
            ]);

        $response->assertStatus(422);
    }

    public function testStoreRegistrationWithoutCpf()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/api/registration', [
                'name' => fake()->name,
                'email' => fake()->valid()->email,
                'event_id' => 5,
            ]);

        $response->assertStatus(422);
    }

    public function testStoreRegistrationWithCpfInvalid()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/api/registration', [
                'name' => fake()->name,
                'email' => fake()->valid()->email,
                'cpf' => '12345678901',
                'event_id' => 5,
            ]);

        $response->assertStatus(422);
    }

    public function testStoreRegistrationWithoutEvent()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)
            ->postJson('/api/registration', [
                'name' => fake()->name,
                'email' => fake()->valid()->email,
                'cpf' => fake()->cpf(),
            ]);

        $response->assertStatus(422);
    }

    public function testStoreRegistrationWithValidations()
    {
        $user = User::factory()->create();

        // Test with valid data
        $validData = [
            'name' => fake()->name,
            'email' => fake()->valid()->email,
            'cpf' => fake()->cpf(),
            'event_id' => 5,
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/registration', $validData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('registrations', $validData);

        // Test with invalid data
        $invalidData = [
            'name' => fake()->name,
            'email' => fake()->valid()->email,
            'cpf' => fake()->cpf(),
            'event_id' => 1,
        ];

        $response = $this->actingAs($user)
            ->postJson('/api/registration', $invalidData);

        $response->assertStatus(422);
    }

    public function testIndexRegistrationWithSearchAndPagination()
    {
        $user = User::factory()->create();

        // Create some registrations
        Registration::factory()->count(50)->create();

        // Test search
        $response = $this->actingAs($user)
            ->getJson('/api/registration?name=test');

        $response->assertStatus(200);
        $response->assertJsonCount(10, 'data'); // Default pagination is 10

        // Test pagination
        $response = $this->actingAs($user)
            ->getJson('/api/registration?per_page=5');

        $response->assertStatus(200);
        $response->assertJsonCount(5, 'data');
    }
}
