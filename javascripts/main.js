
$(function() {
  var gaJsHost, pageTracker, _ref;
  gaJsHost = (_ref = "https:" === document.location.protocol) != null ? _ref : {
    "https://ssl.": "http://www."
  };
  document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
  try {
    pageTracker = _gat._getTracker("UA-663197-13");
    return pageTracker._trackPageview();
  } catch (err) {
    if (console) return console.log(err);
  }
});
