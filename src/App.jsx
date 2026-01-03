import { useState } from 'react'
import TeamsView from './components/TeamsView'
import PlayersView from './components/PlayersView'
import ScheduleView from './components/ScheduleView'

function App() {
  const [activeTab, setActiveTab] = useState('players')

  const getHeaderTitle = () => {
    switch(activeTab) {
      case 'players': return 'Star Players'
      case 'teams': return 'Teams'
      case 'schedule': return 'Match Schedule'
      default: return 'Cricket Tournament'
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>{getHeaderTitle()}</h1>
      </header>

      <main className="content">
        {activeTab === 'players' && <PlayersView />}
        {activeTab === 'teams' && <TeamsView />}
        {activeTab === 'schedule' && <ScheduleView />}
      </main>

      <nav className="bottom-nav">
        <button
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <div className="nav-icon"></div>
          <div className="nav-label">Home</div>
        </button>
        <button
          className={`nav-item ${activeTab === 'schedule' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedule')}
        >
          <div className="nav-icon"></div>
          <div className="nav-label">Schedule</div>
        </button>
        <button
          className={`nav-item ${activeTab === 'teams' ? 'active' : ''}`}
          onClick={() => setActiveTab('teams')}
        >
          <div className="nav-icon"></div>
          <div className="nav-label">Teams</div>
        </button>
        <button
          className={`nav-item ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          <div className="nav-icon"></div>
          <div className="nav-label">Players</div>
        </button>
        <button
          className={`nav-item ${activeTab === 'more' ? 'active' : ''}`}
          onClick={() => setActiveTab('more')}
        >
          <div className="nav-icon"></div>
          <div className="nav-label">More</div>
        </button>
      </nav>
    </div>
  )
}

export default App
