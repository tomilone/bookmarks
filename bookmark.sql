-- First, remove the table if it exists
drop table if exists bookmarks;

-- Create the table anew
create table bookmarks (
  id INTEGER primary key generated by default as identity,
  title text not null default 'untitled bookmark',
  url VARCHAR(1000) not null,
  description text,
  rating INTEGER
);

-- insert some test data
-- Using a multi-row insert statement here
insert into bookmarks (title, url, description, rating)
values
  ('testTitle', 'www.test.com', 'description', '3'),
  ('testTitle', 'www.test.com', 'description', '2'),
  ('testTitle', 'www.test.com', 'description', '1'),
  ('testTitle', 'www.test.com', 'description', '3'),
  ('testTitle', 'www.test.com', 'description', '2'),
  ('testTitle', 'www.test.com', 'description', '1'),
  ('testTitle', 'www.test.com', 'description', '2'),
  ('testTitle', 'www.test.com', 'description', '4'),
  ('testTitle', 'www.test.com', 'description', '3'),
  ('testTitle', 'www.test.com', 'description', '1');