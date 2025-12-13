<?php

/**
 * 计算器类
 */
class Calculator
{
    /**
     * 加法运算
     * @param int|float $a
     * @param int|float $b
     * @return int|float
     */
    public function add($a, $b)
    {
        return $a + $b;
    }

    /**
     * 减法运算
     * @param int|float $a
     * @param int|float $b
     * @return int|float
     */
    public function subtract($a, $b)
    {
        return $a - $b;
    }

    /**
     * 乘法运算
     * @param int|float $a
     * @param int|float $b
     * @return int|float
     */
    public function multiply($a, $b)
    {
        return $a * $b;
    }

    /**
     * 除法运算
     * @param int|float $a
     * @param int|float $b
     * @return int|float
     * @throws InvalidArgumentException
     */
    public function divide($a, $b)
    {
        if ($b == 0) {
            throw new InvalidArgumentException('除数不能为零');
        }
        return $a / $b;
    }

    /**
     * 幂运算
     * @param int|float $base 底数
     * @param int|float $exponent 指数
     * @return int|float
     */
    public function pow($base, $exponent)
    {
        return pow($base, $exponent);
    }

    /**
     * 平方根运算
     * @param int|float $number
     * @return float
     * @throws InvalidArgumentException
     */
    public function sqrt($number)
    {
        if ($number < 0) {
            throw new InvalidArgumentException('不能计算负数的平方根');
        }
        return sqrt($number);
    }

    /**
     * 绝对值运算
     * @param int|float $number
     * @return int|float
     */
    public function abs($number)
    {
        return abs($number);
    }

    /**
     * 四舍五入运算
     * @param int|float $number
     * @param int $precision 小数位数，默认0
     * @return float
     */
    public function round($number, $precision = 0)
    {
        return round($number, $precision);
    }

    /**
     * 向下取整运算
     * @param int|float $number
     * @return float
     */
    public function floor($number)
    {
        return floor($number);
    }

    /**
     * 向上取整运算
     * @param int|float $number
     * @return float
     */
    public function ceil($number)
    {
        return ceil($number);
    }

    /**
     * 取模运算
     * @param int|float $dividend 被除数
     * @param int|float $divisor 除数
     * @return int|float
     * @throws InvalidArgumentException
     */
    public function mod($dividend, $divisor)
    {
        if ($divisor == 0) {
            throw new InvalidArgumentException('除数不能为零');
        }
        return $dividend % $divisor;
    }
}
