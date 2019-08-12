FROM nginx:1.13.7
COPY dist/ /usr/share/nginx/html/
ADD nginx.conf /etc/nginx/conf.d/
