import React, { useState } from "react";
import { FaQuestionCircle, FaKeyboard, FaArrowRight, FaHeart, FaUserFriends, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import "./App.css";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { debugData } from "../utils/debugData";

debugData([
  {
    action: "setVisible",
    data: false,
  },
]);


const App = () => {
  const [activeSection, setActiveSection] = useState(null);
 
  const [rules, setRules] = useState([]);
    const [hotkeys, setHotkeys] = useState([]);
    const [players, setPlayers] = useState([]);
    const [policeCount, setPoliceCount] = useState(0);
    const [mechanicCount, setMechanicCount] = useState(0);
    const [ambulanceCount, setAmbulanceCount] = useState(0);
    
    type TextConfig = {
      buttons: {
        players: string;
        hotkeys: string;
        rules: string;
      };
      playersList: {
        searchBarPlaceholder: string;
        noPlayersFound: string;
        onlinePlayersCount: string;
        searchPlayer: string;
      };
      roles: {
        police: {
          label: string;
        };
        mechanic: {
          label: string;
        };
        ambulance: {
          label: string;
        };
      };
    };
    
    const initialTextConfig: TextConfig = {
      buttons: {
        players: "",
        hotkeys: "",
        rules: "",
      },
      playersList: {
        searchBarPlaceholder: "",
        noPlayersFound: "",
        onlinePlayersCount: "",
        searchPlayer: "",
      },
      roles: {
        police: {
          label: "",
        },
        mechanic: {
          label: "",
        },
        ambulance: {
          label: "",
        },
      },
    };
    const [textConfig, settextConfig] = useState(initialTextConfig);
    const [config, setConfig] = useState({
        searchBar: true,
        police: true,
        mechanic: true,
        ambulance: false,
        playersList: true,
        totalPlayerCount: true,
        hotkeys: true,
        rules: true,
        logo: true,
        logoLink: "https://i.imgur.com/Gp8KNHf.png",
        maxPlayer: 100,
    });

    useNuiEvent("setCombinedData", (data) => {
      if (data.shared) {
        setRules(data.shared.rules || []);
        setHotkeys(data.shared.hotkeys || []);
        settextConfig(data.shared.locales?.textConfig || {});
      }
  
      if (data.igraci) {
        const playersArray = Object.keys(data.igraci.players).map(key => {
            return {
                id: key,
                ...data.igraci.players[key]
            };
        });
        setPlayers(playersArray);
        setPoliceCount(data.igraci.jobCounts.police || 0);
        setMechanicCount(data.igraci.jobCounts.mechanic || 0);
        setAmbulanceCount(data.igraci.jobCounts.ambulance || 0);
    }
  });
  
  const toggleSection = (section) => {
    if (activeSection !== section) {
      setActiveSection(section);
    }
  };

  const isActive = (section) => activeSection === section;

  const onlinePlayersCount = players.length;
  const maxPlayers = config.maxPlayer;
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPlayers = searchTerm
    ? players.filter((player) => player.nick.toLowerCase().includes(searchTerm.toLowerCase()))
    : players;

  return (
    <div className="flex justify-center items-center h-screen  text-white">
      <div className="relative w-96 h-[30rem] bg-gray-900 p-4 rounded-xl shadow-xl flex flex-col pt-14 z-10">
        {config.logo && (
          <div className="absolute top-0 left-0 m-2 transform z-[-1]">
              <img src={config.logoLink} alt="Logo" className="h-20 opacity-35" />
          </div>
        )}
        <div className="flex justify-center space-x-4 mb-4">
          {config.rules && (
            <button
              className={`flex items-center ${
                !isActive("rules") ? "bg-gray-600 hover:bg-gray-800" : "bg-gray-800"
              } text-white px-3 py-2 rounded transition duration-300`}
              onClick={() => toggleSection("rules")}
            >
              <FaQuestionCircle
                className={`mr-2 ${isActive("rules") ? "text-yellow-300 animate-pulse" : ""}`}
              />
              <span>{textConfig.buttons.rules}</span>
            </button>
          )}
          {config.hotkeys && (
            <button
              className={`flex items-center ${
                !isActive("hotkeys") ? "bg-gray-600 hover:bg-gray-800" : "bg-gray-800"
              } text-white px-3 py-2 rounded transition duration-300`}
              onClick={() => toggleSection("hotkeys")}
            >
              <FaKeyboard
                className={`mr-2 ${isActive("hotkeys") ? "text-yellow-300 animate-pulse" : ""}`}
              />
              <span>{textConfig.buttons.hotkeys}</span>
            </button>
          )}
          {config.playersList && (
            <button
              className={`flex items-center ${
                !isActive("players") ? "bg-gray-600 hover:bg-gray-800" : "bg-gray-800"
              } text-white px-3 py-2 rounded transition duration-300`}
              onClick={() => toggleSection("players")}
            >
              <FaUserFriends
                className={`mr-2 ${isActive("players") ? "text-yellow-300 animate-pulse" : ""}`}
              />
              <span>{textConfig.buttons.players}</span>
            </button>
          )}
        </div>
        <div className="flex-grow overflow-y-auto">
          {config.rules && activeSection === "rules" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {rules.map((rule) => (
                <div key={rule.id} className="p-2 my-1 border border-gray-800 rounded bg-gray-800">
                  {rule.text}
                </div>
              ))}
            </motion.div>
          )}
          {config.hotkeys && activeSection === "hotkeys" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {hotkeys.map((hotkey) => (
                <div key={hotkey.id} className="flex items-center p-2 my-1 border border-gray-800 rounded bg-gray-800">
                  <span className="font-bold text-sm">{hotkey.key}</span>
                  <FaArrowRight className="mx-2" />
                  <span className="text-sm">{hotkey.action}</span>
                </div>
              ))}
            </motion.div>
          )}
          {config.playersList && activeSection === "players" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col h-full"
            >
                  
                <div className="flex flex-col my-2">
                  <div className="flex justify-center space-x-2 mb-2">
                  {config.police && (
                    <div className="flex items-center justify-center bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded-md shadow-sm">
                      {textConfig.roles.police}:<span className="ml-1"> {policeCount}</span>
                    </div>
                  )}
                  {config.mechanic && (
                    <div className="flex items-center justify-center bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded-md shadow-sm">
                      {textConfig.roles.mechanic}: <span className="ml-1">{mechanicCount}</span>
                    </div>
                  )}
                  {config.ambulance && (
                    <div className="flex items-center justify-center bg-gray-700 text-white text-sm font-medium px-3 py-1 rounded-md shadow-sm">
                      {textConfig.roles.ambulance}: <span className="ml-1">{ambulanceCount}</span>
                    </div>
                  )}

                  </div>
                  {config.searchBar && (
                    <div className="relative rounded-md overflow-hidden shadow-md bg-gray-600 w-full">
                      <input
                        type="text"
                        placeholder={textConfig.playersList.searchPlayer}
                        className="w-full bg-transparent text-white text-xs pl-8 pr-2 py-1"
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <FaSearch className="text-white text-sm" />
                      </div>
                    </div>
                  )}
                </div>
              
              <div className="overflow-y-auto flex-grow">
                {filteredPlayers.length > 0 ? (
                  filteredPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex justify-between items-center p-2 my-1 border border-gray-800 rounded bg-gray-800 hover:bg-gray-700 transition duration-300"
                    >
                      <span>{player.nick}</span>
                      <div className="flex items-center">
                        <span className="px-2 py-1 bg-gray-700 text-white text-sm rounded mr-2 w-16 text-center">
                          ID: {player.id}
                        </span>
                        <span className="px-2 py-1 bg-gray-700 text-white text-sm rounded w-20 text-center">
                          Ping: {player.ping}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400"> {textConfig.playersList.noPlayersFound}</div>
                )}
              </div>
              {config.totalPlayerCount && (
                <div className="bg-gray-700 rounded p-2 mt-2">
                  <div className="flex justify-center items-center text-white text-sm">
                    <FaUserFriends className="text-blue-400 mr-1" />
                    {onlinePlayersCount}/{maxPlayers} {textConfig.playersList.onlinePlayersCount}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400 flex items-center justify-center">
            <FaHeart className="text-red-500 mr-2" />
            Created by WhereiamL
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
