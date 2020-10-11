---
layout: page
title: Links
title_image: "apps/preferences-contact-list.png"
title_display: true
footer_quote: '"Knowing others is wisdom, knowing yourself is enlightenment."---Laozi'
permalink: /links/
---

{% for link in site.data.links %}

## ![image]({{ site.path_header_image.h2 }}{{ link.icon | downcase | strip }}){{ link.type }}

{% for suggestion in link.suggestions %}

- <{{ suggestion }}>

{% endfor %}
{% endfor %}
