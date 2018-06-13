FROM mhart/alpine-node

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
COPY ./frontend/package.json .

RUN npm install
RUN npm install react-scripts -g


COPY ./frontend .


EXPOSE 3000

CMD ["npm", "start"]
