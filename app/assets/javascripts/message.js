$(function(){
  function buildHTML(message){
    var addImage = (message.image !== null) ? `<img class = "ilower-message__image", src="${message.image}">` : '';
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <div class="message__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="message__upper-info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="message__text">
                      ${message.content}
                    </p>
                    ${addImage} 
                  </div>
                </div>`
    return html;
  }

  var buildMessageHTML = function(message) {

    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : ""; 
    
    var html = '<div class="message" data-id=' + message.id + '>' +
                '<div class="message__upper-info">' +
                  '<div class="message__upper-info__talker">' +
                    message.user_name +
                  '</div>' +
                  '<div class="message__upper-info__date">' +
                    message.created_at +
                  '</div>' +
                '</div>' +
                '<div class="lower-message">' +
                  '<p class="message__text">' +
                    message.content +
                  '</p>' +
                    image +
                '</div>' +
              '</div>'
    
    return html;
  };
  

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.submit-btn').prop('disabled', false);
      scroll();
    })
    .fail(function(){
      alert('メッセージを入力して下さい');
      $('.form__submit').prop('disabled', false);
    });
  });

  


  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.message:last').data('id')
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function(message){
        insertHTML += buildMessageHTML(message);
      });
      //メッセージが入ったHTMLを取得
      //メッセージを追加
      $('.messages').append(insertHTML)
      scroll();
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 5000);
  } 
});




