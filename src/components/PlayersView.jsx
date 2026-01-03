import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function PlayersView() {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchPlayers()
  }, [])

  async function fetchPlayers() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('name')

      if (error) throw error
      setPlayers(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredPlayers = players.filter(player => {
    if (filter === 'All') return true
    if (filter === 'Batsmen') return player.role === 'Batsman'
    if (filter === 'Bowlers') return player.role === 'Bowler'
    if (filter === 'All-rounders') return player.role === 'All-rounder'
    if (filter === 'Keepers') return player.role === 'Wicket-keeper Batsman'
    return true
  })

  const getRoleClass = (role) => {
    if (role === 'Bowler') return 'bowler'
    if (role === 'All-rounder') return 'allrounder'
    if (role === 'Wicket-keeper Batsman') return 'keeper'
    return ''
  }

  if (loading) return <div className="loading">Loading players...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <>
      <div className="content-inner">
        <div className="filter-tabs">
          {['All', 'Batsmen', 'Bowlers', 'All-rounders', 'Keepers'].map(filterName => (
            <button
              key={filterName}
              className={`filter-tab ${filter === filterName ? 'active' : ''}`}
              onClick={() => setFilter(filterName)}
            >
              {filterName}
            </button>
          ))}
        </div>
        <div className="count-text">
          {filteredPlayers.length} Players
        </div>
      </div>

      <div className="content-scroll">
        {filteredPlayers.map(player => (
          <div key={player.id} className="player-card">
            <div className={`player-avatar ${getRoleClass(player.role)}`}></div>
            <div className="player-info">
              <div className="player-name">{player.name}</div>
              <div className="player-country">
                <span className="player-country-flag">{player.flag}</span>
                <span className="player-country-name">{player.country}</span>
              </div>
              <div className={`player-badge ${getRoleClass(player.role)}`}>
                {player.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default PlayersView
