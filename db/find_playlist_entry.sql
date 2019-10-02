select * from playlist p
join users u on p.user_id = u.user_id
where u.user_id = ${userId} and p.media_id = ${foundMediaId};