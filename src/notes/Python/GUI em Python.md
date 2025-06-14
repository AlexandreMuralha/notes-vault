---
dg-publish: true
dg-home: false
---

# Interface Gráfica com Python
A linguagem Python possui muitos frameworks para desenvolvimento de aplicações de interface gráfica para interação com o usuário, comumente chamandas, de GUI (Graphical User Interface).

O framework mais comum é o Tkinter que já faz parte da instalação Python, mas existem outros frameworks que têm características específicas que podem torná-los a escolha adequada para um projeto.

Frameworks para aplicações GUI mais comuns:
- [Tkinter](#Tkinter)
- [Flexx](#Flexx)
- [CEF Python](#CEF%Python)
- [Kivy](#Kivy)
- [Pyforms](#Pyforms)
- [PyQt](#PyQt)
- [wxPython](#wxPython)
- [PyAutoGui](#PyAutoGUI)
- [PySimpleGUI](#PySimpleGUI)


#### Tkinter
[Tkinter note](Tkinter.md)

É o framework GUI padrão do Python. Sua sintaxe é simples, possui muitos componentes para interação com o usuário. Além disso, seu código é aberto e é disponível sob a licença Python. Caso ela não esteja instalada na sua versão do Python, basta digitar o comando:

```
pip install tkinter
```

#### Flexx

É um kit de ferramentas para o desenvolvimento de interfaces gráficas com o usuário implementado em Python, que faz uso de tecnologia web para sua renderização. O Flexx pode ser usado para criar tanto aplicações de desktop, como para web e, até mesmo, exportar uma aplicação para um documento HTML independente. Para instalar o Flexx, basta digitar o comando:

```
pip install flexx
```

Hello World:

```python
from flexx import flx
class Exemplo(flx.Widget):

		def init(self):
			flx.Button(text='Olá')
			flx.Button(text='Mundo')

if __name__ == '__main__':
			a = flx.App(Exemplo, title='Flexx demonstração')
			m = a.launch()
			flx.run()
```


#### CEF Python

É um projeto de código aberto voltado para o desenvolvimento de aplicações com integração ao Google Chrome. Existem muitos casos de uso para CEF. Por exemplo, ele pode ser usado para criar uma GUI baseada em HTML 5, pode usá-lo para testes automatizados, como também pode ser usado para web scraping, entre outras aplicações.

Para instalá-lo, basta digitar na linha de comando:

```python
pip install cefpython3
```

Hello World:

```python
from cefpython3 import cefpython as cef
import platform
import sys
def main():
	check_versions()
	sys.excepthook = cef.ExceptHook # To shutdown all CEF processes on error
	cef.Initialize()
	cef.CreateBrowserSync(url="https://www.google.com/",
		window_title="Olá, mundo! Este é o primeiro exemplo do CEF Python")
	cef.MessageLoop()
	cef.Shutdown()

def check_versions():
	ver = cef.GetVersion()
	print("[hello_world.py] CEF Python {ver}".format(ver=ver["version"]))
	print("[hello_world.py] Chromium {ver}".format(ver=ver["chrome_version"]))
	print("[hello_world.py] CEF {ver}".format(ver=ver["cef_version"]))
	print("[hello_world.py] Python {ver} {arch}".format(ver=platform.python_version(),
arch=platform.architecture()[0]))
	assert cef.__version__ >= "57.0", "CEF Python v57.0+ required to run this"

	if __name__ == '__main__':
		main()
```


#### Kivy

É um framework Python de código aberto para o desenvolvimento de aplicações com interfaces de usuário e multitoque. Ele é escrito em Python e Cython, baseado em OpenGL ES 2, suporta vários dispositivos de entrada e possui uma extensa biblioteca de componentes (widgets).

Com o mesmo código, a aplicação funciona para Windows, macOS, Linux, Android e iOS. Todos os widgets Kivy são construídos com suporte multitoque.

Para instalá-lo, é necessário escrever na linha de comando:

```python
pip install Kivy
```

Hello World:

```python
from kivy.app import App
from kivy.uix.button import Button

class ExemploApp(App):
	def build(self):
		return Button(text='Olá, Mundo!')

ExemploApp().run()
```

Na figura 4, é possível identificar o título da janela “Exemplo” e um componente botão no centro da tela com a mensagem “Olá, Mundo!”. Um ponto interessante pode ser observado no código, que é a utilização da programação orientada a objetos.
É um framework utilizado para o desenvolvimento de jogos. A instalação desse framework pode ser um pouco mais complicada do que os anteriores, em especial, por causa das dependências.
Muitos desses problemas são bem documentados e de fácil acesso na web.

#### Pyforms

É um framework Python 3 para desenvolver aplicações que podem operar nos ambientes Desktop GUI, Terminal e Web. A biblioteca é composta por três sub-bibliotecas, cada uma implementando a camada responsável por interpretar a aplicação Pyforms em cada ambiente diferente, que são:

- Pyforms-gui.
- Pyforms-web.
- Pyforms-terminal.

Essas camadas podem ser usadas individualmente, ou em conjunto, dependendo da instalação do Pyforms. Para fazer a instalação básica, é necessário escrever na linha de comando:

```python
pip install pyforms
```

Hello World:

```python
import pyforms
from pyforms.basewidget import BaseWidget
from pyforms.controls import ControlText
from pyforms.controls import ControlButton

class ExemploSimples(BaseWidget):

	def __init__(self):
		super(ExemploSimples,self).__init__('ExemploSimples')
		#Definition of the forms fields
		self._nome = ControlText('Nome', 'Default value')
		self._sobrename = ControlText('Sobrenome')
		self._nomeCompleto = ControlText('Nome completo')
		self._button = ControlButton('Pressione o Botão')
		

#Execute the application
if __name__ == "__main__":
from pyforms import start_app
start_app(ExemploSimples)
```

 Ele foi projetado para desenvolver aplicações para executar no modo Windows GUI.

#### PyQt

Uma aplicação desenvolvida no framework PyQt executa nas plataformas Windows, macOS, Linux, iOS e Android.

Trata-se de um framework que aborda, além de desenvolvimento GUI, de abstrações de sockets de rede, threads, Unicode, expressões regulares, bancos de dados SQL, OpenGL, XML, entre outras aplicações.

Suas classes empregam um mecanismo de comunicação segura entre objetos que é fracamente acoplada, tornando mais fácil criar componentes de software reutilizáveis.

Para fazer a instalação básica, é necessário escrever na linha de comando:

```python
p install PyQt5
```

Hello World:

```python
import sys
from PyQt5 import QtCore, QtWidgets
from PyQt5.QtWidgets import QMainWindow, QLabel, QGridLayout, QWidget
from PyQt5.QtCore import QSize

class HelloWindow(QMainWindow):
	def __init__(self):
		QMainWindow.__init__(self)

	self.setMinimumSize(QSize(280, 120))
	self.setWindowTitle("Olá, Mundo! Exemplo PyQT5")

	centralWidget = QWidget(self)
	self.setCentralWidget(centralWidget)
	
	gridLayout = QGridLayout(self)
	centralWidget.setLayout(gridLayout)
	
	title = QLabel("Olá Mundo para PyQt", self)
	title.setAlignment(QtCore.Qt.AlignCenter)
	gridLayout.addWidget(title, 0, 0)

if __name__ == "__main__":
	app = QtWidgets.QApplication(sys.argv)
	mainWin = HelloWindow()
	mainWin.show()
	sys.exit( app.exec_() )
```


#### wxPython

É um kit de ferramentas GUI baseadas em uma biblioteca C++ chamada wxWidgets, que foi lançada em 1998. O wxPython usa os componentes (widgets) reais na plataforma nativa sempre que possível.

Essa, inclusive, é a principal diferença entre o wxPython e outros kits de ferramentas, como PyQt ou Tkinter.

**Atenção**
Desse modo, as aplicações desenvolvidas em wxPython se assemelham a aplicações nativas do sistema operacional em que estão sendo executados.

As bibliotecas PyQt e Tkinter têm componentes personalizados, é por isso que é bastante comum que as aplicações fiquem com um aspecto diferente das aplicações nativas do sistema operacional. Apesar disso, o wxPython também oferece suporte a componentes personalizados.

Para fazer a instalação básica, é necessário escrever na linha de comando:

```python
pip install wxPython
```

Uma forma de testar a instalação é escrever e executar o programa:

```python
import wx
class Janela(wx.Frame):
	def __init__(self, parent, title):
	super(Janela, self).__init__(parent, title=title, size = (400,300))
	self.panel = ExemploPainel(self)
	self.text_ctrl = wx.TextCtrl(self.panel, pos=(5, 5))
	self.btn_test = wx.Button(self.panel, label='Pressione esse componente!', pos=(5, 55))

class ExemploPainel(wx.Panel):
	def __init__(self, parent):
		super(ExemploPainel, self).__init__(parent)

class ExemploApp(wx.App):
	def OnInit(self):
		self.frame = Janela(parent=None, title="Janela wxPython")
		self.frame.Show()
		return True

app = ExemploApp()
app.MainLoop()
```

#### PyAutoGUI

Permite desenvolver aplicações Python que controlem o mouse e o teclado para automatizar as interações com outros aplicativos.

Uma das situações em que essa característica pode ser muito interessante é na implementação de testes que simulem a interação do usuário com o sistema.

PyAutoGUI funciona no Windows, macOS e Linux e é executado no Python 2 e 3.

Para fazer a instalação básica, é necessário escrever na linha de comando:

```python
pip install PyAutoGUI
```

Hello World:

```python
import pyautogui
screenWidth, screenHeight = pyautogui.size()
currentMouseX, currentMouseY = pyautogui.position()
pyautogui.moveTo(100, 150)
pyautogui.click()
pyautogui.click(100, 200)
pyautogui.move(0, 10)
pyautogui.doubleClick()
pyautogui.moveTo(500, 500, duration=2, tween=pyautogui.easeInOutQuad)
pyautogui.write('Olá, Mundo!', interval=0.25)
pyautogui.press('esc')
pyautogui.keyDown('shift')
pyautogui.press(['left', 'left', 'left', 'left'])
pyautogui.keyUp('shift')
pyautogui.hotkey('ctrl', 'c')
pyautogui.alert('Esta é a mensagem para Tela.')
```

Nesse código, basicamente, tem-se a seguinte sequência de instruções:

1. Obter o tamanho do monitor principal.
2. Obter a posição XY do mouse.
3. Mover o mouse para as coordenadas XY.
4. Clicar com o mouse.
5. Mover o mouse para as coordenadas XY e clicar nelas.
6. Mover o mouse 10 pixels para baixo de sua posição atual.
7. Clicar duas vezes com o mouse.
8. Usar a função de interpolação/atenuação para mover o mouse por 2 segundos com pausa de um quarto de segundo entre cada tecla.
9. Pressionar a tecla Esc.
10. Pressionar a tecla Shift e segurá-la.
11. Pressionar a tecla de seta para a esquerda 4 vezes.
12. Soltar a tecla Shift.
13. Pressionar a combinação de teclas de atalho Ctrl-C.
14. Mostrar uma caixa de alerta aparecer na tela e pausar o programa até clicar em OK.

Antes de executar o código, cabe um alerta: Essa aplicação, apesar de ser muito simples, vai interagir com o seu sistema.
A figura 8 vai aparecer depois do “cursor do mouse” se movimentar na tela e o “teclado” escrever a mensagem “Esta é a mensagem para tela”.
As possibilidades de aplicações são muitas para o PyAutoGUI.

#### PySimpleGUI

Esse pacote foi lançado em 2018 e possui portabilidade com os pacotes: Tkinter, PyQt, wxPython e Remi, portanto aumenta as possibilidades de uso de componentes na programação.

Para fazer a instalação básica, é necessário escrever na linha de comando:

```python
pip install pysimplegui
```

Hello World:

```python
import PySimpleGUI as sg

sg.theme('DarkAmber')

layout = [ [sg.Text('Texto na linha 1')],
			[sg.Text('Entre com um texto na linha 2'), sg.InputText()],
			[sg.Button('Ok'), sg.Button('Cancel')] ]
			window = sg.Window('Bem-Vindo ao PySimpleGUI', layout)
	
while True:
	event, values = window.read()
	if event == sg.WIN_CLOSED or event == 'Cancel':
		break
	print('Você entrou com: ', values[0])

window.close()
```

Se tudo funcionar corretamente, vai aparecer a aplicação, conforme a Figura 9:

Atenção
A lista de frameworks e bibliotecas disponíveis para Python ainda tem muitos outros exemplos, como o PySide e o PyObject. A escolha deve levar em consideração a maturidade da biblioteca/framework e da necessidade de o projeto incorporar ou não aspectos mais elaborados de uma GUI.



---
**ID**:  2108251818
**tags**: #python #GUI #tkinter #python/libs 
**links**:
