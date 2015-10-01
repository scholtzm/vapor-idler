exports.name = 'vapor-idler';

exports.plugin = function(VaporAPI) {
    var isIdling = false;

    var steamUser = VaporAPI.getHandler('steamUser');
    var utils = VaporAPI.getUtils();
    var Steam = VaporAPI.getSteam();

    var config = VaporAPI.data || {};
    if(!('games' in config)) {
        VaporAPI.emitEvent('message:error', 'Array of game IDs in your config is missing.');
        return;
    }

    // Construct CMsgClientGamesPlayed message
    var clientMessage = {games_played: []};
    for(var i = 0; i < config.games.length; i++) {
        clientMessage.games_played.push({game_id: config.games[i]});
    }

    VaporAPI.registerHandler({
            emitter: 'steamFriends',
            event: 'friendMsg'
        },
        function(user, message, type) {
            if(type === Steam.EChatEntryType.ChatMsg && utils.isAdmin(user)) {
                if(message === '!idle') {
                    if(isIdling) {
                        steamUser.gamesPlayed({games_played:[]});
                        VaporAPI.emitEvent('message:info', 'Stopped idling.');
                    } else {
                        steamUser.gamesPlayed(clientMessage);
                        VaporAPI.emitEvent('message:info', 'Started idling in the following games: ' + config.games.join(','));
                    }

                    isIdling = !isIdling;
                }
            }
        }
    );

    // Register this handler only if autoStart is set to true
    if(config.autoStart === true) {
        VaporAPI.registerHandler({
                emitter: 'vapor',
                event: 'ready'
            },
            function() {
                steamUser.gamesPlayed(clientMessage);
                VaporAPI.emitEvent('message:info', 'Idling has been started automatically.');
                isIdling = true;
            }
        );
    }

};
