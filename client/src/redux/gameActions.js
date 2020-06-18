export const setGameAndConnect = roomId => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`http://localhost:3001/rooms/${roomId}/games`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    if (!json.error) {
                        dispatch({ type: 'SET_GAME', game: json})
                        dispatch(subscribeGame(json.id))
                    }
                })
        }
    }
}

export const startGameAndConnect = roomId => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch(`http://localhost:3001/rooms/${roomId}/games`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    dispatch({ type: 'SET_GAME', game: json })
                })
        }
    }
}

export const deleteGame = () => ({ type: 'DELETE_GAME' })

export function subscribeGame(gameId) {
    return {
      channel: 'GameChannel',
      game: `${gameId}`
    }
}

export function unsubscribeGoom(gameId) {
    return {
      channel: 'GameChannel',
      game: `${gameId}`,
      leave: true
    }
}   