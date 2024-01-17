
players = {}
jobCounts = {
    mechanic = 0,
    police = 0,
    ambulance = 0
}


-- Sends player data to all clients
local function sendPlayerData()
    local totalPlayers = 0
    for _ in pairs(players) do
        totalPlayers = totalPlayers + 1
    end

    local dataToSend = {
        jobCounts = jobCounts,
        totalPlayers = totalPlayers,
        players = players
    }

    TriggerClientEvent('updatePlayerData', -1, dataToSend)
end

-- Updates job count when a player's job changes
local function updateJobCount(oldJob, newJob)
    if oldJob then
        jobCounts[oldJob] = math.max((jobCounts[oldJob] or 0) - 1, 0)
    end
    if newJob then
        jobCounts[newJob] = (jobCounts[newJob] or 0) + 1
    end
end

-- Event handler when a player is dropped
AddEventHandler('esx:playerDropped', function(playerId, reason)
    local playerIdString = tostring(playerId)
    local player = players[playerIdString]
    if player then
        updateJobCount(player.job, nil)
        players[playerIdString] = nil
        sendPlayerData()
    end
end)

-- Event handler when a player is loaded
AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
    local playerIdString = tostring(playerId)
    players[playerIdString] = Player.new(playerId)
    sendPlayerData()
end)

-- Event handler when a player's job is set
AddEventHandler('esx:setJob', function(source, job, lastjob)
    local playerIdString = tostring(source)
    local player = players[playerIdString]
    if player then
        updateJobCount(player.job, job.name)
        player:setJob(job.name)
        sendPlayerData()
    else
        print("Error: Player not found for ID " .. source)
    end
end)

-- Updates the ping of all players
local function updatePlayerPings()
    for id, player in pairs(players) do
        player.ping = GetPlayerPing(id) or player.ping
    end
end

-- Continuously updates player pings every 5 seconds
function updatePlayerPing()
    while true do
        Citizen.Wait(5000)
        updatePlayerPings()
    end
end

CreateThread(updatePlayerPing)

-- Event handler when the resource starts
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        Citizen.Wait(400)

        local playersOnline = GetPlayers()
        for _, playerId in ipairs(playersOnline) do
            players[tostring(playerId)] = Player.new(playerId)
        end

        sendPlayerData()
    end
end)
