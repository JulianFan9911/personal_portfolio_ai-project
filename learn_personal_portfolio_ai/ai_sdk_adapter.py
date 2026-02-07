# -*- coding: utf-8 -*-

import vercel_ai_sdk_mate.api as vercel_ai_sdk_mate


def part_to_bedrock_content(part: vercel_ai_sdk_mate.T_PART):
    if part.type == vercel_ai_sdk_mate.MessagePartTypeEnum.TEXT.value:
        return {"text": part.text}
    else:
        raise TypeError(f"Unsupported part type: {part.type}")


def message_to_bedrock_message(message: vercel_ai_sdk_mate.Message):
    ai_sdk_role_to_bedrock_role_mapping = {
        # There's no corresponding "system" role in Bedrock Converse API
        # vercel_ai_sdk_mate.MessageRoleEnum.SYSTEM.value
        vercel_ai_sdk_mate.MessageRoleEnum.USER.value: "user",
        vercel_ai_sdk_mate.MessageRoleEnum.ASSISTANT.value: "assistant",
    }
    if message.role in ai_sdk_role_to_bedrock_role_mapping:
        return {
            "role": ai_sdk_role_to_bedrock_role_mapping[message.role],
            "content": [part_to_bedrock_content(part) for part in message.parts],
        }
    else:
        return None


def request_body_to_bedrock_converse_messages(
    request_body: vercel_ai_sdk_mate.RequestBody,
):
    messages = []
    for message in request_body.messages:
        bedrock_message = message_to_bedrock_message(message)
        if bedrock_message is not None:
            messages.append(bedrock_message)
    return messages
