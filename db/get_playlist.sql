select * from playlist p
join media m on p.media_id = m.media_id
join users u on p.user_id = u.user_id
where u.user_id = $1;