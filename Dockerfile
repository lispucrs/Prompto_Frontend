# Usa uma imagem base leve com Node.js
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do seu projeto para o container
COPY . /app

# Instala as dependências do React
RUN npm install

# Comando padrão para rodar o servidor de desenvolvimento
CMD ["npm", "start"]
