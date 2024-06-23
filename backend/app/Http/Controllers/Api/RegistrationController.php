<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    public function index(Request $request)
    {
        $registrations = Registration::when($request->has('name'), function ($query) use ($request) {
            return $query->where('name', 'like', "%{$request->name}%");
        })
            ->paginate($request->per_page ?? 10);

        return response()->json($registrations);
    }

    public function store(RegistrationRequest $request)
    {
        Registration::create($request->validated());

        return response()->json(['message' => 'Inscrição realizada com sucesso'], 201);
    }
}
