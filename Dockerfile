FROM node:7.4-wheezy

ADD / /var/www/api/

EXPOSE 5000

CMD ["npm run start"]