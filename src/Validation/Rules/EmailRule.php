<?php

namespace Scandiweb\Validation\Rules;

use Scandiweb\Validation\Rule;

class EmailRule implements Rule
{
    public function apply($field, $value, $data = null): bool
    {
        return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
    }
    public function message(): string
    {
        return "The :attribute must be a valid email address.";
    }
}
