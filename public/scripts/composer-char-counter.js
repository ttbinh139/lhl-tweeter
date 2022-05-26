$(document).ready(function() {
  $("#txt-tweet-text").keyup(function(event) {
    let text = $(this).val();
    let characterLeft = 140 - text.length;
    $(".counter").html(characterLeft);
    if (characterLeft < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");  
    }
  })
});