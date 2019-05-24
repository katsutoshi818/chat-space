$(function(){
  function buildHTML(message){
    var image = message.image 
    if (image){
      var html = `<div class="message-box">
                    <p class="message-box__user-name"> 
                      ${message.user_name}
                      <span>
                        ${message.create_time}
                      </span>
                    </p>
                      <p calss="message-box__message"> 
                        ${message.content}
                      </p>
                    <img src=${message.image} > 
                  </div>`
    }else{
      var html = `<div class="message-box">
                    <p class="message-box__user-name"> 
                      ${message.user_name}
                      <span>
                        ${message.create_time}
                      </span>
                    </p>
                      <p calss="message-box__message"> 
                        ${message.content}
                      </p>
                  </div>`
    }
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
      $('.main-chat-space').scrollTop($('.main-chat-space')[0].scrollHeight); 
    })
    .fail(function(){
      alert('error');
    })
  })
});