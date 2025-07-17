CREATE TABLE IF NOT EXISTS blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes INTEGER DEFAULT 0);

INSERT INTO blogs (url, title) values ('www.exampleblog.com', 'Example blog');
INSERT INTO blogs (author, url, title, likes) values ('poap', 'www.anotherblog/12.com', 'Another blog', 5);

insert into users (name,username) values ('teacher','teacher@gmail.com');
INSERT INTO blogs (author, url, title, likes, user_id, year) values ('Tosca', 'www.anotherblog/24.com', 'Example from db', 5,3,2024);
update blogs set year=2025 where id=1;

INSERT INTO reading_list (user_id, blog_id) values (1,1);