Player = {}
Player.__index = Player

function Player.new(id)
    local self = setmetatable({}, Player)
    self.id = id
    self.nick = GetPlayerName(id) or "Unknown"
    self.ping = GetPlayerPing(id) or 0
    self.job = nil
    return self
end

function Player:setJob(job)
    self.job = job
end
