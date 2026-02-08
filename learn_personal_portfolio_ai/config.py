# -*- coding: utf-8 -*-

import os
import dataclasses

from .runtime import runtime


@dataclasses.dataclass
class Config:
    aws_region: str | None = dataclasses.field(default=None)
    aws_access_key_id: str | None = dataclasses.field(default=None)
    aws_secret_access_key: str | None = dataclasses.field(default=None)

    @classmethod
    def new_in_local_runtime(cls):
        """
        use default credential chain (~/.aws/credentials or IAM role)
        """
        return cls(
            aws_region="us-east-1",
        )

    @classmethod
    def new_in_vercel_runtime(cls):
        """
        explicit credentials from environment variables (serverless has no ~/.aws)
        """
        return cls(
            aws_region="us-east-1",
            aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
            aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
        )

    @classmethod
    def new(cls):
        if runtime.is_local():
            return cls.new_in_local_runtime()
        elif runtime.is_vercel():
            return cls.new_in_vercel_runtime()
        else:  # pragma: no cover
            raise RuntimeError


config = Config.new()
