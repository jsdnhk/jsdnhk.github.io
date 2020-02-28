---
layout: page
title: "Toolset"
title_image: "actions/tools-wizard.png"
title_display: true
footer_quote: "\"An artisan must first sharpen his tools if he is to do his work well.\"---Confucius"
permalink: "/toolset/"
---
{% for role in site.data.toolset_roles %}


## {{ role.emoji }} {{ role.name  | capitalize }}
### Duties: {{ role.desc | downcase }}

{% for groups_hash in site.data.toolset %}
{% assign shortname = groups_hash[0] %}
{% assign groups = groups_hash[1] %}
{% if shortname == role.name_short %}
{% for group in groups %}
#### {{ group.group }}
{% for tool in group.tools %}

* [{{ tool.name }}]({{ tool.url }}): {{ tool.desc | capitalize }}

{% endfor %}
{% endfor %}
{% endif %}
{% endfor %}
{% endfor %}