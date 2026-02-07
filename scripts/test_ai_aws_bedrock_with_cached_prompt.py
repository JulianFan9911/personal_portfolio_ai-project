# -*- coding: utf-8 -*-

"""
Prompt Caching with Amazon Bedrock

Demonstrates how prompt caching reduces costs for static content.

COST SAVINGS: Up to 90% reduction on cached input tokens.
- First call: Tokens WRITTEN to cache (normal price)
- Subsequent calls: Tokens READ from cache (~10% of normal price!)

HOW IT WORKS:
    [Static content] + [cachePoint] + [Question]
                            ↑
              Cache boundary marker

SUPPORTED MODELS: Claude 3.5 Haiku, Claude 3.7 Sonnet, Nova Micro/Lite/Pro
"""

import boto3


def create_bedrock_client():
    """Create Bedrock runtime client."""
    session = boto3.Session()
    return session.client(service_name="bedrock-runtime", region_name="us-east-1")


def send_message_with_cache(
    client,
    model_id: str,
    static_context: str,
    question: str,
) -> dict:
    """
    Send a message with prompt caching.

    Args:
        static_context: Text that stays the same (will be cached)
        question: Dynamic question (changes each call)

    Returns:
        Dict with 'text' and 'usage' metrics
    """
    messages = [
        {
            "role": "user",
            "content": [
                {"text": static_context},
                {"cachePoint": {"type": "default"}},  # Cache boundary
                {"text": question},
            ],
        }
    ]

    response = client.converse(
        modelId=model_id,
        messages=messages,
        system=[
            {
                "text": "You are a helpful assistant. Keep responses brief (2-3 sentences)."
            }
        ],
        inferenceConfig={"maxTokens": 200, "temperature": 0.7},
    )

    return {
        "text": response["output"]["message"]["content"][0]["text"],
        "usage": response.get("usage", {}),
    }


def print_turn(
    turn: int,
    question: str,
    response: str,
    usage: dict,
):
    """Print a conversation turn with token metrics."""
    print(f"\n{'='*50}")
    print(f"TURN {turn}")
    print(f"{'='*50}")
    print(f"Q: {question}")
    print(f"A: {response}")
    print(
        f"\nTokens: in={usage.get('inputTokens', 0)}, out={usage.get('outputTokens', 0)}, "
        f"cache_write={usage.get('cacheWriteInputTokenCount', 0)}, "
        f"cache_read={usage.get('cacheReadInputTokenCount', 0)}"
    )


# =============================================================================
# Demo
# =============================================================================

if __name__ == "__main__":
    print("PROMPT CACHING DEMO")
    print("Watch cache_write (Turn 1) vs cache_read (Turn 2-3)\n")

    client = create_bedrock_client()
    model_id = "us.amazon.nova-micro-v1:0"

    # Static context: Personal profile (~100 words)
    profile = """
Here is my personal profile:

My name is Alex Chen, a 25-year-old software developer in Seattle.

Favorite color: Ocean blue - reminds me of calm beach days.
Favorite fruit: Mangoes - grew up eating them fresh in Taiwan.
Favorite sport: Basketball - I play pickup games every weekend.
Favorite music: Jazz and lo-fi hip hop - perfect for coding.
Favorite movie: Inception - I love mind-bending stories.

I enjoy hiking, cooking Asian fusion, and building AI side projects.
My dream is to create an AI language learning app.
"""

    # Turn 1: First question (cache WRITES)
    q1 = "Based on my profile, what birthday gift would you recommend?"
    r1 = send_message_with_cache(client, model_id, profile, q1)
    print_turn(1, q1, r1["text"], r1["usage"])

    # Turn 2: Second question (cache READS - 90% savings!)
    q2 = "What weekend activity would suit me?"
    r2 = send_message_with_cache(client, model_id, profile, q2)
    print_turn(2, q2, r2["text"], r2["usage"])

    # Turn 3: Third question (cache READS again)
    q3 = "What music playlist matches my personality?"
    r3 = send_message_with_cache(client, model_id, profile, q3)
    print_turn(3, q3, r3["text"], r3["usage"])

    print(f"\n{'='*50}")
    print("SUMMARY")
    print(f"{'='*50}")
    print("Turn 1: cache_write > 0 (profile written to cache)")
    print("Turn 2-3: cache_read > 0 (profile read from cache = 90% cheaper!)")
