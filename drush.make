core = 7.x
api = 2
projects[] = "drupal"

; Modules
projects[admin_menu][version] = "3.0-rc3"
projects[ctools][version] = "1.2"
projects[coder][version] = "1.0"
projects[date][version] = "2.6"
projects[devel][version] = "1.3"
projects[entity][version] = "1.0-rc3"
projects[entity_translation][version] = "1.0-alpha2"
projects[entityreference][version] = "1.0-rc3"
projects[features][version] = "1.0"
projects[field_collection][version] = "1.0-beta4"
projects[file_entity][version] = "2.0-unstable6"
projects[styles][version] = "2.0-alpha8"
projects[geofield][version] = "1.1"
projects[libraries][version] = "1.0"
projects[media][version] = "1.2"
projects[media_flickr][version] = "1.0-alpha3"
projects[media_youtube][version] = "1.0-beta3"
projects[openlayers][version] = "2.0-beta1"
projects[strongarm][version] = "2.0"
projects[title][version] = "1.0-alpha4"
projects[token][version] = "1.4"
projects[transliteration][version] = "3.1"
projects[views][version] = "3.5"
projects[wysiwyg][version] = "2.1"
projects[geophp][version] = "1.6"
projects[jplayer][version] = "2.0-beta1"


; TAP Modules
projects[tap_features][download][type] = ""
projects[tap_features][download][url] = ""
projects[tap_features][type] = "module"
projects[tap_features][subdir] = "tap-cms/modules/tap"
projects[tap_features][version] = "2.0-dev"

projects[tap_geo][download][type] = ""
projects[tap_geo][download][url] = ""
projects[tap_geo][type] = "module"
projects[tap_geo][subdir] = "tap-cms/modules/tap"
projects[tap_geo][version] = "1.1-dev"

projects[tap_graphviz][download][type] = ""
projects[tap_graphviz][download][url] = ""
projects[tap_graphviz][type] = "module"
projects[tap_graphviz][subdir] = "tap-cms/modules/tap"
projects[tap_graphviz][version] = "1.0-dev"

projects[tap_webapp][download][type] = ""
projects[tap_webapp][download][url] = ""
projects[tap_webapp][type] = "module"
projects[tap_webapp][subdir] = "tap-cms/modules/tap"
projects[tap_webapp][version] = "1.1-dev"

projects[tap-cms][type] = "module"
projects[tap-cms][download][type] = "get"
projects[tap-cms][download][url] = "https://github.com/IMAmuseum/tap-cms/archive/master.zip"


; Libraries
libraries[jplayer][download][type] = "get"
libraries[jplayer][download][url] = "http://www.jplayer.org/latest/jQuery.jPlayer.2.2.0.zip"
libraries[jplayer][directory_name] = "jplayer"
libraries[jplayer][type] = "library"


; GeoPHP cannot be downloaded with drush due to github forcing https
;libraries[geoPHP][download][type] = "get"
;libraries[geoPHP][download][url] = "http://github.com/downloads/phayes/geoPHP/geoPHP.tar.gz"
;libraries[geoPHP][directory_name] = "geoPHP"
;libraries[geoPHP][type] = "library"

libraries[FirePHPCore][download][type] = ""
libraries[FirePHPCore][download][url] = ""
libraries[FirePHPCore][directory_name] = "FirePHPCore"
libraries[FirePHPCore][type] = "library"

libraries[syntaxhighlighter_3.0.83][download][type] = ""
libraries[syntaxhighlighter_3.0.83][download][url] = ""
libraries[syntaxhighlighter_3.0.83][directory_name] = "syntaxhighlighter_3.0.83"
libraries[syntaxhighlighter_3.0.83][type] = "library"

libraries[ckeditor][download][type] = "get"
libraries[ckeditor][download][url] = "http://download.cksource.com/CKEditor/CKEditor/CKEditor%203.6.2/ckeditor_3.6.2.tar.gz"
libraries[ckeditor][directory_name] = "ckeditor"
libraries[ckeditor][type] = "library"
