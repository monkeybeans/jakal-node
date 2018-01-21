FROM node:8

WORKDIR /jakal-exchange

# Copy the current directory contents into the container at /app
ADD package*.json ./
RUN npm install

ADD . ./
RUN npm run build

EXPOSE 8085

# Run app when the container launches
CMD ["npm", "start"]
