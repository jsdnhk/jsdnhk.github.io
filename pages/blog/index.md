---
layout: page
title: Blog
title_image: "apps/basket.png"
title_display: true
footer_quote: "\"Learn and often review and practice, and is this not very happy?\"---Confucius"
permalink: /blog/
---

## Latest Blog Posts

{% for post in site.posts %}
{% if post.display or jekyll.environment == 'development' %}
  * {{ post.date | date: "%Y%m%d" }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endif %}
{% endfor %}