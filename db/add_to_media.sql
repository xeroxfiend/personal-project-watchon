insert into media (data, api_id)
values (${data}, ${api_id})
returning media_id;