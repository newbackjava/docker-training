# Day 3: Networking and Volumes

```bash
docker network create my-net
docker run -dit --name web1 --network my-net nginx
docker run -dit --name web2 --network my-net nginx
docker exec -it web1 ping web2

docker volume create dbdata
docker run -d --name mysql -e MYSQL_ROOT_PASSWORD=pass --mount source=dbdata,target=/var/lib/mysql mysql:5.7
```