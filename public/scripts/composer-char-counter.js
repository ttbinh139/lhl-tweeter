/**
 * Display counter characters when user typing in text area
 * Display counter in red color when over 140 characters
 */
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