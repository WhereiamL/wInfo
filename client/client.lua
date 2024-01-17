local function toggleNuiFrame(shouldShow)
  SetNuiFocus(shouldShow, shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

RegisterNetEvent('updatePlayerData')
AddEventHandler('updatePlayerData', function(data)
    local combinedData = {
      shared = shared,
      igraci = data
  }
    SendReactMessage('setCombinedData', combinedData)
end)

RegisterKeyMapping('+WhereiamLPanel','Toggle Info Panel', 'keyboard', shared.MenuKey.keyMapping)

RegisterCommand('+WhereiamLPanel', function()
  toggleNuiFrame(true)
end, false)

RegisterCommand('-WhereiamLPanel', function() end, false) 

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)