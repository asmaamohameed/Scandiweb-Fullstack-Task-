<?php 

namespace Scandiweb\Validation\Rules;

use Scandiweb\Models\User;
use Scandiweb\Validation\Rule;

class UniqueRule implements Rule
{
    public function apply($field, $value, $data = null): bool
    {
        $user = new User();
        $emailExisit = $user->emailExists($value);
        return !$emailExisit;
        
    }
    public function message(): string
    {
        return "The :attribute is already taken.";
    }
}