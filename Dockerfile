FROM node:22-alpine

WORKDIR /app

COPY project/package*.json ./
RUN npm install

COPY project/ .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]