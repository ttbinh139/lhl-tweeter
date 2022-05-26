/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function (tweet) {
  let outputHtml = `<article class="tweet">
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
                        <span>${tweet.created_at}</span>
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
  renderTweets(data);

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


