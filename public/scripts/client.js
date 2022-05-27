/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      <div class="tweet-body">${escape(tweet.content.text)}</div>
      <footer>
        <div class="footer-left">
          <span class="timeago">${timeago.format(tweet.created_at)}</span>
        </div>
        <div class="footer-right">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`;
  return outputHtml;
}



const renderTweets = function (data) {
  // Sort tweet by created to display newest tweet first
  tweets = data.sort((a, b) => {
    return a.created_at - b.created_at < 0;
  });

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
  const validTweet = function(tweetText) {
    if (tweetText.length <= 0) {
      return -1;
    } else if (tweetText.length > 140) {
      return 0;
    }
    return 1;
  }

  $("#frm-new-tweet").submit(function (event) {
    event.preventDefault();
    let val = escape($("#txt-tweet-text").val());
    var form = $(this);
    var actionUrl = form.attr('action');

    if (validTweet(val) === 1) {
      $('span.error').empty();
      $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (response) {
          $("#tweet-container").prepend(createTweetElement(response));
          $("#txt-tweet-text").val('');
          $(".counter").html(140);
        }
      });
    } else if (validTweet(val) === -1) {
      $('span.error').html("Tweet can't be empty");
    } else if (validTweet(val) === 0) {
      $('span.error').html("Tweet can't be too long");
    }
  });

  // Show/hide New Tweet panel when user click on "Write a new tweet"
  $('#btnNewTweet').click(function(event) {
    $(".new-tweet").slideToggle("slow");
    $("#txt-tweet-text").focus();
  });

})


