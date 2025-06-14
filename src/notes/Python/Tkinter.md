---
dg-publish: true
---

💻  Tkinter is Python’s de-facto standard GUI (Graphical User Interface) package.

### Básico
```python
from tkinter import *

root = Tk()
# renomeia o título da janela
root.title("Primeira App")

# Define o tamanho da janela em px
menu_inicial.geometry("500x300")
# Define se a janela é redimensionável ou não
menu_inicial.resizable(True, True)
# Define os limites do redimensionamento da janela
menu_inicial.minsize(500,300)menu_inicial.maxsize(700,350)

#mainloop - faz com que a 
root.mainloop()
```



### Principais Widgets
- Botão (Button) -> É usado para exibir os botões na aplicação. São usados, por exemplo, para confirmar uma ação de salvar os dados.
- Telas (Canvas) -> É usado para desenhar formas, como linhas, ovais, polígonos e retângulos.
- Botão de verificação (Checkbutton) -> É usado para exibir várias opções como caixas de seleção. O usuário pode selecionar várias opções ao mesmo tempo.
- Entrada de texto (Entry) -> É usado para exibir uma caixa de texto de linha única para que o usuário digite valores de entrada.
- Quadros (Frame) -> É usado como um widget de contêiner, isso significa que outros componentes são adicionados a ele com o objetivo de organizar outros widgets.
- Rótulo (Label) -> É usado para fornecer uma legenda de linha única para outros widgets. Também pode conter imagens.
- Caixa de listagem (Listbox) -> É usado para fornecer uma lista de opções para um usuário.
- Menubutton -> É usado para exibir opções no menu.
- Menu -> É usado para fornecer várias possibilidades de comandos a um usuário. Esses comandos estão contidos no Menubutton.
- Mensagem (Message) -> É usado para exibir uma mensagem de texto e um botão para o usuário confirmar uma ação.
- Botão de rádio (Radiobutton) -> É usado para exibir várias opções, como botões de rádio. O usuário pode selecionar apenas uma opção por vez.
- Escala (Scale) -> É usado para fornecer um widget de controle deslizante.
- Barra de rolagem (Scrollbar) -> É usado para adicionar capacidade de rolagem a vários widgets.
- Texto (Text) -> É usado para exibir texto em várias linhas.
- Toplevel -> É usado para fornecer um contêiner de janela separado.
- Spinbox -> É uma variante do widget Entry padrão. Ele é usado para selecionar um número fixo de valores.
- PanedWindow -> É um widget de contêiner que pode conter qualquer número de painéis, organizados horizontalmente ou verticalmente.
- LabelFrame -> É um widget de contêiner simples. Seu objetivo principal é atuar como um espaçador, ou contêiner para layouts de janela.
- tkMessageBox -> Este módulo é usado para exibir caixas de mensagens.


### Button / Label

```python
# Criando um button que invoca a função cmd_Abrir()
btn_1 = Button(root, width=10,text = 'Open Image', 
command=lambda: cmd_Abrir())
btn_1.grid(row=0, column=0,padx=7,pady=7,sticky=S)

# Duas formas de criar um label
label_1 = Label(root, bg=red, width=20,bd=1,relief=solid)

label_1 = Label(root)
label_1['text'] = 'Este é o texto do label 1'
label_1['bg'] = 'red'
label_1['font'] = 'Arial 10 bold'
label_1['width'] = '20'

# Para colocarmos o label na janela usamos .grid ou .pack
# .grid - o label é posicionado de acordo com um sistema de grid, 
# na coluna e linha indicada
label_1.grid(row=0,column=0)
# .pack - o widget é colocado na ordem em que aparece no código
label_1.pack()
```

---

tags: #python #tkinter #python/libs 

Links:
https://wiki.python.org/moin/TkInter
https://dcc.ufrj.br/~fabiom/mab225/14gui.pdf

