# -*- coding: utf-8 -*-

"""
Adapter module for converting Vercel AI SDK format to AWS Bedrock format.

This module bridges the gap between the frontend (using Vercel AI SDK) and
the backend (using AWS Bedrock). It transforms message structures from
AI SDK's format into Bedrock Converse API's expected format.

The Vercel AI SDK sends messages in a specific format with 'parts' (for
multi-modal content support), while Bedrock expects a different structure.
This adapter handles that translation.

Dependencies:
- vercel_ai_sdk_mate: https://pypi.org/project/vercel-ai-sdk-mate/
  Provides typed dataclass wrappers for Vercel AI SDK request/response formats,
  making it easier to work with the JSON data from the frontend.
"""

import vercel_ai_sdk_mate.api as vercel_ai_sdk_mate


def part_to_bedrock_content(part: vercel_ai_sdk_mate.T_PART) -> dict:
    """
    Convert an AI SDK message part to Bedrock content block format.

    AI SDK uses 'parts' to support multi-modal content (text, images, etc.).
    This function converts each part to Bedrock's content block format.

    Args:
        part: A message part from AI SDK (text, image, etc.).

    Returns:
        dict: Bedrock content block (e.g., {"text": "Hello"}).

    Raises:
        TypeError: If the part type is not supported (e.g., image, file).
    """
    if part.type == vercel_ai_sdk_mate.MessagePartTypeEnum.TEXT.value:
        return {"text": part.text}
    else:
        # Currently only text is supported; extend here for images, files, etc.
        raise TypeError(f"Unsupported part type: {part.type}")


def message_to_bedrock_message(message: vercel_ai_sdk_mate.Message) -> dict | None:
    """
    Convert an AI SDK message to Bedrock message format.

    Handles role mapping between AI SDK and Bedrock:
    - AI SDK 'user' -> Bedrock 'user'
    - AI SDK 'assistant' -> Bedrock 'assistant'
    - AI SDK 'system' -> Skipped (Bedrock handles system prompts separately)

    Args:
        message: An AI SDK message object containing role and parts.

    Returns:
        dict: Bedrock message format with 'role' and 'content' fields,
              or None if the role is not mappable (e.g., system).
    """
    # Map AI SDK roles to Bedrock roles
    # Note: Bedrock Converse API handles system prompts separately,
    # so there's no direct mapping for the 'system' role
    ai_sdk_role_to_bedrock_role_mapping = {
        vercel_ai_sdk_mate.MessageRoleEnum.USER.value: "user",
        vercel_ai_sdk_mate.MessageRoleEnum.ASSISTANT.value: "assistant",
    }

    if message.role in ai_sdk_role_to_bedrock_role_mapping:
        return {
            "role": ai_sdk_role_to_bedrock_role_mapping[message.role],
            "content": [part_to_bedrock_content(part) for part in message.parts],
        }
    else:
        # Skip messages with unmapped roles (e.g., system messages)
        return None


def request_body_to_bedrock_converse_messages(
    request_body: vercel_ai_sdk_mate.RequestBody,
) -> list[dict]:
    """
    Convert an entire AI SDK request body to Bedrock message list.

    This is the main entry point for converting frontend chat history
    into Bedrock's expected format. It processes all messages in the
    request and filters out any that can't be mapped.

    Args:
        request_body: The parsed request body from the AI SDK frontend,
                      containing the full conversation history.

    Returns:
        list[dict]: List of Bedrock-formatted messages ready for the
                    Converse API's 'messages' parameter.

    Example:
        >>> request_body = RequestBody(**await request.json())
        >>> bedrock_messages = request_body_to_bedrock_converse_messages(request_body)
        >>> # bedrock_messages can now be passed to ChatSession
    """
    messages = []
    for message in request_body.messages:
        bedrock_message = message_to_bedrock_message(message)
        if bedrock_message is not None:
            messages.append(bedrock_message)
    return messages
