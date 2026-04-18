FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["sh", "-c", "sleep 5 && npx prisma generate && npx prisma db push --accept-data-loss && npx prisma db seed && npm run start"]
