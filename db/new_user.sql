insert into users (email, hash)
values (${email}, ${hash})
returning user_id;
