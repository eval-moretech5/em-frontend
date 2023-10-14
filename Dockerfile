FROM node:20-slim
ENV PROJECT_DIR=/app
RUN mkdir -p $PROJECT_DIR
WORKDIR $PROJECT_DIR

ADD ./ $PROJECT_DIR/
RUN npm install
RUN npm run build

FROM nginx:1.25.2-alpine
ENV PROJECT_DIR=/app
RUN mkdir -p $PROJECT_DIR
WORKDIR $PROJECT_DIR
ADD default.conf /etc/nginx/conf.d/
COPY --from=0 $PROJECT_DIR/build/* /usr/share/nginx/html/
EXPOSE 9000