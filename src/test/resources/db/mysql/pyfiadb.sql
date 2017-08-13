CREATE DATABASE IF NOT EXISTS pyfia;
GRANT ALL PRIVILEGES ON pyfia.* TO admin@localhost IDENTIFIED BY 'admin';

USE pyfia;

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

CREATE TABLE IF NOT EXISTS dfin_corr (
symbol VARCHAR(255) NOT NULL,
idx VARCHAR(255) NOT NULL,
lag	INT(4) NOT NULL,
years DOUBLE NOT NULL,
correlation DOUBLE NOT NULL,
last_updated DATETIME NOT NULL, 
INDEX(symbol, idx, lag, years)
) engine=InnoDB;
