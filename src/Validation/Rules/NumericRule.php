<?php

namespace Scandiweb\Validation\Rules;

use Scandiweb\Validation\Rule;

class NumericRule implements Rule
{
    public function apply($field, $value, $data = null): bool
    {
        return is_numeric($value);
    }
    public function message(): string
    {
        return "The :attribute must be a number.";
    }
}
