<?php

use PHPUnit\Framework\TestCase;

require_once 'Calculator.php';

/**
 * Calculator类测试
 */
class CalculatorTest extends TestCase
{
    private $calculator;

    /**
     * 在每个测试方法执行前初始化Calculator实例
     */
    protected function setUp(): void
    {
        $this->calculator = new Calculator();
    }

    /**
     * 测试加法运算
     */
    public function testAdd()
    {
        $this->assertEquals(5, $this->calculator->add(2, 3));
        $this->assertEquals(0, $this->calculator->add(0, 0));
        $this->assertEquals(-1, $this->calculator->add(-2, 1));
        $this->assertEquals(10.5, $this->calculator->add(5.5, 5));
    }

    /**
     * 测试减法运算
     */
    public function testSubtract()
    {
        $this->assertEquals(1, $this->calculator->subtract(3, 2));
        $this->assertEquals(0, $this->calculator->subtract(5, 5));
        $this->assertEquals(-3, $this->calculator->subtract(2, 5));
        $this->assertEquals(0.5, $this->calculator->subtract(5.5, 5));
    }

    /**
     * 测试乘法运算
     */
    public function testMultiply()
    {
        $this->assertEquals(6, $this->calculator->multiply(2, 3));
        $this->assertEquals(0, $this->calculator->multiply(5, 0));
        $this->assertEquals(-10, $this->calculator->multiply(-2, 5));
        $this->assertEquals(27.5, $this->calculator->multiply(5.5, 5));
    }

    /**
     * 测试除法运算
     */
    public function testDivide()
    {
        $this->assertEquals(2, $this->calculator->divide(6, 3));
        $this->assertEquals(0, $this->calculator->divide(0, 5));
        $this->assertEquals(-2, $this->calculator->divide(-6, 3));
        $this->assertEquals(1.1, $this->calculator->divide(5.5, 5));
    }

    /**
     * 测试除数为零时的异常抛出
     */
    public function testDivideByZeroThrowsException()
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('除数不能为零');
        $this->calculator->divide(10, 0);
    }

    /**
     * 测试幂运算
     */
    public function testPow()
    {
        $this->assertEquals(8, $this->calculator->pow(2, 3));
        $this->assertEquals(1, $this->calculator->pow(5, 0));
        $this->assertEquals(0.25, $this->calculator->pow(2, -2));
        $this->assertEquals(9, $this->calculator->pow(-3, 2));
        $this->assertEquals(16.0, $this->calculator->pow(2, 4));
    }

    /**
     * 测试平方根运算
     */
    public function testSqrt()
    {
        $this->assertEquals(2, $this->calculator->sqrt(4));
        $this->assertEquals(0, $this->calculator->sqrt(0));
        $this->assertEquals(3, $this->calculator->sqrt(9));
        $this->assertEquals(1.4142135623730951, $this->calculator->sqrt(2));
    }

    /**
     * 测试负数的平方根运算抛出异常
     */
    public function testSqrtOfNegativeNumberThrowsException()
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('不能计算负数的平方根');
        $this->calculator->sqrt(-4);
    }

    /**
     * 测试绝对值运算
     */
    public function testAbs()
    {
        $this->assertEquals(5, $this->calculator->abs(5));
        $this->assertEquals(5, $this->calculator->abs(-5));
        $this->assertEquals(0, $this->calculator->abs(0));
        $this->assertEquals(3.14, $this->calculator->abs(-3.14));
    }

    /**
     * 测试四舍五入运算
     */
    public function testRound()
    {
        $this->assertEquals(3, $this->calculator->round(2.5));
        $this->assertEquals(2, $this->calculator->round(2.4));
        $this->assertEquals(2.34, $this->calculator->round(2.344, 2));
        $this->assertEquals(2.35, $this->calculator->round(2.346, 2));
        $this->assertEquals(0, $this->calculator->round(0.4));
    }

    /**
     * 测试向下取整运算
     */
    public function testFloor()
    {
        $this->assertEquals(2, $this->calculator->floor(2.9));
        $this->assertEquals(-3, $this->calculator->floor(-2.1));
        $this->assertEquals(5, $this->calculator->floor(5));
        $this->assertEquals(0, $this->calculator->floor(0.1));
    }

    /**
     * 测试向上取整运算
     */
    public function testCeil()
    {
        $this->assertEquals(3, $this->calculator->ceil(2.1));
        $this->assertEquals(-2, $this->calculator->ceil(-2.9));
        $this->assertEquals(5, $this->calculator->ceil(5));
        $this->assertEquals(1, $this->calculator->ceil(0.1));
    }

    /**
     * 测试取模运算
     */
    public function testMod()
    {
        $this->assertEquals(1, $this->calculator->mod(5, 2));
        $this->assertEquals(0, $this->calculator->mod(6, 3));
        $this->assertEquals(2, $this->calculator->mod(7, 5));
        $this->assertEquals(-1, $this->calculator->mod(-5, 2));
        $this->assertEquals(1, $this->calculator->mod(5, -2));
    }

    /**
     * 测试取模运算除数为零时抛出异常
     */
    public function testModByZeroThrowsException()
    {
        $this->expectException(InvalidArgumentException::class);
        $this->expectExceptionMessage('除数不能为零');
        $this->calculator->mod(10, 0);
    }
}
