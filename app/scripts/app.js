 $(document).ready(function(){
  $('#projects_button').on('click',function(){
    $('#project_page').show()
    $('#about_page').hide()
    $('#home_page').hide()

  });

  $('#home_button').on('click',function(){
    $('#home_page').toggle()
    $('#project_page').hide()
    $('#about_page').hide()
  });

  $('#about_button').on('click',function(){
    $('#about_page').show()
    $('#project_page').hide()
    $('#home_page').hide()
  });

  $('#ttt_button').on('click',function(){
    $('#ttt_page').show()
    $('#login').show()
    $('#playbox').hide()
    $('#chatbox').hide()
    $('#foot').hide()
    $('#lfoot').hide()
    $('#cfoot').hide()
  });



  $('#battleship_button').on('click',function(){
    $('#battleship_page').show()
    $('#ttt_page').hide()

  });



 });
