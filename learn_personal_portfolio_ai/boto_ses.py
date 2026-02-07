# -*- coding: utf-8 -*-

import boto3

boto_ses = boto3.Session(region_name="us-east-1")
bedrock_runtime_client = boto_ses.client("bedrock-runtime")
