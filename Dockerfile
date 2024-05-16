FROM node:18.19
WORKDIR /home/server
COPY build start.sh stop.sh /home/server

CMD ["./start.sh"]
