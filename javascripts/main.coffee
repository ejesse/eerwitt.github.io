$ ->
  document.write unescape("%3Cscript src='http://www.google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E")

  try
    pageTracker = _gat._getTracker("UA-663197-13")
    pageTracker._trackPageview()
  catch err
    console.log err if typeof console isnt "undefined"
