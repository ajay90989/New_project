import React from 'react'

const Dashboard = () => {
    return (
        <div className="d-flex" style={{ height: '100vh' }}>
            {/* Sidebar */}
            <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
                <h4 className="mb-4 text-center border-bottom pb-2">My Dashboard</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">🏠 Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">📊 Reports</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-white" href="#">⚙️ Settings</a>
                    </li>
                    <li className="nav-item mt-auto">
                        <a className="nav-link text-danger" href="#">🚪 Logout</a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 bg-light">
                {/* Top Navbar */}
                <nav className="navbar navbar-light bg-white px-4 shadow-sm">
                    <span className="navbar-brand mb-0 h1">Welcome Back!</span>
                    <span className="text-muted">👤 User</span>
                </nav>

                {/* Content */}
                <div className="container-fluid mt-4">
                    <div className="row g-4">
                        {/* Card 1 */}
                        <div className="col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Total Users</h5>
                                    <p className="card-text display-6">1,024</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Revenue</h5>
                                    <p className="card-text display-6">₹12,500</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-md-4">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">Active Sessions</h5>
                                    <p className="card-text display-6">98</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-header bg-white">
                                    <h5 className="mb-0">Recent Activity</h5>
                                </div>
                                <div className="card-body">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>User</th>
                                                <th>Activity</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Ajay</td>
                                                <td>Logged in</td>
                                                <td>01 July 2025</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Priya</td>
                                                <td>Updated profile</td>
                                                <td>01 July 2025</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>Ravi</td>
                                                <td>Uploaded file</td>
                                                <td>30 June 2025</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard
