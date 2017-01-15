FROM golang:alpine
ADD . /go/src/github.com/minecrafter/votifier-tester
RUN go install github.com/minecrafter/votifier-tester
RUN cp -R /go/src/github.com/minecrafter/votifier-tester/assets /go/bin
WORKDIR /go/bin
CMD ["/go/bin/votifier-tester"]