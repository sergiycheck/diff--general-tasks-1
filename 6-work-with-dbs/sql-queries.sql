select * from products
where name = 'Incredible Fresh Hat Awesome Concrete Shirt'

select * from products
where name like '%Incredible Fresh Hat Awesome Concrete Shirt%'


CREATE INDEX idx_products_name ON products (name);

select * from products
where name like '%Handmade Soft Keyboard'

select * from products where name like '%Soft Keyboard Generic%'

-- creating full text indexes
ALTER TABLE products  
ADD FULLTEXT (name)

-- or

CREATE FULLTEXT INDEX products_fulltext_name
on  products(name)