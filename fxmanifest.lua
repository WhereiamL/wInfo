fx_version "cerulean"

description "Info menu made for FiveM"
author "WhereiamL"
version '1.0.0'

lua54 'yes'

games {
  "gta5",
  "rdr3"
}

ui_page 'web/build/index.html'
shared_scripts 	{'@es_extended/imports.lua', 	'@ox_lib/init.lua', 'shared.lua'}
client_script "client/**/*"
server_scripts {
	'@oxmysql/lib/MySQL.lua',
  'server/*.lua'
}

files {
	'web/build/index.html',
	'web/build/**/*',
}