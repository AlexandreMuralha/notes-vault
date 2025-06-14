# 🌐 LÖVE2D Screen Scaling 

LÖVE does **not automatically scale** your game to fit different screen sizes or aspect ratios. But you can easily support responsive games using standard scaling techniques.

---

## ✅ Common Methods for Adapting to Screen Sizes

### 1. ⚖️  **Fixed virtual resolution (most common)**

Use a **virtual canvas** that you draw everything onto at a fixed size (like 800x600), then **scale** it to fit any actual screen.

- Preserves pixel-art scale and layout
- Works consistently across platforms

#### 📄 Using `push.lua` Library (recommended)

```lua
local push = require "push"

local gameWidth, gameHeight = 800, 600
local windowWidth, windowHeight = love.window.getDesktopDimensions()

function love.load()
    push:setupScreen(gameWidth, gameHeight, windowWidth, windowHeight, {
        fullscreen = false,
        resizable = true,
        pixelperfect = true
    })
end

function love.draw()
    push:start()
    love.graphics.print("Hello!", 100, 100)
    push:finish()
end
```

Library: [https://github.com/Ulydev/push](https://github.com/Ulydev/push)

---

### 2. ⚖️ Responsive Layout with Percent-Based Positions

Manually position elements based on current window size:

```lua
local w, h = love.graphics.getDimensions()
love.graphics.print("Hello", w / 2 - 50, h / 2)
```

> Good for centering UI or fluid layouts.

---

### 3. ↺ Handle Window Resize Events

Update layout or canvas when window resizes:

```lua
function love.resize(w, h)
    -- recompute layout, camera, etc.
end
```

---

### 4. 🔹 HiDPI / Retina Scaling

Use `love.window.getDPIScale()` to adjust content size for high-DPI screens.

```lua
local scale = love.window.getDPIScale()
```

---

## 📈 Summary

|Method|Use Case|Pros|Cons|
|---|---|---|---|
|`push.lua`|Pixel art, fixed layout|Easy scaling, sharp pixels|External lib|
|Responsive layout|UI, scalable designs|Total control|Manual math|
|Resize handler|Dynamic resize support|Flexible, interactive|Needs handling|
|DPI check|High-resolution screen adapts|Crisp display|Needs scaling|

---

LÖVE gives you the control—you choose the scaling logic that fits your game best.