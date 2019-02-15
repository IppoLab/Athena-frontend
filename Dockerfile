FROM tiangolo/node-frontend:10 as build-stage

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install

COPY ./ /app/

ARG FRONTEND_ENV=production

ENV VUE_APP_ENV=${FRONTEND_ENV}

RUN npm run build


FROM nginx:1.15

COPY --from=build-stage /app/dist/ /usr/share/nginx/html

COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf
