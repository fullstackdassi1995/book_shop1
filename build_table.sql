CREATE TABLE BOOKS(
  ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  TITLE TEXT NOT NULL UNIQUE,
  AUTHOR TEXT NOT NULL,
  PUBLISH_YEAR INTEGER,
  PRICE REAL,
  LEFT_IN_STOCK INTEGER NOT NULL,
  BOOK_IMAGE_SRC TEXT
)

CREATE TABLE ORDERS (
	ID INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
	BOOK_ID INTEGER NOT NULL,
	HOW_MANY INTEGER NOT NULL,
	TIME_OF_ORDER datetime,
	CUSTOMER_F_NAME	TEXT char(15),
	CUSTOMER_L_NAME	TEXT char(15),
	CREDIT_CARD	TEXT NOT NULL,
	CONSTRAINT FK_bookOrder FOREIGN KEY (BOOK_ID)
  REFERENCES BOOKS(ID)
);



/*
CREATE TABLE "BOOKS" (
  "id" bigint PRIMARY KEY,
  "title" varchar,
  "author" varchar,
  "puplish_year" integer,
  "price" float,
  "left_in_stock" integer,
  "book_image_src" varchar
);

CREATE TABLE "ORDERS" (
  "id" bigint PRIMARY KEY,
  "book_id" bigint,
  "how_many" integer,
  "time_of_order" datetime,
  "customer_fname" varchar,
  "customer_lname" varchar,
  "credit_card" varchar
);

ALTER TABLE "ORDERS" ADD FOREIGN KEY ("book_id") REFERENCES "BOOKS" ("id");

*/
