# Day 1: Basic Docker Commands

- Run hello-world
- Launch nginx
- Check containers

```bash
docker run hello-world
docker run -d -p 8080:80 nginx
docker ps
docker stop [CONTAINER ID]
docker rm [CONTAINER ID]
```