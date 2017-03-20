USE pyfiadb;

CREATE TABLE IF NOT EXISTS cls_fin (
  nm VARCHAR(255) NOT NULL PRIMARY KEY,
  nm2 VARCHAR(255) NOT NULL,
  disp VARCHAR(1000) NOT NULL,
  attr0 INT(4),
  attr1 INT(4),
  attr2 INT(4),
  attr3 INT(4),
  INDEX(nm)
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS cls_fin_idx (
  symbol VARCHAR(255) NOT NULL,
  idx VARCHAR(255) NOT NULL,
  last_updated DATETIME NOT NULL,
  UNIQUE INDEX(symbol, idx)
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS dfin_corr (
symbol VARCHAR(255) NOT NULL,
idx VARCHAR(255) NOT NULL,
lag	INT(4) NOT NULL,
years DOUBLE NOT NULL,
correlation DOUBLE NOT NULL,
last_updated DATETIME NOT NULL, 
INDEX(symbol, idx, lag, years)
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS users (
login varchar(255) not null,
password varchar(255) not null,
primary key (login)
) engine=InnoDB;

CREATE TABLE IF NOT EXISTS users_attr (
login varchar(255) not null,
name varchar(2000) not null,
val varchar(2000) not null,
foreign key (login) references users(login)
) engine=InnoDB;