FROM node:17.6
WORKDIR /home/server
COPY build start.sh stop.sh /home/server

CMD ["./start.sh"]
