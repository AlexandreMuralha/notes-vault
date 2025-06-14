---
dg-publish: true
dg-home: false
id: 2106300932
title: cx_Freeze
date-created: 210630_0932
---

**cx\_Freeze** creates standalone executables from Python scripts, with the same performance, is cross-platform and should work on any platform that Python itself works on.

---

### Install

```
pip install cx-Freeze
```

---

### setup.py

Criar o script **setup.py**, na pasta do nosso projeto, segundo o seguinte template:

```python
import sys
from cx_Freeze import setup, Executable

# Dependencies are automatically detected, but it might need fine tuning.
build_exe_options = {"packages": ["os"], "excludes": ["tkinter"]}

# GUI applications require a different base on Windows (the default is for a
# console application).
base = None
if sys.platform == "win32":
    base = "Win32GUI"

setup(  name = "guifoo",
        version = "0.1",
        description = "My GUI application!",
        options = {"build_exe": build_exe_options},
        executables = [Executable("guifoo.py", base=base)])
```

---

### Importar modulos

Importar os modulos necessários para rodar o app, fazendo o import no inicio do script e lista-los em build_exe_options, ‘packages’. Podemos excluir modulos desnecessários listando-os em “excludes”.

```python
build_exe_options = {"packages": ['tkinter','PIL',"os"], "excludes": ['numpy','test','distutils'],"include_files": include_files}
```

---

### Incluir outros arquivos

Para incluirmos outros arquivos/pastas no nosso projeto usamos include_files no nosso script.

```python
#importa o ficheiro da pasta img
include_files = ['img/imagem1.jpg']
#importa toda a pasta img
include_files = ['img']
```

---

### Setup final

Em Setup, colocamos o nome, versão e descrição do projeto. Em executables, colocamos o nome do arquivo python do nosso projeto.

```python
setup(  name = "Meu App",  
				version = "0.2",  
			  description = "O meu app python com GUI",  
				options = {"build_exe": build_exe_options},  
				executables = [Executable("meuapp.py", base=base,icon"lib/img/icon.ico")])
```

---

### Invocar o script criado

Na linha de comandos, dentro do directório onde está o nosso projeto corremos:

```python
python setup.py build
```

o executável e demais ficheiros serão criados dentro da pasta “build”

---

### Ex: script final

```python
import sys
from cx_Freeze import setup, Executable
from tkinter import *
from tkinter import filedialog
from PIL import ImageTk
import os
from PIL import Image

base = None
if sys.platform == "win32":
    base = "Win32GUI"

include_files = ['lib']

build_exe_options = {"packages": ['tkinter','PIL',"os"], "excludes": ['numpy','test','distutils'],"include_files": include_files}

setup(
    name = "Meu App",
    version = "0.2",
    description = "O meu app python com GUI",
    options = {"build_exe": build_exe_options},
    executables = [Executable("meuapp.py", base=base,icon="lib/img/icon.ico")])
```

---

**tags:** #python  #python/libs

**links:**
[https://cx-freeze.readthedocs.io/en/latest/index.html](https://cx-freeze.readthedocs.io/en/latest/index.html)
[https://cx-freeze.readthedocs.io/en/latest/distutils.html](https://cx-freeze.readthedocs.io/en/latest/distutils.html)