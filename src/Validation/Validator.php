<?php

namespace Scandiweb\Validation;

use Scandiweb\Validation\Rules\RequiredRule;
use Scandiweb\Validation\Rules\UniqueRule;
use Scandiweb\Validation\Rules\ConfirmedRule;
use Scandiweb\Validation\Rules\EmailRule;
use Scandiweb\Validation\Rules\MinRule;
use Scandiweb\Validation\Rules\MaxRule;
use Scandiweb\Validation\Rules\NumericRule;
use Scandiweb\Validation\Rules\AlphaNumirecRule;

class Validator
{
    protected $errors = [];
    protected $rules = [];
    protected $map = [];

    public function __construct()
    {
        $this->map = [
            'required' => new RequiredRule(),
            'unique' => new UniqueRule(),
            // 'confirmed' => new ConfirmedRule(),
            'email' => new EmailRule(),
            'min' => new MinRule(),
            'max' => new MaxRule(),
            'numeric' => new NumericRule(),
            'alphaNumirec' => new AlphaNumirecRule(),
        ];
    }
    public function setRules(array $rules)
    {
        $this->rules = $rules;
        return $this;
    }

    public function validate(array $data)
    {
        foreach ($this->rules as $field => $fieldRules) {
            $rules = explode('|', $fieldRules);
            foreach ($rules as $rule) {
                $ruleParts = is_string($rule) ? explode(':', $rule) : $rule;
                $ruleName = $ruleParts[0];
                $ruleValue = $ruleParts[1] ?? null;

                $ruleInstance = $this->map[$ruleName];

                if (!isset($ruleInstance)) {
                    throw new \Exception("Rule {$ruleName} is not supported");
                }

                $vaild = $ruleInstance->apply($field, trim($data[$field]), $ruleValue);

                if (!$vaild) {
                    $this->errors[$field][] = str_replace([':attribute', ':data'], [$field, $ruleValue], $ruleInstance->message());
                }
            }
        }
        return $this;
    }

    public function fails()
    {
        return !empty($this->errors);
    }
    public function errors()
    {
        return $this->errors;
    }
}
