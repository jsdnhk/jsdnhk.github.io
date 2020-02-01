---
layout: page
title: Quotes
title_image: "apps/ktip.png"
title_display: true
footer_quote: "\"Learning without thinking leads to confusion, thinking without learning ends in danger.\"---Confucius"
permalink: /quotes/
---
{% for celebrity in site.data.quotes_celebrities %}


## ![](/assets/images/flags_country/{{ celebrity.place_birth | downcase | strip }}.svg){{ celebrity.name }} ({{ celebrity.date_birth | date: "%d %b, %Y" }} – {{ celebrity.date_gone | date: "%Y" }})
### {{ celebrity.titles | join: ', ' }}

{% for quotes_hash in site.data.quotes %}
{% assign shortname = quotes_hash[0] %}
{% assign quotes = quotes_hash[1] %}
{% if shortname == celebrity.name_short %}
{% for quote in quotes %}

> {{ quote }}

{% endfor %}
{% endif %}
{% endfor %}
{% endfor %}