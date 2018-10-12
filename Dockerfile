FROM library/node:slim

COPY ./app /app

RUN cd /app \
  && npm install --production

WORKDIR /app

RUN npm install -g httpster
CMD [ "httpster" ]

