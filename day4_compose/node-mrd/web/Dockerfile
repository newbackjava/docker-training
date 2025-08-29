FROM node:20-alpine

WORKDIR /app

# package-lock.json이 있어도/없어도 동작하도록 복사 패턴
COPY package.json package-lock.json* ./
RUN npm install --omit=dev

COPY server.js ./server.js

EXPOSE 3000
CMD ["node", "server.js"]
