# -*- coding: utf-8 -*-
"""
AWS session and client factory.

Provides pre-configured boto3 session and clients for the entire codebase.
Import what you need:

    from .boto_ses import bedrock_runtime_client

One place handles credentials, everywhere else just uses the client.
"""

import os
import boto3

from .runtime import runtime

# On Vercel: explicit credentials from environment variables (serverless has no ~/.aws)
# Locally: use default credential chain (~/.aws/credentials or IAM role)
if runtime.is_vercel():
    access_key = os.environ.get("AWS_ACCESS_KEY_ID")
    secret_key = os.environ.get("AWS_SECRET_ACCESS_KEY")

    if not access_key or not secret_key:
        raise ValueError(
            "AWS credentials not found! "
            "Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in Vercel Environment Variables. "
            f"ACCESS_KEY: {bool(access_key)}, SECRET_KEY: {bool(secret_key)}"
        )

    boto_ses = boto3.Session(
        region_name="us-east-1",
        aws_access_key_id=access_key,
        aws_secret_access_key=secret_key,
    )
else:
    boto_ses = boto3.Session(region_name="us-east-1")

# Shared client instance - reuse across requests to avoid connection overhead
bedrock_runtime_client = boto_ses.client("bedrock-runtime")
