# !/bin/sh


# docker exec -i 6-work-with-dbs-mysql_db-1 \
# mysql -uroot -ppassword mydb \
# < 1k_records.sql

docker exec -i 6-work-with-dbs-mysql_db-1 \
mysql -uroot -ppassword mydb \
< 10mln_records.sql