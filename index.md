---
layout: default
title: (e3) Homepage
---

{% for post in site.posts %}
{% if post.featured %}
{{ post.content }}
{% endif %}
{% endfor %}
