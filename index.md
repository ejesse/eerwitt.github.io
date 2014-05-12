---
layout: default
title: (e3) Home
---

{% for post in site.posts %}
{% if post.featured %}
{{ post.content }}
{% endif %}
{% endfor %}
