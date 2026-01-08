# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем все зависимости (включая dev для сборки)
RUN npm install

# Копируем исходный код
COPY . .

# Собираем TypeScript проект
RUN npm run build

# Удаляем devDependencies для уменьшения размера образа
RUN npm prune --production

# Открываем порт 8080
EXPOSE 8080

# Устанавливаем переменные окружения по умолчанию
ENV NODE_ENV=production
ENV PORT=8080

# Запускаем приложение
CMD ["npm", "start"]
