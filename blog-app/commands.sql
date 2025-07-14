CREATE TABLE IF NOT EXISTS blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes INTEGER DEFAULT 0);

INSERT INTO blogs (url, title) values ('www.exampleblog.com', 'Example blog');
INSERT INTO blogs (author, url, title, likes) values ('poap', 'www.anotherblog/12.com', 'Another blog', 5);