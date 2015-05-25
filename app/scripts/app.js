 $(document).ready(function(){
  $('#home_button').on('click',function(){
    $('#project_page').hide()
    $('#about_page').hide()
    $('#home_page').show()
  });

  $('#about_button').on('click',function(){
    $('#project_page').hide()
    $('#home_page').hide()
    $('#about_page').show()
  });

  $('#projects_button').on('click',function(){
    $('#about_page').hide()
    $('#home_page').hide()
    $('#ttt_page').hide()
    $('#splitboard_page').hide()
    $('#snowmachine_page').hide()
    $('#speakers_page').hide()
    $('#battleship_page').hide()
    $('#project_page').show()
  });

    $('#ttt_button').on('click',function(){
      $('#playbox').hide()
      $('#chatbox').hide()
      $('#foot').hide()
      $('#lfoot').hide()
      $('#cfoot').hide()
      $('#splitboard_page').hide()
      $('#snowmachine_page').hide()
      $('#speakers_page').hide()
      $('#battleship_page').hide()
      $('#ttt_page').show()
      $('#login').show()
    });

    $('#battleship_button').on('click',function(){
      $('#ttt_page').hide()
      $('#splitboard_page').hide()
      $('#snowmachine_page').hide()
      $('#speakers_page').hide()
      $('#battleship_page').show()
    });

    $('#splitboard_button').on('click',function(){
      $('#ttt_page').hide()
      $('#snowmachine_page').hide()
      $('#speakers_page').hide()
      $('#battleship_page').hide()
      $('#splitboard_page').show()
    });

    $('#snowmachine_button').on('click',function(){
      $('#ttt_page').hide()
      $('#speakers_page').hide()
      $('#battleship_page').hide()
      $('#splitboard_page').hide()
      $('#snowmachine_page').show()
    });

    $('#speakers_button').on('click',function(){
      $('#ttt_page').hide()
      $('#battleship_page').hide()
      $('#splitboard_page').hide()
      $('#snowmachine_page').hide()
      $('#speakers_page').show()
    });

 });
