$(function(){
  function buildHTML(message){
    var img = message.image 
      ? ` <img src=${message.image} > `
      : "";
    var html = `<div class="message-box" data-id="${message.id}" >
                  <p class="message-box__user-name"> 
                    ${message.user_name}
                    <span>
                      ${message.create_time}
                    </span>
                  </p>
                    <p calss="message-box__message"> 
                      ${message.content}
                    </p>
                  ${img}
                </div>`
    return html;
  }
  $('.form-space').on('submit', function(e){
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
      $('.main-chat-space').append(html)
      $('.form-space-message-area__message').val('')
      $('.form-space__button').val('Send')
      $(".form-space__button").prop("disabled", false);
      $('.main-chat-space').scrollTop($('.main-chat-space')[0].scrollHeight); 
    })
    .fail(function(){
      $('.form-space__button').val('Send')
      $(".form-space__button").prop("disabled", false);
      alert('error');
    })
  });
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    last_message_id = $('.main-chat-space .message-box:last').data('id')
    $.ajax({
      url: 'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function (message) {
        insertHTML = insertHTML + buildHTML(message);
      })
      //メッセージが入ったHTMLを取得
      var message_list = $('.main-chat-space');
      //メッセージを追加
      message_list.append(insertHTML)
      $('.main-chat-space').scrollTop($('.main-chat-space')[0].scrollHeight); 
    })
    .fail(function() {
      console.log('error');
    });
  };
  setInterval(reloadMessages, 5000);
});
