# -*- coding: utf-8 -*-

from learn_personal_portfolio_ai.source_code import add_two
from learn_personal_portfolio_ai.source_code import multiply_two
from learn_personal_portfolio_ai.source_code import divide_two

def test_add_two():
    assert add_two(1, 2) == 3
    assert add_two(-1, 1) == 0
    assert add_two(0, 0) == 0


def test_multiply_two():
    assert multiply_two(3, 4) == 12
    assert multiply_two(5, 0) == 0
    assert multiply_two(-2, 3) == -6


def test_divide_two():
    assert divide_two(10, 2) == 5
    assert divide_two(9, 3) == 3
    assert divide_two(-6, 2) == -3