use lab5web;

DROP TABLE IF EXISTS documents;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE documents(
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  number_of_pages INT NOT NULL,
  type VARCHAR(100) NOT NULL,
  format VARCHAR(100) NOT NULL,
  author INT NOT NULL,
  created_at DATETIME NOT NULL,
  description VARCHAR(500),
  PRIMARY KEY (id),
  FOREIGN KEY (author) REFERENCES authors(id)  
);

INSERT INTO authors (name, email) VALUES 
('George R. R. Martin', 'georgemartin@gmail.com'),
('J. K. Rowling', 'jkrowling@gmail.com'),
('Emanuel Berintan', 'nathanberintan@gmail.com');

INSERT INTO documents(title, number_of_pages, type, format, author, created_at) VALUES
('Games of Thrones 1', 650, 'Book', 'EPUB', 1, NOW()),
('Harry Potter 3', 400, 'Book', 'PDF', 2, NOW()),
('Bad article', 5, 'Article', 'PDF', 3, NOW());