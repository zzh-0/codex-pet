# Codex Pet

## Lumi

“Lumi” 来自 luminous，意为明亮、发光；这个名字对应角色的白色长发、蓝色眼睛和清爽的蓝白配色，也足够短，适合作为桌面宠物名称。

这是一个根据角色设定图制作的 Codex-compatible v2 动画宠物。

## macOS 桌宠

仓库中的 `desktop-pet` 是独立运行的 macOS 桌宠版本。它使用同一张经过 QA 的精灵图，提供透明、无边框、置顶窗口；直接拖动角色即可移动，右键可切换动作、暂停、隐藏或退出。角色也会在待机、挥手、工作、检查和等待等状态间自动切换。

需要 Node.js 20 或更高版本。在本机运行：

```bash
cd desktop-pet
npm install
npm start
```

首次安装 Electron 时若网络需代理，可在同一终端运行：

```bash
ELECTRON_GET_USE_PROXY=1 HTTPS_PROXY=http://127.0.0.1:7892 npm install
```

关闭窗口以外的方式隐藏 Lumi 后，可从 Dock 点击 `Lumi 桌宠` 重新显示它。

## 动作预览

| 动作 | 预览 |
| --- | --- |
| Idle | ![idle](lumi/run/qa/previews/idle.gif) |
| Running right | ![running-right](lumi/run/qa/previews/running-right.gif) |
| Running left | ![running-left](lumi/run/qa/previews/running-left.gif) |
| Waving | ![waving](lumi/run/qa/previews/waving.gif) |
| Jumping | ![jumping](lumi/run/qa/previews/jumping.gif) |
| Failed | ![failed](lumi/run/qa/previews/failed.gif) |
| Waiting | ![waiting](lumi/run/qa/previews/waiting.gif) |
| Running / working | ![running](lumi/run/qa/previews/running.gif) |
| Review | ![review](lumi/run/qa/previews/review.gif) |

### 方向预览

![16-way look directions](lumi/run/qa/look-directions.png)
