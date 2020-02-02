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
{% assign isDisplayTestPosts = jekyll.environment == 'development' %}
{% if post.display or isDisplayTestPosts %}
  * {{ post.date | date_to_string }} &raquo; [ {{ post.title }} ]({{ post.url }})
{% endif %}
{% endfor %}