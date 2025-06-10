import matplotlib.pyplot as plt

# Datos
categorias = ['Clientes', 'Modelos', 'Contratos']
valores = [25, 12, 18]

# Barras verticales
plt.figure(figsize=(10, 6))
plt.subplot(2, 2, 1)
plt.bar(categorias, valores, color=['skyblue', 'lightgreen', 'salmon'])
plt.title('Barras Verticales')
plt.xlabel('Categoría')
plt.ylabel('Cantidad')
plt.grid(axis='y')

# Barras horizontales 
plt.subplot(2, 2, 2)
plt.barh(categorias, valores, color=['skyblue', 'lightgreen', 'salmon'])
plt.title('Barras Horizontales')
plt.xlabel('Cantidad')
plt.ylabel('Categoría')
plt.grid(axis='x')

#  Gráfico circular
plt.subplot(2, 2, 3)
plt.pie(valores, labels=categorias, autopct='%1.1f%%', colors=['skyblue', 'lightgreen', 'salmon'])
plt.title('Gráfico de Pastel')

plt.tight_layout()
plt.show()
