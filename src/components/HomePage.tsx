import { Shield, AlertTriangle, FileText, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import Alert from '../images/alert.png'
import { WhatsAppSupport } from './WhatsAppSupport';

interface HomePageProps {
  onNavigate: (page: 'home' | 'report' | 'admin') => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const scamTypes = [
    {
      icon: AlertTriangle,
      title: 'Cryptocurrency Scams',
      description: 'Fraudulent investment schemes, fake exchanges, phishing attacks, and pump-and-dump schemes targeting crypto users.',
      examples: ['Fake ICOs', 'Ponzi schemes', 'Wallet phishing', 'Fake mining operations']
    },
    {
      icon: FileText,
      title: 'Transaction Scams',
      description: 'Unauthorized charges, fake payment requests, account takeovers, and fraudulent wire transfers.',
      examples: ['Payment fraud', 'Identity theft', 'Fake invoices', 'Account compromise']
    },
    {
      icon: MessageSquare,
      title: 'Gift Card Scams',
      description: 'Criminals demanding payment via gift cards for fake taxes, bills, or prizes.',
      examples: ['IRS impersonation', 'Tech support scams', 'Romance scams', 'Prize scams']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <nav className="bg-white/40 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40 shadow-lg shadow-cyan-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/30 transform hover:rotate-12 transition-transform duration-300">
                <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                FundRecover
              </h1>
            </div>

            {/* Report Button */}
            <button
              onClick={() => onNavigate('report')}
              className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-5 sm:px-7 py-2 sm:py-3 rounded-full font-bold text-white shadow-md shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 text-sm sm:text-base"
            >
              Report
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-cyan-100 to-blue-100 rounded-full border border-cyan-300/50 shadow-lg shadow-cyan-500/10">
            <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">🛡️ Advanced Fraud Protection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Fight Back Against
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Digital Scammers
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium px-4">
            Report fraudulent activities, protect your community, and help authorities track down criminals.
            <span className="block mt-2 text-cyan-600 font-semibold">Your complaint can prevent others from becoming victims.</span>
          </p>
        </div>

        {/* Featured large card */}
        <div className="mb-6 sm:mb-8">
          <div className="group relative bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-500/30 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImRvdHMiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkb3RzKSIvPjwvc3ZnPg==')] opacity-40"></div>
            <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 md:flex md:items-center md:justify-between gap-8 lg:gap-12">
              <div className="md:w-2/3">
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full mb-4 sm:mb-6">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  <span className="text-white font-bold text-xs sm:text-sm">Most Reported Scam Type</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4">
                  {scamTypes[0].title}
                </h3>
                <p className="text-white/95 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed font-medium">
                  {scamTypes[0].description}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {scamTypes[0].examples.map((example, i) => (
                    <span key={i} className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full text-white text-xs sm:text-sm font-semibold border border-white/30">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex mt-6 sm:mt-8 md:mt-0 md:w-1/3 justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-xl sm:blur-2xl"></div>
                  {/* <div className="relative bg-white/30 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-full border-4 border-white/40 group-hover:scale-110 transition-transform duration-500">
                    <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white" />
                  </div> */}
                  <img src={Alert} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two smaller cards side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {scamTypes.slice(1).map((scam, index) => (
            <div
              key={index}
              className="group relative bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 overflow-hidden border border-white/60"
            >
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10 p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                    <scam.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div className="bg-cyan-100 px-2 sm:px-3 py-1 rounded-full">
                    <span className="text-xs font-black text-cyan-700">High Alert</span>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 sm:mb-4">
                  {scam.title}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed font-medium">
                  {scam.description}
                </p>
                <div className="space-y-2 sm:space-y-3">
                  {scam.examples.map((example, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-cyan-50 to-blue-50 px-3 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl border border-cyan-200/50">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex-shrink-0"></div>
                      <span className="text-xs sm:text-sm text-gray-700 font-semibold">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600"></div>
            </div>
          ))}
        </div>

        {/* Protection Tips Section */}
        <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-500/10 p-6 sm:p-8 lg:p-10 xl:p-14 mb-12 sm:mb-16 lg:mb-20 border border-white/60">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent text-center">
            How to Protect Yourself
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="flex gap-3 sm:gap-4 lg:gap-5 group">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-sm sm:text-lg shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  1
                </div>
              </div>
              <div>
                <h4 className="font-black text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Verify Before You Trust</h4>
                <p className="text-gray-700 text-sm sm:text-base font-medium">Always verify the identity of people or organizations requesting money or personal information.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 lg:gap-5 group">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-sm sm:text-lg shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  2
                </div>
              </div>
              <div>
                <h4 className="font-black text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Never Rush Decisions</h4>
                <p className="text-gray-700 text-sm sm:text-base font-medium">Scammers create urgency. Take time to research and consult trusted sources before acting.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 lg:gap-5 group">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-sm sm:text-lg shadow-lg shadow-indigo-500/30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  3
                </div>
              </div>
              <div>
                <h4 className="font-black text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Protect Your Information</h4>
                <p className="text-gray-700 text-sm sm:text-base font-medium">Never share passwords, PINs, or sensitive data via email, phone, or text message.</p>
              </div>
            </div>
            <div className="flex gap-3 sm:gap-4 lg:gap-5 group">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-black text-sm sm:text-lg shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  4
                </div>
              </div>
              <div>
                <h4 className="font-black text-gray-900 mb-1 sm:mb-2 text-base sm:text-lg">Report Suspicious Activity</h4>
                <p className="text-gray-700 text-sm sm:text-base font-medium">If something feels wrong, report it immediately. Your action can help prevent future crimes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Metrics Section */}
        <div className="bg-gradient-to-br from-white/60 to-cyan-50/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-500/10 p-6 sm:p-8 lg:p-10 xl:p-12 mb-8 sm:mb-12 lg:mb-16 border border-white/60">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
              Our Impact
            </h3>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg font-medium max-w-2xl mx-auto">
              Working together with law enforcement and financial institutions to protect communities
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16">
            <div className="group bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-1 sm:mb-2">
                $42M+
              </div>
              <div className="text-white/90 text-xs sm:text-sm lg:text-base font-bold">
                Funds Recovered
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-1 sm:mb-2">
                50K+
              </div>
              <div className="text-white/90 text-xs sm:text-sm lg:text-base font-bold">
                Reports Filed
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-1 sm:mb-2">
                1,200+
              </div>
              <div className="text-white/90 text-xs sm:text-sm lg:text-base font-bold">
                Arrests Made
              </div>
            </div>
            
            <div className="group bg-gradient-to-br from-purple-400 via-pink-500 to-rose-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-1 sm:mb-2">
                98%
              </div>
              <div className="text-white/90 text-xs sm:text-sm lg:text-base font-bold">
                User Satisfaction
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div>
            <h4 className="text-lg sm:text-xl lg:text-2xl font-black text-center mb-6 sm:mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Trusted Partners
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🏛️</div>
                <div className="text-xs sm:text-sm font-black text-gray-900 text-center">FBI</div>
                <div className="text-xs text-gray-600 font-semibold text-center mt-1">Federal Bureau</div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🏦</div>
                <div className="text-xs sm:text-sm font-black text-gray-900 text-center">FinCEN</div>
                <div className="text-xs text-gray-600 font-semibold text-center mt-1">Financial Crimes</div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">👮</div>
                <div className="text-xs sm:text-sm font-black text-gray-900 text-center">INTERPOL</div>
                <div className="text-xs text-gray-600 font-semibold text-center mt-1">Global Police</div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">💳</div>
                <div className="text-xs sm:text-sm font-black text-gray-900 text-center">Visa</div>
                <div className="text-xs text-gray-600 font-semibold text-center mt-1">Payment Network</div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🏢</div>
                <div className="text-xs sm:text-sm font-black text-gray-900 text-center">Mastercard</div>
                <div className="text-xs text-gray-600 font-semibold text-center mt-1">Security Center</div>
              </div>
              
              <div className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-200/50">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🌐</div>
                <div className="text-xs sm:text-sm font-black text-gray-900 text-center">PayPal</div>
                <div className="text-xs text-gray-600 font-semibold text-center mt-1">Fraud Prevention</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden mb-3 sm:mb-3 lg:mb-3">
          {/* Split background design */}
          <div className="absolute inset-0 flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-gradient-to-br from-white/80 to-cyan-50/80 backdrop-blur-xl"></div>
            <div className="w-full md:w-1/2 bg-gradient-to-bl from-cyan-500 via-blue-500 to-indigo-600"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl">
            {/* Left side - Light background */}
            <div className="p-6 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/30 bg-white/80 backdrop-blur-xl">
              <div className="mb-4 sm:mb-6">
                <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-500/30 mb-4 sm:mb-6">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
                Ready to Take Action?
              </h3>
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg font-medium leading-relaxed mb-4 sm:mb-6 lg:mb-8">
                Your report helps protect thousands of people from falling victim to the same scam. Every complaint makes a difference.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                <div className="flex items-center gap-1 sm:gap-2 bg-cyan-100 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-bold text-cyan-700">Anonymous Option</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-blue-100 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-bold text-blue-700">5 Min Process</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 bg-indigo-100 px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-bold text-indigo-700">Secure & Private</span>
                </div>
              </div>
            </div>

            {/* Right side - Dark gradient background */}
            <div className="p-6 sm:p-8 lg:p-10 xl:p-14 flex flex-col justify-center items-center text-center bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 text-white">
              <div className="mb-6 sm:mb-8">
                <div className="text-white text-4xl sm:text-5xl lg:text-6xl font-black mb-3 sm:mb-4">24/7</div>
                <p className="text-white text-lg sm:text-xl font-bold">Report Submission</p>
                <p className="text-white/90 text-sm font-medium mt-1 sm:mt-2">Available anytime, anywhere</p>
              </div>

              <button
                onClick={() => onNavigate('report')}
                className="group relative bg-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden w-full max-w-xs"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 to-blue-50 group-hover:scale-110 transition-transform duration-300"></div>
                <span className="relative z-10 bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                  File Your Complaint
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <p className="text-white/80 text-sm font-medium mt-4 sm:mt-6">
                Join 50,000+ reporters fighting fraud
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white/40 backdrop-blur-xl border-t border-white/50 mt-12 sm:mt-16 lg:mt-20 text-center py-6 sm:py-8">
        <p className="font-bold text-base sm:text-lg bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
          © 2025 FundRecover
        </p>
        <p className="text-xs sm:text-sm text-gray-700 font-medium mt-1">
          Protecting communities from fraud.
        </p>
      </footer>
      <WhatsAppSupport />
    </div>
  );
}