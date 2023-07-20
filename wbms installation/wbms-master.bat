@ECHO OFF

docker stop wbms-db-master
docker stop wbms-db-slave
docker run -td --rm -p 33061:3306 --name wbms-db-master -e MARIADB_ROOT_USER="wbms_dba" -e MARIADB_ROOT_PASSWORD="P@ss3031323334" -e MARIADB_USER="wbms_dbu" -e MARIADB_PASSWORD="3031323334" -e MARIADB_DATABASE="wbms" -e MARIADB_REPLICATION_MODE="master" -e MARIADB_REPLICATION_USER="wbms_dbr" -e MARIADB_REPLICATION_PASSWORD="3031323334" -v d:/database/mariadb-data-[SITE_NAME]:/bitnami/mariadb bitnami/mariadb

docker stop phpmyadmin
docker run -td --rm -p 8080:80 --name phpmyadmin -e PMA_ARBITRARY=1 phpmyadmin

docker stop wbms-backend
docker run -td --rm -p 6001:6001 --name wbms-backend -e WBMS_APP_PORT="6001" -e WBMS_DB_DOMAIN="[PC_MASTER_IP_ADDRESS]" -e WBMS_DB_PORT="33061" -e WBMS_DB_PASSWORD="3031323334" -e WBMS_DB_NAME="wbms" mromzy/wbms-backend:0.17.01

docker stop wbms-fo
docker run -td --rm -p 8000:80 --name wbms-fo mromzy/wbms-fo:0.17.01

PAUSE 