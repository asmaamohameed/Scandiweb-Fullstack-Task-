<?php

namespace Scandiweb\Validation\Rules;

use Scandiweb\Validation\Rule;

class RequiredRule implements Rule
{
    public function apply($field, $value, $data = null): bool
    {
        return !empty($value);
    }
    public function message(): string
    {
        return "The :attribute is required.";
    }
}
