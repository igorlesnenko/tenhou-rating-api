FROM node:6-wheezy

ADD / /var/www/api/

EXPOSE 5000

CMD ["node", "/var/www/api/index.js"]