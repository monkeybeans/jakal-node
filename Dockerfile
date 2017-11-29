# Use an official Python runtime as a parent image
FROM node:7

# Set the working directory to /app
WORKDIR /jakal-exchange

# Copy the current directory contents into the container at /app
ADD . /jakal-exchange

#environment
#ENV NODE_ENV production
# ENV PORT 8085
#
# ENV DB_HOST localhost

# Install any needed packages specified in requirements.txt
#RUN pip install --trusted-host pypi.python.org -r requirements.txt
RUN npm install
#RUN npm rebuild node-sass
#RUN npm rebuild bcrypt
RUN npm run build

# Make port 80 available to the world outside this container
EXPOSE 8085

# Define environment variable
#ENV NAME World

# Run app.py when the container launches
CMD ["npm", "start"]
