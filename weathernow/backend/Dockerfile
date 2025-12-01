# Etapa de build
FROM node:18
WORKDIR /app

# Copiamos dependencias primero (cacheable)
COPY package*.json ./
RUN npm install

# Copiamos código fuente
COPY . .

# Exponemos el puerto
EXPOSE 4000

# Iniciar Nginx
CMD ["node", "server.js"]
