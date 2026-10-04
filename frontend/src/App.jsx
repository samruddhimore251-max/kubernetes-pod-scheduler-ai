import { useState } from 'react'
import './App.css'

function App() {
  const [activePage, setActivePage] = useState('Dashboard')

  const menuItems = [
    ['▣', 'Dashboard'],
    ['▤', 'Nodes'],
    ['◈', 'Pods'],
    ['✦', 'AI Scheduler'],
    ['◷', 'History'],
  ]

  const nodes = [
    { name: 'node-worker-01', cpu: '42%', ram: '58%', status: 'Online' },
    { name: 'node-worker-02', cpu: '31%', ram: '46%', status: 'Online' },
    { name: 'node-worker-03', cpu: '55%', ram: '67%', status: 'Online' },
    { name: 'node-master-01', cpu: '28%', ram: '41%', status: 'Online' },
  ]

  const pods = [
    ['pod-payment-service', 'node-worker-02', '94%', 'Scheduled'],
    ['pod-user-service', 'node-worker-01', '91%', 'Scheduled'],
    ['pod-inventory', 'node-worker-03', '87%', 'Scheduled'],
    ['pod-auth-service', 'node-worker-02', '89%', 'Scheduled'],
  ]

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">

        <div className="brand">
          <div className="brand-icon">⚡</div>

          <div>
            <h2>AI Scheduler</h2>
            <span>Kubernetes</span>
          </div>
        </div>

        <nav className="nav">

          {menuItems.map(([icon, name]) => (
            <button
              key={name}
              className={`nav-item ${
                activePage === name ? 'active' : ''
              }`}
              onClick={() => setActivePage(name)}
            >
              {icon} {name}
            </button>
          ))}

        </nav>

        <div className="cluster-status">
          <p>CLUSTER STATUS</p>

          <div>
            <span className="status-dot"></span>
            <strong>Cluster Online</strong>
          </div>

          <small>Connected to Kubernetes</small>
        </div>

      </aside>


      {/* MAIN CONTENT */}
      <main className="main-content">

        <header className="topbar">

          <div>
            <p className="eyebrow">
              KUBERNETES CONTROL CENTER
            </p>

            <h1>{activePage}</h1>

            <p className="subtitle">
              Monitor and manage your intelligent Kubernetes scheduling system.
            </p>
          </div>

          <div className="header-right">

            <span className="live-badge">
              <span className="live-dot"></span>
              LIVE
            </span>

            <div className="profile">
              SM
            </div>

          </div>

        </header>


        {/* DASHBOARD */}
        {activePage === 'Dashboard' && (

          <>
            <section className="stats-grid">

              <div className="stat-card">
                <div className="stat-top">
                  <span>Cluster Nodes</span>
                  <span className="stat-icon">⌘</span>
                </div>

                <h2>4</h2>

                <p>
                  <span className="positive">
                    ↑ 2.4%
                  </span>{' '}
                  from last check
                </p>
              </div>


              <div className="stat-card">
                <div className="stat-top">
                  <span>Running Pods</span>
                  <span className="stat-icon">◇</span>
                </div>

                <h2>12</h2>

                <p>
                  <span className="positive">
                    ↑ 8.1%
                  </span>{' '}
                  active workloads
                </p>
              </div>


              <div className="stat-card">
                <div className="stat-top">
                  <span>CPU Usage</span>
                  <span className="stat-icon">◉</span>
                </div>

                <h2>48%</h2>

                <div className="progress">
                  <div className="progress-fill cpu"></div>
                </div>
              </div>


              <div className="stat-card">
                <div className="stat-top">
                  <span>Memory Usage</span>
                  <span className="stat-icon">▥</span>
                </div>

                <h2>62%</h2>

                <div className="progress">
                  <div className="progress-fill memory"></div>
                </div>
              </div>

            </section>


            <section className="content-grid">

              {/* AI RECOMMENDATION */}
              <div className="panel ai-panel">

                <div className="panel-header">

                  <div>
                    <p className="panel-label">
                      INTELLIGENT SCHEDULING
                    </p>

                    <h2>
                      AI Recommendation
                    </h2>
                  </div>

                  <span className="ai-badge">
                    ✦ AI POWERED
                  </span>

                </div>


                <div className="recommendation">

                  <div className="pod-box">
                    <span>Pod</span>
                    <strong>
                      pod-payment-service
                    </strong>
                  </div>

                  <div className="arrow">
                    →
                  </div>

                  <div className="node-box">
                    <span>
                      Recommended Node
                    </span>

                    <strong>
                      node-worker-02
                    </strong>
                  </div>

                </div>


                <div className="score">

                  <div className="score-info">
                    <span>
                      Scheduling Confidence
                    </span>

                    <strong>
                      94%
                    </strong>
                  </div>

                  <div className="score-bar"></div>

                </div>


                <p className="reason">
                  ✓ Best resource availability based on CPU,
                  memory and current workload.
                </p>

              </div>


              {/* NODE HEALTH */}
              <div className="panel">

                <div className="panel-header">

                  <div>
                    <p className="panel-label">
                      CLUSTER
                    </p>

                    <h2>
                      Node Health
                    </h2>
                  </div>

                  <span className="healthy">
                    Healthy
                  </span>

                </div>


                <div className="node-list">

                  {nodes.slice(0, 3).map((node) => (

                    <div
                      className="node-row"
                      key={node.name}
                    >

                      <div className="node-row-left">

                        <span className="node-status node-online"></span>

                        <div>
                          <strong>
                            {node.name}
                          </strong>

                          <small>
                            CPU {node.cpu} · RAM {node.ram}
                          </small>
                        </div>

                      </div>

                      <span className="node-online">
                        {node.status}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </section>


            {/* SCHEDULING TABLE */}
            <section className="panel table-panel">

              <div className="panel-header">

                <div>
                  <p className="panel-label">
                    RECENT ACTIVITY
                  </p>

                  <h2>
                    Scheduling Decisions
                  </h2>
                </div>

                <button
                  className="view-btn"
                  onClick={() => setActivePage('History')}
                >
                  View all →
                </button>

              </div>


              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>
                      <th>Pod</th>
                      <th>Recommended Node</th>
                      <th>Confidence</th>
                      <th>Status</th>
                    </tr>

                  </thead>


                  <tbody>

                    {pods.map((pod) => (

                      <tr key={pod[0]}>

                        <td>
                          <strong>
                            {pod[0]}
                          </strong>
                        </td>

                        <td>
                          {pod[1]}
                        </td>

                        <td>
                          <span className="confidence">
                            {pod[2]}
                          </span>
                        </td>

                        <td>
                          <span className="success">
                            {pod[3]}
                          </span>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </section>
          </>
        )}


        {/* NODES PAGE */}
        {activePage === 'Nodes' && (

          <section className="panel table-panel">

            <div className="panel-header">
              <div>
                <p className="panel-label">
                  KUBERNETES CLUSTER
                </p>

                <h2>
                  Cluster Nodes
                </h2>
              </div>

              <span className="healthy">
                4 Online
              </span>
            </div>


            <div className="table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Node</th>
                    <th>CPU Usage</th>
                    <th>Memory</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>

                  {nodes.map((node) => (

                    <tr key={node.name}>

                      <td>
                        <strong>{node.name}</strong>
                      </td>

                      <td>{node.cpu}</td>

                      <td>{node.ram}</td>

                      <td>
                        <span className="success">
                          ● {node.status}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>
        )}


        {/* PODS PAGE */}
        {activePage === 'Pods' && (

          <section className="panel table-panel">

            <div className="panel-header">

              <div>
                <p className="panel-label">
                  WORKLOADS
                </p>

                <h2>
                  Running Pods
                </h2>
              </div>

              <span className="healthy">
                12 Running
              </span>

            </div>


            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>
                    <th>Pod</th>
                    <th>Node</th>
                    <th>Confidence</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {pods.map((pod) => (

                    <tr key={pod[0]}>

                      <td>
                        <strong>
                          {pod[0]}
                        </strong>
                      </td>

                      <td>
                        {pod[1]}
                      </td>

                      <td>
                        <span className="confidence">
                          {pod[2]}
                        </span>
                      </td>

                      <td>
                        <span className="success">
                          {pod[3]}
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>
        )}


        {/* AI SCHEDULER PAGE */}
        {activePage === 'AI Scheduler' && (

          <section className="panel ai-panel">

            <div className="panel-header">

              <div>
                <p className="panel-label">
                  MACHINE LEARNING
                </p>

                <h2>
                  AI Scheduling Engine
                </h2>
              </div>

              <span className="ai-badge">
                ✦ MODEL ACTIVE
              </span>

            </div>


            <div className="recommendation">

              <div className="pod-box">

                <span>
                  Incoming Pod
                </span>

                <strong>
                  pod-payment-service
                </strong>

              </div>

              <div className="arrow">
                →
              </div>

              <div className="node-box">

                <span>
                  AI Selected Node
                </span>

                <strong>
                  node-worker-02
                </strong>

              </div>

            </div>


            <div className="score">

              <div className="score-info">

                <span>
                  Model Confidence
                </span>

                <strong>
                  94%
                </strong>

              </div>

              <div className="score-bar"></div>

            </div>


            <p className="reason">
              The AI scheduler evaluates node CPU,
              memory availability and workload distribution
              before selecting the optimal node.
            </p>

          </section>
        )}


        {/* HISTORY PAGE */}
        {activePage === 'History' && (

          <section className="panel table-panel">

            <div className="panel-header">

              <div>
                <p className="panel-label">
                  SCHEDULER LOGS
                </p>

                <h2>
                  Scheduling History
                </h2>
              </div>

            </div>


            <div className="table-wrapper">

              <table>

                <thead>

                  <tr>
                    <th>Pod</th>
                    <th>Selected Node</th>
                    <th>Confidence</th>
                    <th>Result</th>
                  </tr>

                </thead>

                <tbody>

                  {pods.map((pod) => (

                    <tr key={pod[0]}>

                      <td>
                        <strong>
                          {pod[0]}
                        </strong>
                      </td>

                      <td>
                        {pod[1]}
                      </td>

                      <td>
                        <span className="confidence">
                          {pod[2]}
                        </span>
                      </td>

                      <td>
                        <span className="success">
                          ✓ Success
                        </span>
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </section>
        )}


        <footer>
          AI Kubernetes Pod Scheduler · Project Dashboard
        </footer>

      </main>

    </div>
  )
}

export default App