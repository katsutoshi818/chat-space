$(function(){
  var user_list = $("#user-search-result");
  var member_list = $("#chat-group-users");
  
  function appendUser(user) {
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                    追加
                  </div>
                </div>`
      user_list.append(html);
  }

  function appendMember(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id="chat-group-user-${user_id}">
                  <input name='group[user_ids][]' type='hidden' value="${user_id}">
                  <p class='chat-group-user__name'>
                    ${user_name}
                  </p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                    削除
                  </div>
                </div>`
      member_list.append(html)
  }

  $('#user-search-field').on('keyup', function(){
    console.log(1)
    var user_name = $('#user-search-field').val()
    if (user_name.length !== 0){
      $.ajax({
        type: "GET",
        url: '/users',
        data: { keyword: user_name},
        dataType: 'json',
      })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
      })
      .fail(function(){
        alert('error');
      })
    }else{
      $('#user-search-result').empty();
    }
  })
  $('body').on('click', '.user-search-add', function(){
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
    $(this).parent().remove();
    appendMember(user_id, user_name) 
  });
  $('body').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });
})
