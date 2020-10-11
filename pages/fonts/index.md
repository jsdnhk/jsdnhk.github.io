---
layout: page
title: "Fonts"
# title_image: "apps/preferences-desktop-font.png"
title_image: "apps/fontforge.png"
title_display: true
footer_quote: '"If names be not correct, language is not in accordance with the truth of things."---Confucius'
permalink: "/fonts/"
---

{% for type in site.data.fonts_types %}

## {{ type.name | capitalize }}

### {{ type.desc | downcase }}

{% for fonts_hash in site.data.fonts %}
{% assign shortname = fonts_hash[0] %}
{% assign fonts = fonts_hash[1] %}
{% if shortname == type.name_short %}
{% for font in fonts %}

- [{{ font.name }}]({{ font.url }}): {{ font.desc | capitalize }}

{% endfor %}
{% endif %}
{% endfor %}
{% endfor %}
