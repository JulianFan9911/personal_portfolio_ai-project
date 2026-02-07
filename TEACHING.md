# Teaching Guide: Hello, AI! - Your First AI API Call

## Lesson Overview

| Aspect | Details |
|--------|---------|
| **Duration** | 20-30 minutes |
| **Difficulty** | Beginner |
| **Prerequisites** | AWS credentials configured, familiar with boto3.Session() |
| **Key Concept** | AI models are functions: input → output |

## Learning Objectives

By the end of this lesson, students will be able to:
1. Call AWS Bedrock API using Python
2. Understand the basic structure of AI API requests/responses
3. Set up and call at least one alternative AI service (Gemini or GLM)

## Lesson Flow

### 1. Introduction (2 min)

**Key message:** "Today you'll talk to AI through code, not a web interface."

Emphasize:
- This is your first "real" AI call - not using ChatGPT's web UI
- Once you understand this, you can build any AI application
- It's simpler than you think: AI is just a function

### 2. Core Concept Explanation (3 min)

Draw or explain this diagram:
```
Your question → [AI Model] → AI's answer
```

**Analogy:** You don't need to understand engine mechanics to drive a car. Similarly, you don't need to understand neural networks to call AI.

### 3. Bedrock Script Walkthrough (5 min)

Walk through `scripts/test_ai_aws_bedrock.py` line by line:

1. **Creating the client** - `boto3.Session()` and `client()`
2. **Setting up the request** - `model_id`, `messages`, `system`
3. **Making the call** - `bedrock.converse()`
4. **Extracting the response** - Navigate the response JSON

**Demo:** Run the script live, show the output.

### 4. Alternative Service Exercise (10-15 min)

**Important:** Let students struggle a bit before helping!

Instructions:
1. Ask which service they'll choose (Gemini for international, GLM for China)
2. Point them to the official documentation
3. Let them try to figure it out themselves
4. Only help if they're stuck for more than 5 minutes

**Why this approach?**
- Reading documentation is a crucial skill
- Debugging their own code builds confidence
- They'll remember better if they solve it themselves

### 5. Verification (5 min)

Run both scripts to verify:
```bash
.venv/bin/python scripts/test_ai_aws_bedrock.py
.venv/bin/python scripts/test_ai_google_gemini.py  # or test_ai_glm.py
```

## Common Student Issues

### Issue 1: `AccessDeniedException`

**Cause:** IAM permissions or Bedrock model access not enabled.

**Solution:**
1. Check IAM user has `AmazonBedrockFullAccess`
2. In Bedrock console, enable model access for Nova Micro

### Issue 2: `Could not find credentials`

**Cause:** AWS credentials not configured.

**Solution:**
```bash
aws sts get-caller-identity  # Test if credentials work
cat ~/.aws/credentials       # Check file exists
```

### Issue 3: Alternative service script won't run

**Cause:** API key not set or dependency not installed.

**Solution:**
```bash
# For Gemini
export GOOGLE_API_KEY="..."
pip install google-genai

# For GLM
export ZHIPU_API_KEY="..."
pip install zhipuai
```

### Issue 4: Student copies reference answer

**Response:** This is OK for learning, but ask them to explain the code. Understanding is more important than typing.

## Key Teaching Points

### 1. AI is a Function

Reinforce this mental model throughout:
- Input: messages (your question)
- Processing: the AI model (black box)
- Output: response (AI's answer)

### 2. API Keys and Environment Variables

Explain why we use environment variables:
- Security: Don't commit secrets to git
- Flexibility: Different keys for different environments
- Best practice: Industry standard

### 3. Reading Documentation

When students ask "how do I...":
1. First, point them to the official docs
2. Let them try for a few minutes
3. Only then provide direct help

This builds the skill of self-sufficiency.

## Assessment Criteria

| Criteria | Pass | Fail |
|----------|------|------|
| Bedrock script | Runs and returns response | Errors or no output |
| Alternative script | Has code (even if can't run) | Still placeholder only |
| Understanding | Can explain basic concepts | Cannot explain anything |

## Extension Activities

For fast students:
1. Try a different model (Claude instead of Nova)
2. Modify the system prompt to change AI personality
3. Build a simple loop for multi-turn conversation

## Resources

- [AWS Bedrock Docs](https://docs.aws.amazon.com/bedrock/)
- [Google Gemini Quickstart](https://ai.google.dev/gemini-api/docs/quickstart)
- [Zhipu GLM API](https://open.bigmodel.cn/dev/api/normal-model/glm-4)
