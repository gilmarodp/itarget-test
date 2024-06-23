<?php

namespace App\Http\Requests;

use App\Rules\EventNotFoundRule;
use App\Rules\EventRule;
use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'cpf' => 'required|cpf',
            'email' => 'required|email',
            'event_id' => [
                'required',
                new EventRule($this->get('cpf')),
            ],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'O campo nome é obrigatório',
            'name.string' => 'O campo nome deve ser uma string',
            'cpf.required' => 'O campo cpf é obrigatório',
            'cpf.cpf' => 'O campo cpf deve ser um cpf válido',
            'email.required' => 'O campo email é obrigatório',
            'email.email' => 'O campo email deve ser um email válido',
        ];
    }
}
