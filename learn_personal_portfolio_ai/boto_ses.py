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
    boto_ses = boto3.Session(
        region_name="us-east-1",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
else:
    boto_ses = boto3.Session(region_name="us-east-1")

# Shared client instance - reuse across requests to avoid connection overhead
bedrock_runtime_client = boto_ses.client("bedrock-runtime")
