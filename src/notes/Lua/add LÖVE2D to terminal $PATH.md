# 🕹️ Install LÖVE2D on macOS

  
#### 📦 1: Download LÖVE

1. Go to [https://love2d.org/](https://love2d.org/) and download latest **macOS .zip** version.

2. Unzip it — you'll get a `love.app`.

#### 🗂 2: Move `love.app` to Applications

Open Terminal and run:
```bash

mv ~/Downloads/love.app /Applications/
```

####  **🔗 3: Add LÖVE to Your Terminal** **$PATH**

Run the following to create a symlink:

```bash
sudo ln -s /Applications/love.app/Contents/MacOS/love /usr/local/bin/love
```

#### **4. ✅ Verify It Works**
```bash
love --version
```

#### **5. 🚀 Run a Project**

##### **A. Run a Folder**
```bash
love /path/to/your/game_folder
```

##### **B. Run a** **.love** File

1. From inside your game folder:
```bash
zip -9 -r mygame.love .
```

2. Then run:
```bash
love mygame.love
```