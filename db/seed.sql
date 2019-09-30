create table users (
    user_id serial primary key,
    email text,
    hash text
);

insert into users (email, hash)
values ('bob@bob.com', 'asdf'),
( 'a@gmail.com', 'asdf');

create table media (
    media_id serial primary key,
    data json,
    api_id int
);

insert into media (data, api_id)
values ('{"title": "Breaking Bad", "episodes": "100", "year": "2010"}', 1),
('{"title": "Game of Thrones", "episodes": "60", "year": "2014"}', 2);


create table playlist (
    playlist_id serial primary key,
    user_id int references users(user_id),
    media_id int references media(media_id),
    rating int
);

insert into playlist (user_id, media_id, rating)
values (1, 1, 5),
(1, 2, 4);

select * from users;
select * from media;
select * from playlist;