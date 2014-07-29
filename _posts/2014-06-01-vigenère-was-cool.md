---
layout: post
title: .vigenère was cool
---

Well... Actually [Giovan Battista Bellaso](http://en.wikipedia.org/wiki/Giovan_Battista_Bellaso) was cool because he invented the [Vigenère cipher](http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) but wasn't credited for his discovery by many. All around Bellaso seems to be a fairly talented person (Vigenère too) but one day he devised a method to encipher a message which was quite successful.

As a developer I often feel like I have tangential experience in fields I know little about. When people would tell me "Vigenère cipher is broken" I would blindly repeat what they said; usually followed by the explanation common in Hollywood movies describing statistical analysis of cipher text to guess keys. Cryptography was a field which I felt I understood until researching earlier non-machine cryptography.

One cipher which stood out was Bellaso's cipher as it is not susceptible to using common words or characters in order to decode the message. The only way I can find to decrypt messages encrypted with Bellaso's cipher is to either have the key or know the language the message is written in and know the key length. If I know the language and the key length of the message then I have enough intelligence to steal the key too.

I am not much of a historian so in order for me to enjoy the work which was done I implemented a Vigenère cipher in coffeescript and [here it is](https://github.com/eerwitt/Vigenere/blob/master/vigen%C3%A8re.coffee). It needs some sort of interactivity.

{% highlight coffee %}
  {% include vigenere.coffee %}
{% endhighlight %}

Interesting note, UTF8 in filenames or code messes up Github.
