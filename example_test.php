<?php

use PHPUnit\Framework\TestCase;

/**
 * 示例PHP测试类
 */
class ExampleTest extends TestCase
{
    /**
     * 测试加法功能
     */
    public function testAddition()
    {
        $this->assertEquals(4, 2 + 2);
        $this->assertEquals(0, 0 + 0);
        $this->assertEquals(-1, -2 + 1);
    }

    /**
     * 测试字符串拼接
     */
    public function testStringConcatenation()
    {
        $this->assertEquals('Hello World', 'Hello' . ' ' . 'World');
        $this->assertEquals('PHP', 'P' . 'H' . 'P');
    }

    /**
     * 测试数组操作
     */
    public function testArrayOperations()
    {
        $array = [1, 2, 3];
        $this->assertCount(3, $array);
        $this->assertEquals(2, $array[1]);
        $this->assertContains(3, $array);
    }

    /**
     * 测试布尔值
     */
    public function testBooleanValues()
    {
        $this->assertTrue(true);
        $this->assertFalse(false);
        $this->assertTrue(1 == true);
        $this->assertFalse(0 == true);
    }
}
