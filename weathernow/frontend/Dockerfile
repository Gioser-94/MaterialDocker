# Etapa de build
FROM node:18 AS build
WORKDIR /app

# Copiamos dependencias primero (cacheable)
COPY package*.json ./
RUN npm install

# Copiamos código fuente
COPY public ./public
COPY src ./src

# Build de React
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
