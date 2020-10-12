FROM strapi/base

WORKDIR /srv/app

COPY ./project-name ./

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm run build

RUN echo PORT: $PORT
EXPOSE $PORT

CMD ["npm", "start"]