json.content  @message.content
json.image   @message.image_url
json.created_at   @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_id   @message.user.id
json.user_name   @message.user.name
