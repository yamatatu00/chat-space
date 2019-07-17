$(function(){
  function buildHTML(message){
    var addImage = (message.image !== null) ? `<img class = "ilower-message__image", src="${message.image}">` : ''  
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
    })
  })
});