/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const createTweetElement = function (tweet) {
  let outputHtml = 
    `<article class="tweet">
      <header>
        <div class="tweet-owner">
          <img src="${tweet.user.avatars}">
          <span>${tweet.user.name}</span>
        </div>
        <div class="tweet-username">
          <span>${tweet.user.handle}</span>
        </div>
      </header>
      <div class="tweet-body">${tweet.content.text}</div>
      <footer>
        <div class="footer-left">
          <span class="timeago">${timeago.format(tweet.created_at)}</span>
        </div>
        <div class="footer-right">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-arrows-rotate"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
  return outputHtml;
}

const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    let outputTweetHtml = createTweetElement(tweet);
    $("#tweet-container").append(outputTweetHtml);
  }
}

$(document).ready(function () {
  const loadTweets = function() {
    let url = "http://localhost:8080/tweets";
    $.ajax({
      type: "GET",
      url: url,
      success: function (data) {
        renderTweets(data);
      }
    });
  };
  loadTweets();
  //renderTweets(data);

  $("#frm-new-tweet").submit(function (event) {
    event.preventDefault();

    let val = $("#txt-tweet-text").val();
    var form = $(this);
    var actionUrl = form.attr('action');

    if (val.length > 0 && val.length < 140) {
      //console.log("Form submited", val);
      $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (data) {
          alert(data); // show response from the php script.
        }
      });
    }
  });

})


