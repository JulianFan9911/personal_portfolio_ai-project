# -*- coding: utf-8 -*-

"""

"""

import typing as T
import dataclasses

from func_args.api import OPT, remove_optional
import boto3_dataclass_bedrock_runtime

from rich import print as rprint

if T.TYPE_CHECKING:  # pragma: no cover
    from mypy_boto3_bedrock_runtime import Client
    from mypy_boto3_bedrock_runtime.type_defs import (
        SystemContentBlockTypeDef,
        MessageUnionTypeDef,
    )
    from boto3_dataclass_bedrock_runtime.type_defs import (
        ConverseResponse,
    )


@dataclasses.dataclass
class ChatSession:
    client: "Client" = dataclasses.field()
    model_id: str = dataclasses.field()
    system: T.Sequence["SystemContentBlockTypeDef"] = dataclasses.field(default=OPT)

    _session_id: str = dataclasses.field(init=False)
    _messages: list["MessageUnionTypeDef"] = dataclasses.field(init=False)

    def __post_init__(self):
        self._session_id = "abc"
        self._messages = []

    def send_message(
        self,
        messages: T.Sequence["MessageUnionTypeDef"],
    ) -> "ConverseResponse":
        print("===== Send message")
        self._messages.extend(messages)
        kwargs = dict(
            modelId=self.model_id,
            messages=self._messages,
            system=self.system,
        )
        kwargs = remove_optional(**kwargs)
        print("----- Converse kwargs:")
        rprint(kwargs)
        response = self.client.converse(**kwargs)
        response = boto3_dataclass_bedrock_runtime.caster.converse(response)
        print("----- Converse response:")
        del response.boto3_raw_data["ResponseMetadata"]
        rprint(response.boto3_raw_data)
        self._messages.append(response.output.message.boto3_raw_data)
        return response

    def send_text_message(
        self,
        message: str,
    ) -> "ConverseResponse":
        return self.send_message(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "text": message,
                        },
                    ],
                }
            ],
        )

    def send_text_message_with_cache(self):
        pass
