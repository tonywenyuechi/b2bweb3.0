<?php

require_once 'Calculator.php';

/**
 * 简单的测试框架
 */
class SimpleTest
{
    private $passed = 0;
    private $failed = 0;
    private $total = 0;

    /**
     * 断言相等
     */
    public function assertEquals($expected, $actual, $message = '')
    {
        $this->total++;
        if ($expected === $actual) {
            $this->passed++;
            echo "✓ PASS: $message\n";
        } else {
            $this->failed++;
            echo "✗ FAIL: $message\n";
            echo "  Expected: $expected\n";
            echo "  Actual: $actual\n";
        }
    }

    /**
     * 断言为真
     */
    public function assertTrue($condition, $message = '')
    {
        $this->assertEquals(true, $condition, $message);
    }

    /**
     * 断言为假
     */
    public function assertFalse($condition, $message = '')
    {
        $this->assertEquals(false, $condition, $message);
    }

    /**
     * 断言抛出异常
     */
    public function assertThrows($callback, $expectedException, $message = '')
    {
        $this->total++;
        try {
            $callback();
            $this->failed++;
            echo "✗ FAIL: $message\n";
            echo "  Expected exception: $expectedException\n";
            echo "  No exception thrown\n";
        } catch (Exception $e) {
            if (get_class($e) === $expectedException || $e instanceof $expectedException) {
                $this->passed++;
                echo "✓ PASS: $message\n";
            } else {
                $this->failed++;
                echo "✗ FAIL: $message\n";
                echo "  Expected exception: $expectedException\n";
                echo "  Actual exception: " . get_class($e) . "\n";
            }
        }
    }

    /**
     * 输出测试结果汇总
     */
    public function summary()
    {
        echo "\n";
        echo "====================================\n";
        echo "测试结果汇总\n";
        echo "====================================\n";
        echo "总测试数: $this->total\n";
        echo "通过: $this->passed\n";
        echo "失败: $this->failed\n";
        echo "通过率: " . round(($this->passed / $this->total) * 100, 2) . "%\n";
        echo "====================================\n";
    }
}

// 创建测试实例
$test = new SimpleTest();
$calculator = new Calculator();

echo "开始测试 Calculator 类\n";
echo "====================================\n";

// 测试加法
$test->assertEquals(5, $calculator->add(2, 3), "2 + 3 应该等于 5");
$test->assertEquals(0, $calculator->add(0, 0), "0 + 0 应该等于 0");
$test->assertEquals(-1, $calculator->add(-2, 1), "-2 + 1 应该等于 -1");
$test->assertEquals(10.5, $calculator->add(5.5, 5), "5.5 + 5 应该等于 10.5");

echo "\n";

// 测试减法
$test->assertEquals(1, $calculator->subtract(3, 2), "3 - 2 应该等于 1");
$test->assertEquals(0, $calculator->subtract(5, 5), "5 - 5 应该等于 0");
$test->assertEquals(-3, $calculator->subtract(2, 5), "2 - 5 应该等于 -3");
$test->assertEquals(0.5, $calculator->subtract(5.5, 5), "5.5 - 5 应该等于 0.5");

echo "\n";

// 测试乘法
$test->assertEquals(6, $calculator->multiply(2, 3), "2 * 3 应该等于 6");
$test->assertEquals(0, $calculator->multiply(5, 0), "5 * 0 应该等于 0");
$test->assertEquals(-10, $calculator->multiply(-2, 5), "-2 * 5 应该等于 -10");
$test->assertEquals(27.5, $calculator->multiply(5.5, 5), "5.5 * 5 应该等于 27.5");

echo "\n";

// 测试除法
$test->assertEquals(2, $calculator->divide(6, 3), "6 / 3 应该等于 2");
$test->assertEquals(0, $calculator->divide(0, 5), "0 / 5 应该等于 0");
$test->assertEquals(-2, $calculator->divide(-6, 3), "-6 / 3 应该等于 -2");
$test->assertEquals(1.1, $calculator->divide(5.5, 5), "5.5 / 5 应该等于 1.1");

echo "\n";

// 测试除数为零
$test->assertThrows(function() use ($calculator) {
    $calculator->divide(10, 0);
}, 'InvalidArgumentException', "10 / 0 应该抛出 InvalidArgumentException");

// 输出测试结果
$test->summary();
