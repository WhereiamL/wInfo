local currentVersion = 'v1.0'
local repo = 'whereiamL/wInfo'

function checkVersion()
    PerformHttpRequest('https://api.github.com/repos/' .. repo .. '/releases/latest', function(errorCode, resultData, resultHeaders)
        if errorCode == 200 then
            local data = json.decode(resultData)
            if data and data.tag_name then
                if data.tag_name ~= currentVersion then
                    print('^1Your version of ' .. repo .. ' is outdated. Latest version is ' .. data.tag_name .. '. Please update your script.^0')
                else
                    print('^2Your version of ' .. repo .. ' is up to date.^0')
                end
            else
                print('^3Unable to check for updates. Make sure your repository is public.^0')
            end
        else
            print('^1Failed to check for updates, HTTP Error Code: ' .. errorCode .. '^0')
        end
    end, 'GET', '', { ['User-Agent'] = 'Mozilla/5.0' })
end

checkVersion()
