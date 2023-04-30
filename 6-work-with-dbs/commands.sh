# !/bin/sh


# time docker exec -i 6-work-with-dbs-mysql_db-1 \
# mysql -u root -ppassword mydb \
# -e "select * from products where name = 'Incredible Fresh Hat Awesome Concrete Shirt';"


# time docker exec -i 6-work-with-dbs-mysql_db-1 \
# mysql -u root -ppassword mydb \
# -e "select * from products where name like '%Handmade Soft Keyboard';"



time docker exec -i 6-work-with-dbs-mysql_db-1 \
mysql -u root -ppassword mydb \
-e "select * from products where name like '%Soft Keyboard Generic%';"
