shared = {}

-- Text configuration for localization purposes
shared.locales = {
    textConfig = {
        buttons = {  -- Make sure to add this nested object
            players = "Players",
            hotkeys = "Hotkeys",
            rules = "Rules"
        },
        playersList = {
            searchBarPlaceholder = "Search players...",
            noPlayersFound = "No players found.",
            onlinePlayersCount = "Online Players",
            searchPlayer = "Search players..."
        },
        roles = {
            police = "Police" ,
            mechanic = "Mechanic",
            ambulance = "Ambulance"
        }
    }
}

shared.MenuKey = {
    keyMapping = 'z',  -- Default key mapping
}

-- Configuration for various UI and feature settings
shared.config = {
    searchBar = true, --Enable / Disable search bar for scoreboard category
    totalPlayerCount = true, -- Enable Disable Total player online count for scoreboard category
    logo = true, -- Enable /Disable the logo
    maxPlayer = 100, --Put here your slots of your server
    rules = true, --Enable / Disable rules category
    hotkeys = true,  --Enable / Disable hotkey category
    playersList = true, -- Enable / Disable scoreboard category
    police = true, --Enable / Disable police informations in scoreboard category
    mechanic = true, --Enable / Disable mechanic informations in scoreboard category
    ambulance = true, --Enable / Disable ambulance informations in scoreboard category
    logoLink = "https://i.imgur.com/Gp8KNHf.png" -- Set here your logo link if "logo" is set to = true
}

-- Rules configuration
shared.rules = { --Add rules here if rules in shared.config are set to true 
    { id = 1, text = "Rule 1" },
    { id = 2, text = "Rule 2" },
    { id = 3, text = "Enjoy the trip!" },
    -- Add more rules here as needed
}

-- Hotkeys configuration
shared.hotkeys = { --Add hotkeys here if hotkeys in shared.config are set to true 
    { id = 1, key = "F1", action = "Open menu" },
    { id = 2, key = "F2", action = "Open inventory" },
    -- Add more hotkeys here as needed
}
