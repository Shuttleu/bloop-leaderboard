FROM node:21 AS compiler
RUN mkdir /app
WORKDIR /app
ADD . .
RUN npm install
RUN npm run build

FROM nginx:alpine
RUN sed -ni 'H;${x;s/^\n//;s/index .*$/try_files $uri $uri\/ \/index.html =404;\n&/;p;}' /etc/nginx/conf.d/default.conf
COPY --from=compiler /app/dist /usr/share/nginx/html
EXPOSE 80