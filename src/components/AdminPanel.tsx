import { useState, useEffect } from 'react';
import {
  Shield, LogOut, Search, Filter, Eye, X, CheckCircle,
  RefreshCw, Download, BarChart3, Users, AlertTriangle,
  TrendingUp, Calendar, MoreVertical, FileText, Mail,
  Phone, Globe, CreditCard, Clock,
  Link
} from 'lucide-react';

interface Complaint {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  country?: string;
  currency?: string;
  scam_type: string;
  description: string;
  amount_lost?: number;
  status: string;
  admin_notes?: string;
  createdAt: string;
}

interface AdminPanelProps {
  onLogout: () => void;
}

//const API_BASE_URL = 'http://localhost:9000/api';
const API_BASE_URL = 'https://sh-backend-nine.vercel.app/api'; 


export default function AdminPanel({ onLogout }: AdminPanelProps) {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [complaints, searchTerm, statusFilter]);

  const fetchComplaints = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/complaints`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to fetch complaints');
      const data = await response.json();
      setComplaints(data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterComplaints = () => {
    let filtered = complaints;
    if (statusFilter !== 'all') filtered = filtered.filter(c => c.status === statusFilter);
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredComplaints(filtered);
  };

  const handleViewDetails = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setAdminNotes(complaint.admin_notes || '');
    setNewStatus(complaint.status);
    setIsModalOpen(true);
  };

  const handleUpdateComplaint = async () => {
    if (!selectedComplaint) return;
    setUpdateLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/complaints/${selectedComplaint._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, admin_notes: adminNotes }),
      });
      if (!response.ok) throw new Error('Failed to update complaint');
      const updatedComplaint = await response.json();
      setComplaints(prev => prev.map(c => (c._id === updatedComplaint._id ? updatedComplaint : c)));
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error updating complaint:', err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      in_review: 'bg-blue-100 text-blue-700 border-blue-300',
      resolved: 'bg-green-100 text-green-700 border-green-300',
      closed: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getScamTypeLabel = (type: string) => {
    const labels = {
      crypto: 'Cryptocurrency',
      transaction: 'Transaction',
      gift_card: 'Gift Card',
      other: 'Other',
    };
    return labels[type as keyof typeof labels] || type;
  };

  // Enhanced Stats with Trends
  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    in_review: complaints.filter(c => c.status === 'in_review').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    totalAmount: complaints.reduce((sum, c) => sum + (c.amount_lost || 0), 0),
    avgAmount: complaints.length > 0 ? complaints.reduce((sum, c) => sum + (c.amount_lost || 0), 0) / complaints.length : 0,
  };

  // Recent Activity Data
  const recentActivity = complaints
    .slice(0, 5)
    .map(complaint => ({
      id: complaint._id,
      name: complaint.name,
      action: 'submitted complaint',
      time: new Date(complaint.createdAt).toLocaleTimeString(),
      type: complaint.scam_type,
    }));

  // Scam Type Distribution
  const scamTypeDistribution = complaints.reduce((acc, complaint) => {
    acc[complaint.scam_type] = (acc[complaint.scam_type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-5 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-xl border-b border-white/50 sticky top-0 z-50 shadow-lg shadow-blue-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                  FundRecover Admin
                </h1>
                <p className="text-xs text-gray-600 font-medium">Fraud Management System</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={fetchComplaints}
                disabled={isLoading}
                className="p-2 hover:bg-white/60 rounded-xl transition-all duration-300 hover:scale-110 group"
              >
                <RefreshCw className={`w-5 h-5 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <div className="flex items-center gap-2 bg-white/60 px-3 py-2 rounded-xl border border-gray-200">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-bold text-gray-700">{stats.total} Reports</span>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-bold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 border-t border-gray-200/50">
            {['overview'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-1 py-4 text-sm font-bold border-b-2 transition-all duration-300 ${activeTab === tab
                    ? 'border-cyan-500 text-cyan-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-blue-500/10 p-6 border border-white/60 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <FileText className="w-6 h-6 text-cyan-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-600 text-sm font-bold mb-2">Total Complaints</p>
            <p className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">+12% from last week</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-yellow-500/10 p-6 border border-white/60 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-gray-600 text-sm font-bold mb-2">Pending Review</p>
            <p className="text-3xl font-black text-yellow-600">{stats.pending}</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">Requires attention</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-green-500/10 p-6 border border-white/60 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-gray-600 text-sm font-bold mb-2">Resolved Cases</p>
            <p className="text-3xl font-black text-green-600">{stats.resolved}</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">+8% success rate</p>
          </div>

          <div className="group bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-500/10 p-6 border border-white/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-gray-600 text-sm font-bold mb-2">Total Amount Lost</p>
            <p className="text-3xl font-black text-purple-600">${(stats.totalAmount / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">Across all reports</p>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-blue-500/10 p-6 border border-white/60 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-cyan-50 px-3 py-2 rounded-lg border border-cyan-200">
                <Calendar className="w-4 h-4 text-cyan-600" />
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-transparent text-sm font-bold text-cyan-700 outline-none"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
              </div>

              <div className="text-sm font-medium text-gray-600">
                Showing <span className="font-bold text-gray-900">{filteredComplaints.length}</span> of <span className="font-bold text-gray-900">{complaints.length}</span> complaints
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-105">
                <Download className="w-4 h-4" />
                Export
              </button> */}

              <a href="/report">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                  <BarChart3 className="w-4 h-4" />
                  Generate Report
                </button>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Complaints Table */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 p-6 border border-white/60">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-medium"
                  />
                </div>
                <div className="flex gap-3">
                  <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-12 pr-8 py-3.5 rounded-xl border-2 border-gray-200 bg-white/80 text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all appearance-none min-w-[160px] font-medium"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in_review">In Review</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>

              {filteredComplaints.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-block p-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 mb-4">
                    <Search className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-600 font-bold text-lg">No complaints found</p>
                  <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="px-4 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">Complainant</th>
                        <th className="px-4 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredComplaints.map((complaint) => (
                        <tr key={complaint._id} className="hover:bg-white/40 transition-colors group">
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">{complaint.name}</p>
                              <p className="text-sm text-gray-600 font-medium flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {complaint.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-gray-700 font-semibold">
                              {getScamTypeLabel(complaint.scam_type)}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`px-3 py-1.5 rounded-full text-xs font-black border-2 ${getStatusBadge(complaint.status)}`}>
                              {complaint.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm font-bold text-gray-900">
                              {complaint.amount_lost ? `${complaint.currency} ${complaint.amount_lost.toLocaleString()}` : 'N/A'}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-700 font-medium">
                            {new Date(complaint.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewDetails(complaint)}
                                className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all hover:scale-105"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                                <MoreVertical className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar with Analytics */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-blue-500/10 p-6 border border-white/60">
              <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50/80 rounded-xl transition-colors">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{activity.name}</p>
                      <p className="text-xs text-gray-600">{activity.action}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                      {getScamTypeLabel(activity.type)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scam Type Distribution */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-blue-500/10 p-6 border border-white/60">
              <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-600" />
                Scam Distribution
              </h3>
              <div className="space-y-3">
                {Object.entries(scamTypeDistribution).map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{getScamTypeLabel(type)}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
                          style={{ width: `${(count / complaints.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-900 w-8 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 p-6 text-white">
              <h3 className="text-lg font-black mb-4">Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Response Time</span>
                  <span className="text-sm font-bold">2.4h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Resolution Rate</span>
                  <span className="text-sm font-bold">78%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg. Amount</span>
                  <span className="text-sm font-bold">${stats.avgAmount.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-white/60">
            <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b-2 border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">Complaint Details</h2>
                <p className="text-sm text-gray-600 font-medium">ID: {selectedComplaint._id}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-xl transition-all hover:scale-110"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50/80 p-4 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-black text-gray-600">Name</label>
                  </div>
                  <p className="text-gray-900 font-semibold">{selectedComplaint.name}</p>
                </div>

                <div className="bg-gray-50/80 p-4 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-black text-gray-600">Email</label>
                  </div>
                  <p className="text-gray-900 font-semibold">{selectedComplaint.email}</p>
                </div>

                <div className="bg-gray-50/80 p-4 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-black text-gray-600">Phone</label>
                  </div>
                  <p className="text-gray-900 font-semibold">{selectedComplaint.phone || 'N/A'}</p>
                </div>

                <div className="bg-gray-50/80 p-4 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-black text-gray-600">Country</label>
                  </div>
                  <p className="text-gray-900 font-semibold">{selectedComplaint.country || 'N/A'}</p>
                </div>

                <div className="bg-gray-50/80 p-4 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-black text-gray-600">Amount Lost</label>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {selectedComplaint.amount_lost ? `${selectedComplaint.currency} ${selectedComplaint.amount_lost.toLocaleString()}` : 'Not specified'}
                  </p>
                </div>

                <div className="bg-gray-50/80 p-4 rounded-xl border-2 border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <label className="text-sm font-black text-gray-600">Submitted</label>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {new Date(selectedComplaint.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-black text-gray-600 mb-2 block">Description</label>
                <div className="bg-gray-50/80 p-4 rounded-xl border-2 border-gray-200">
                  <p className="text-gray-900 whitespace-pre-wrap font-medium leading-relaxed">
                    {selectedComplaint.description}
                  </p>
                </div>
              </div>

              {/* Update Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-black text-gray-700 mb-2">
                    Update Status
                  </label>
                  <select
                    id="status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_review">In Review</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-black text-gray-700 mb-2">
                    Admin Notes
                  </label>
                  <textarea
                    id="notes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none font-medium"
                    placeholder="Add internal notes about this complaint..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleUpdateComplaint}
                  disabled={updateLoading}
                  className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-6 py-4 rounded-2xl font-black text-white shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {updateLoading ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <CheckCircle className="w-5 h-5" />
                  )}
                  {updateLoading ? 'Updating...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-4 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-2xl font-black transition-all hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}