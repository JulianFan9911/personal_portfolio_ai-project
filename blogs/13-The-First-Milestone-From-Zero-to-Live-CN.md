# The First Milestone: From Zero to Live

---

## The Moment It Became Real

用手机打开那个 `.vercel.app` 的链接，发了一句"你好"。

几秒钟后，屏幕上出现了 AI 的回复——不是本地测试时的 "Hello Alice"，是真正的、来自云端的、任何人都能看到的回复。

我关掉 WiFi，用 4G 再试一次。还是能用。

这一刻，13 个 branch、13 篇博客、无数次的 `mise run dev`，终于汇聚成了一个真正活着的产品。不是躺在我电脑里的代码，而是一个全世界都能访问的 AI App。

---

## What This Milestone Really Means

表面上看，这一课只是"配置几个环境变量"。但它的意义远不止于此。

这是我第一次接触真正的生产环境部署。

以前写代码，"能跑"的标准是 `localhost:3000` 能打开。现在才明白，那只是万里长征的第一步。真正的"能跑"，是代码脱离了我的电脑，在一个完全陌生的环境里，依然能正常工作。

Vercel 的 Preview 环境给了我一个安全的试验场。在 preview branch 上随便折腾，弄坏了也不影响 production。这种"先在安全区域验证，再推到正式环境"的节奏，让我第一次体会到了专业开发的工作流。

---

## Think Big: The Hidden Thread

回头看这 13 个 branch，我发现有一条隐藏的线贯穿始终：**每一步都不只是为了"现在能用"，而是为了"将来能规模化"。**

| 阶段 | 做了什么 | Think Big 的体现 |
|------|---------|-----------------|
| 00-01 | 选工具 | 不选最熟悉的 conda，选最专业的 mise + uv |
| 02-03 | 搭测试 | 代码只有 Hello World 就先建立反馈循环 |
| 04-05 | 砍骨架 + 部署 | 功能还没做就先确保能上线 |
| 06-09 | 前后端 + API | 按真实产品的协议标准来设计 |
| 10-12 | AI 集成 | 考虑了 fallback、成本控制、可替换性 |
| 13 | 环境变量 | 让同一份代码能在任何地方跑 |

这不是事后总结出来的，而是从第一天就有的意识。

很多人做 side project 的心态是"先跑通再说"。密钥写死在代码里？没关系，反正只有我用。测试？以后再加。部署？等功能做完再考虑。

但这种心态会累积成技术债。等项目真的要给别人用的时候，才发现要改的东西太多了，干脆重写。

**Think Big 的本质是：用做产品的标准来做 side project。** 不是因为现在需要，而是因为习惯了用专业标准要求自己，以后做任何项目都会受益。

---

## The Code That Knows Where It Lives

这一课有一个设计让我印象深刻：`runtime.py`。

```python
class Runtime:
    def is_local(self) -> bool:
        return self.name == RuntimeEnum.LOCAL.value

    def is_vercel(self) -> bool:
        return self.name == RuntimeEnum.VERCEL.value

runtime = Runtime()
```

表面上看，这不就是把 `os.environ.get("VERCEL") == "1"` 包了一层吗？有必要这么麻烦吗？

必要。

现在只有两个环境：local 和 Vercel。但如果以后要部署到 AWS Lambda 呢？要加一个 staging 环境呢？要在 CI/CD 里跑呢？

如果到处都是 `os.environ.get("VERCEL")`，改起来就是噩梦。但有了 `Runtime` class，所有环境检测的逻辑都关在一个笼子里。加新环境？改一个文件就够了。

这就是那句话的实践：**一个地方麻烦，换来所有地方简洁。**

---

## From "My Machine" to "Any Machine"

`boto_ses.py` 里有一段代码，完美展示了"环境感知"的思路：

```python
if runtime.is_vercel():
    boto_ses = boto3.Session(
        region_name="us-east-1",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
else:
    boto_ses = boto3.Session(region_name="us-east-1")
```

本地跑的时候，boto3 会自动去找 `~/.aws/credentials`。云端跑的时候，那个文件不存在，必须从环境变量读。

同一份代码，根据"自己在哪里"来决定行为。这不是 hack，这是专业软件的标准做法。

以前我觉得"环境变量"是个很高级的概念。现在才明白，它本质上就是一座桥——连接代码和运行环境的桥。代码不需要知道密钥是什么，只需要知道"问环境要"。至于环境怎么提供，那是部署时的事情。

这种解耦，让代码获得了自由。它不再绑定于某一台特定的机器，而是可以在任何地方运行。

---

## The Safety Net of Preview

第一次接触生产环境，说不紧张是假的。

万一配错了环境变量怎么办？万一代码有 bug 导致整个 App 挂掉怎么办？

好在 Vercel 有 Preview 环境。

每个非 main 分支推上去，都会生成一个独立的 Preview URL。在这个 URL 上随便折腾，坏了也不影响 production。只有确认一切正常，merge 到 main 的时候，才会更新正式环境。

这种设计给了我巨大的安全感。我可以大胆尝试，因为知道有回退的余地。这也是专业团队的工作方式——没有人会直接在 production 上改代码。

---

## Reflection

这个 milestone 的真正意义，不是"部署成功了"，而是"证明了整条链路可行"。

从用户点击发送 → 前端发请求 → 后端处理 → 调用 AWS Bedrock → 返回 AI 回复 → 渲染到界面。这整个链路，现在在云端跑通了。

更重要的是，这个项目到此为止，技术债几乎为零。

- 没有"先这样写，以后再改"的 TODO
- 没有写死在代码里的密钥
- 没有"本地能跑但部署会挂"的隐患
- 测试、CI/CD、环境变量，从一开始就是标配

这不是终点，而是一个起跑线。接下来不管要加什么功能，都是在一个健康的基础上加。不用担心"牵一发动全身"，因为架构从一开始就是为扩展设计的。

---

## What's Next

第一个 milestone 完成了。App 有了完整的骨架：前端、后端、AI、测试、部署。

接下来可以做的事情很多：

- 让 AI 更聪明（prompt engineering、context management）
- 让界面更好看（UI/UX 优化）
- 让功能更丰富（历史记录、多轮对话）
- 让项目更专业（自定义域名、监控、日志）

但不管做什么，我都知道一件事：

**代码写完不是终点，让它活在云端、被人使用，才是真正的 Deliver。**

从第一篇博客的空 repo，到现在的完整 App，这条路走了 13 步。每一步都不大，但每一步都在往前。

这就是 Think Big 的真正含义——不是一开始就要做出惊天动地的东西，而是**用做大事的标准，一步一步把小事做好**。
