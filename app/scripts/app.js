 $(document).ready(function(){
  $('#projects_button').on('click',function(){
    $('html, body').animate({
        scrollTop: $("projects_page_location").offset()
    }, 2000);
  });
  $('#home_button').on('click',function(){
  });
  $('#about_button').on('click',function(){
  });

 });
