# Brug en officiel Node.js-baseret image
FROM node:18

# Sæt arbejdsmappen i containeren
WORKDIR /app

# Kopiér package.json og installér dependencies først
COPY package*.json ./
RUN npm install

# Kopiér resten af projektfilerne
COPY . .

# Eksponér porten backend kører på
EXPOSE 3000

# Start serveren
CMD ["node", "server.js"]
