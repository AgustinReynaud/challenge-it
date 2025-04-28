# Usamos una imagen base oficial de Node.js
FROM node:20-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de nuestro proyecto al contenedor
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Exponemos el puerto donde la aplicación correrá
EXPOSE 3000

# Definimos el comando que se ejecutará al iniciar el contenedor
CMD ["npm", "start"]
