import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function TeamsView() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    fetchTeams()
  }, [])

  async function fetchTeams() {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name')

      if (error) throw error
      setTeams(data || [])
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const filteredTeams = teams.filter(team => {
    if (filter === 'All') return true
    return team.group_name === filter
  })

  if (loading) return <div className="loading">Loading teams...</div>
  if (error) return <div className="error">Error: {error}</div>

  const groups = ['All', 'Group A', 'Group B', 'Group C', 'Group D']

  return (
    <>
      <div className="content-inner">
        <div className="filter-tabs">
          {groups.map(groupName => (
            <button
              key={groupName}
              className={`filter-tab ${filter === groupName ? 'active' : ''}`}
              onClick={() => setFilter(groupName)}
            >
              {groupName}
            </button>
          ))}
        </div>
        <div className="count-text">
          {filteredTeams.length} Teams
        </div>
      </div>

      <div className="content-scroll">
        {filteredTeams.map(team => (
          <div key={team.id} className="team-card">
            <div className="team-flag">{team.flag}</div>
            <div className="team-info">
              <div className="team-name">{team.name}</div>
              <div className="team-code">{team.code}</div>
            </div>
            <div className="team-group">{team.group_name}</div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TeamsView
