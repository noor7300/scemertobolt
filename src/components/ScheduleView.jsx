import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function ScheduleView() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMatches()
  }, [])

  async function fetchMatches() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          team1:team1_id (name, code, flag),
          team2:team2_id (name, code, flag)
        `)
        .order('match_date')

      if (error) throw error
      setMatches(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) return <div className="loading">Loading schedule...</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="content-scroll">
      {matches.map(match => (
        <div key={match.id} className="match-card">
          <div className="match-teams">
            <div className="match-team">
              <div className="match-flag">{match.team1?.flag}</div>
              <div className="match-team-name">{match.team1?.name}</div>
            </div>
            <div className="match-vs">VS</div>
            <div className="match-team">
              <div className="match-flag">{match.team2?.flag}</div>
              <div className="match-team-name">{match.team2?.name}</div>
            </div>
          </div>
          <div className="match-info">
            <div className="match-venue">{match.venue}</div>
            <div className="match-date">{formatDate(match.match_date)}</div>
            <div className="match-badges">
              <span className="match-badge">{match.match_type}</span>
              <span className="match-badge">{match.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScheduleView
