/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * Escape string to prevent XSS attacks
 * @param {*} str 
 * @returns 
 */
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

/**
 * Create HTML output for a individual tweet
 * @param {*} tweet a object represent for a tweet
 * @returns 
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

/**
 * Render all twwets
 * @param {*} data an object represent for all tweets
 */

const renderTweets = function (data) {
  // Sort tweet by created to display newest tweet first
  tweets = data.sort((a, b) => {
    return a.created_at - b.created_at < 0;
  });

  for (let tweet of tweets) {
    // Create HTML output for each tweet
    let outputTweetHtml = createTweetElement(tweet);
    // Append HTML content to tweet container
    $("#tweet-container").append(outputTweetHtml);
  }
}

/**
 * Load all tweets after page was ready
 * Render tweets
 */
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

/**
 * Check a text is a valid tweet
 * @param {*} tweetText 
 * @returns -1: the length of text <= 0, 0: the length of text > 140, 1: valid
 */
const validTweet = function(tweetText) {
  if (tweetText.length <= 0) {
    return -1;
  } else if (tweetText.length > 140) {
    return 0;
  }
  return 1;
}

$(document).ready(function () {
  // Load all tweets after document was ready
  loadTweets();
  
  /**
   * Handle form submit new tweet
   */
  $("#frm-new-tweet").submit(function (event) {
    event.preventDefault();
    // Get form datas
    let val = escape($("#txt-tweet-text").val());
    var form = $(this);
    var actionUrl = form.attr('action');

    // Check tweet content is valid
    if (validTweet(val) === 1) {
      $('span.error').empty();
      // Send ajax post to server
      $.ajax({
        type: "POST",
        url: actionUrl,
        data: form.serialize(), // serializes the form's elements.
        success: function (response) {
          // Create new HTML output for newest tweet and prepend to the top of tweet container
          $("#tweet-container").prepend(createTweetElement(response));

          // Reset value of textarea and counter
          $("#txt-tweet-text").val('');
          $(".counter").html(140);
        }
      });
    // Display error if tweet text is invalid
    } else if (validTweet(val) === -1) {
      $('span.error').html("Tweet can't be empty");
    } else if (validTweet(val) === 0) {
      $('span.error').html("Tweet can't be too long");
    }
  });

  // Handle new tweet form toggle when user click "Write a new tweet"
  $('#btnNewTweet').click(function(event) {
    $(".new-tweet").slideToggle("slow");
    $("#txt-tweet-text").focus();
  });

})


