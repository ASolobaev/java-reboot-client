FROM node as builder

WORKDIR /usr/src/app
COPY package-lock.json package.json ./

RUN npm ci
COPY . .
RUN npm run build

FROM nginx
USER root

COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY .nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
