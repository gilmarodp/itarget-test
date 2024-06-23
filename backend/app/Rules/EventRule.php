<?php

namespace App\Rules;

use App\Models\Registration;
use App\Services\ItargetService;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class EventRule implements ValidationRule
{
    protected ?string $cpf;

    public function __construct(?string $cpf)
    {
        $this->cpf = $cpf;
    }

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$this->cpf) {
            $fail("O campo cpf é obrigatório.");
            return;
        }

        $itarget = new ItargetService();
        $event = $itarget->getEvent($value);

        if (!$event) {
            $fail("O evento com id {$value} não foi encontrado.");
            return;
        }

        if ($event['status'] === false) {
            $fail("O evento \"{$event['name']}\" está inativo, portanto não é possível realizar inscrições.");
            return;
        }

        $registrationExists = Registration::where('cpf', $this->cpf)
            ->where('event_id', $value)
            ->exists();

        if ($registrationExists) {
            $fail("Você já está inscrito no evento \"{$event['name']}\".");
            return;
        }

        $registrations = Registration::where('cpf', $this->cpf)
            ->get();

        if ($registrations->isNotEmpty()) {
            $events = collect($itarget->getEvents());
            $start = Carbon::parse($event['start_date']);
            $end = Carbon::parse($event['end_date']);

            foreach ($registrations as $registration) {
                $newEvent = $events->where('id', $registration->event_id)->first();

                $registrationStart = Carbon::parse($event['start_date']);
                $registrationEnd = Carbon::parse($event['end_date']);

                if (($start->greaterThanOrEqualTo($registrationStart) && $start->lessThan($registrationEnd)) || ($end->greaterThan($registrationStart) && $end->lessThanOrEqualTo($registrationEnd))) {
                    $fail("Você já está inscrito no evento \"{$newEvent['name']}\" que ocorre no mesmo período do evento \"{$event['name']}\".");
                    return;
                }
            }
        }
    }
}
