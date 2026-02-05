# -*- coding: utf-8 -*-

from pathlib import Path
from functools import cached_property


class PathEnum:
    dir_package = Path(__file__).absolute().parent
    dir_project_root = dir_package.parent
    dir_venv = dir_project_root / ".venv"
    dir_tests = dir_project_root / "tests"

    @cached_property
    def dir_home(self) -> Path:
        return Path.home()

path_enum = PathEnum()
