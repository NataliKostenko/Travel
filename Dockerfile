# Етап 1: Збірка
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Етап 2: Запуск через serve
FROM node:20-alpine
WORKDIR /app

# Встановлюємо serve глобально
RUN npm install -g serve

# Копіюємо тільки зібрані файли (папку dist)
COPY --from=build-stage /app/dist ./dist

# Відкриваємо порт (за замовчуванням serve використовує 3000 або 5000)
EXPOSE 3000

# Запускаємо serve з прапорцем -s (Single Page Application)
# Це критично важливо для Vue Router!
CMD ["serve", "-s", "dist", "-l", "3000"]