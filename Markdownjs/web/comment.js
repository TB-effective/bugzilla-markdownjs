//Written by Ryan Lee

'use strict';
/*jslint node:true, indent:2, nomen:true*/

// https://bugzilla.vircon.net/show_bug.cgi?id=13910                                                                                                                                   
// Switch to Markdown-it and set some options the way we want them.                                                                                                                    
const md = markdownit({
    html: true,
    linkify: true,
    breaks: true
  }
);

$('.bz_comment_text').each(function () {
  var elm = $(this);
  elm
    .after(
      '<div style="markdown markdown-comment" id="' + elm.attr('id') + '_markdown">' +
        md.render(elm.text()) +
      '</div><a href="#' + elm.attr('id') +
      '" class="markdown-btn">Show Raw</a>'
    )
    .hide();
});

$('.markdown-btn').click(function (e) {
  e.preventDefault();
  var $elm = $(this);
  if ($elm.text() === 'Show Raw') {
    $elm.text('Show Markdown');
  } else {
    $elm.text('Show Raw');
  }
  $($elm.attr('href')).toggle();
  $($elm.attr('href') + '_markdown').toggle();
});

$('#comment').on('input', function () {
  $('#bz_preview').html(md.render($(this).val()));
});

$('.markdown-help').each(function (elm) {
  var elm = $(this);
  elm.html(md.render(elm.text()));
});

$('#syntax-help-btn').click(function (e) {
  e.preventDefault();
  $('#syntax-help-show').toggle();
});
