#!/bin/bash

docker run --rm -it --name nginx-catsquish -m 256m -v $PWD/:/usr/share/nginx/html:ro -p 8100:80 nginx
