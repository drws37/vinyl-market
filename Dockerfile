FROM node

WORKDIR /app

ENV DATABASE_URL=postgres://postgres:postgres@31.41.155.160:5432/vinyl

COPY . .

RUN cd client && npm install && npm run build

RUN cd server && npm install

EXPOSE 4000

CMD ["node", "server/app.js"]

