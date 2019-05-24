$(function(){
  function buildHTML(comment){
    var html = `%div.message-box
                  %p.message-box__user-name  
                    = ${message.user_name}
                    %span 
                      = ${message.create_time}.strftime("%Y/%m/%d %H:%M")
                  - if message.content.present?
                    %p.message-box__message 
                      = ${message.content}
                  =image_tag ${message.image}, class: "" if message.image.present?`
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
    })
  })
});