# Imagen base ligera de Python
FROM python:3.12-alpine

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el contenido actual a /app
COPY app.py ./

# Instalamos dependencias
RUN pip install flask redis

# Exponemos el puerto 5000
EXPOSE 5000

# Comando para arrancar la aplicación
CMD ["python", "app.py"]

