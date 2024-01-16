local function getVersionNumbers(version)
    local nums = {}
    for num in version:gmatch("%d+") do
        table.insert(nums, tonumber(num))
    end
    return nums
end

local function isNewerVersion(current, latest)
    for i = 1, math.max(#current, #latest) do
        if (current[i] or 0) < (latest[i] or 0) then
            return true
        elseif (current[i] or 0) > (latest[i] or 0) then
            return false
        end
    end
    return false
end

local function checkVersion(repository, currentVersion)
    local resource = GetInvokingResource() or GetCurrentResourceName()
    local currentVersionNumbers = getVersionNumbers(currentVersion)

    if not currentVersionNumbers then
        return print(("^1Unable to determine current resource version for '%s' ^0"):format(resource))
    end

    SetTimeout(1000, function()
        PerformHttpRequest(('https://api.github.com/repos/%s/releases/latest'):format(repository),
            function(status, response)
                if status ~= 200 then return end

                local responseData = json.decode(response)
                if not responseData or responseData.prerelease then return end

                local latestVersion = responseData.tag_name:match('%d+%.%d+%.%d+')
                if not latestVersion then return end

                local latestVersionNumbers = getVersionNumbers(latestVersion)
                if isNewerVersion(currentVersionNumbers, latestVersionNumbers) then
                    print(('^3An update is available for %s (current version: %s)\r\n%s^0'):format(
                        resource, currentVersion, responseData.html_url))
                end
            end, 'GET')
    end)
end

local function checkResourceUI()
    if not LoadResourceFile(GetCurrentResourceName(), 'web/dist/index.html') then
        local redColor = "^1"
        local resetColor = "^0"
        local currentVersion = "v1.0." 

        local err = string.format(
            "%sWARNING: You are using an outdated version of the wInfo resource (current version: %s).%s\n" ..
            "Please download the latest release from: https://github.com/whereiamL/wInfo/releases/latest\n",
            redColor, currentVersion, resetColor)

        print(err)
    end
end

checkResourceUI()
checkVersion("whereiamL/wInfo", "v1.0.")
