### Connect to myslq

```sh
bash-4.4# mysql  -ppassword mydb
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
```

### Connect to mysql from adminer

- system: MySql
- server: mysql_db
- username: root
- password: password
- database: mydb

### imported products table

![products table adminer](./imgs/products-table.png)

### execute commands with time

Select with name = 'Incredible Fresh Hat Awesome Concrete Shirt':

```sh
time docker exec -i 6-work-with-dbs-mysql_db-1 \
mysql -u root -ppassword mydb \
-e "select * from products where name = 'Incredible Fresh Hat Awesome Concrete Shirt';"
```

result without index

```sh
$ ./commands.sh
mysql: [Warning] Using a password on the command line interface can be insecure.
id      name    description
66      Incredible Fresh Hat Awesome Concrete Shirt     Fantastic Frozen Soap. New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart
384385  Incredible Fresh Hat Awesome Concrete Shirt     Incredible Soft Towels. New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016

real    0m8.936s
user    0m0.057s
sys     0m0.046s
```

result with index:

```sh
$ ./commands.sh
mysql: [Warning] Using a password on the command line interface can be insecure.
id      name    description
66      Incredible Fresh Hat Awesome Concrete Shirt     Fantastic Frozen Soap. New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart
384385  Incredible Fresh Hat Awesome Concrete Shirt     Incredible Soft Towels. New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016

real    0m0.199s
user    0m0.056s
sys     0m0.044s
```

select where name starts with 'Handmade Soft Keyboard'

results with index

```sh
real    0m16.884s
user    0m0.061s
sys     0m0.057s
```

select where name contains phrase 'Soft Keyboard Generic'

results wihout fulltext index

```sh
real    0m17.884s
user    0m0.050s
sys     0m0.066s
```

this operations executes slowly because this query
uses '%' windcard and database has to perform full table scan

results with fulltext index

```sh
real    0m13.229s
user    0m0.057s
sys     0m0.061s
```
