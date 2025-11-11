import { useEffect, useState } from 'react';
import { ArrowLeft, Send, Upload, MessageCircle, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { WhatsAppSupport } from './WhatsAppSupport';

interface ReportPageProps {
  onNavigate: (page: 'home' | 'report' | 'admin') => void;
}

interface Currency {
  code: string;
  name: string;
}

//const API_BASE_URL = 'http://localhost:9000/api';
const API_BASE_URL = 'https://sh-backend-1.onrender.com/api'; 

export default function ReportPage({ onNavigate }: ReportPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    scam_type: 'crypto',
    description: '',
    amount_lost: '',
    currency: 'USD',
    country: '',
  });
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loadingCurrencies, setLoadingCurrencies] = useState<boolean>(true);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch("https://api.frankfurter.app/currencies");
        const data: Record<string, string> = await res.json();

        const currencyList: Currency[] = Object.entries(data).map(
          ([code, name]) => ({
            code,
            name,
          })
        );

        setCurrencies(currencyList);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      } finally {
        setLoadingCurrencies(false);
      }
    };

    fetchCurrencies();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.currency) newErrors.currency = 'Currency is required';
    if (!formData.country.trim()) newErrors.country = 'Country is required';
    if (formData.description.trim().length < 10) {
      newErrors.description = 'Please provide at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch(`${API_BASE_URL}/complaints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit complaint');
      }

      // Reset form on success
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        scam_type: 'crypto',
        description: '',
        amount_lost: '',
        currency: 'USD',
        country: '',
      });
      setFileName('');
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 9000);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <nav className="bg-white/40 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40 shadow-lg shadow-cyan-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('home')}
              className="p-3 hover:bg-white/60 rounded-xl transition-all duration-300 hover:scale-110 group"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700 group-hover:text-cyan-600 transition-colors" />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">File a Complaint</h1>
                <p className="text-sm text-gray-600 font-medium">Help us track down scammers</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-blue-500/10 p-8 sm:p-10 border border-white/60">
          <div className="mb-8 text-center">
            <div className="inline-block p-3 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl shadow-xl shadow-blue-500/30 mb-4">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Report Details
            </h2>
            <p className="text-gray-600 font-medium">Provide as much information as possible to help us investigate</p>
          </div>

          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.name ? 'border-red-400 bg-red-50/50' : 'border-gray-200 bg-white/50'
                    } text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-2 text-sm text-red-600 font-semibold">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.email ? 'border-red-400 bg-red-50/50' : 'border-gray-200 bg-white/50'
                    } text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-2 text-sm text-red-600 font-semibold">{errors.email}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/50 text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label htmlFor="scam_type" className="block text-sm font-bold text-gray-700 mb-2">
                  Type of Scam *
                </label>
                <select
                  id="scam_type"
                  name="scam_type"
                  value={formData.scam_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/50 text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium"
                >
                  <option value="crypto">Cryptocurrency Scam</option>
                  <option value="transaction">Transaction Scam</option>
                  <option value="gift_card">Gift Card Scam</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="amount_lost" className="block text-sm font-bold text-gray-700 mb-2">
                Amount Lost (USD)
              </label>
              <input
                type="number"
                id="amount_lost"
                name="amount_lost"
                value={formData.amount_lost}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/50 text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium"
                placeholder="0.00"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="currency"
                  className="block text-sm font-bold text-gray-700 mb-2"
                >
                  Currency *
                </label>

                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  disabled={loadingCurrencies}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 bg-white/50 text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium"
                >
                  {loadingCurrencies ? (
                    <option>Loading currencies...</option>
                  ) : (
                    currencies.map((cur) => (
                      <option key={cur.code} value={cur.code}>
                        {cur.code} — {cur.name}
                      </option>
                    ))
                  )}
                </select>

                {errors.currency && (
                  <p className="mt-2 text-sm text-red-600 font-semibold">
                    {errors.currency}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-bold text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="e.g., United States"
                  className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.country ? 'border-red-400 bg-red-50/50' : 'border-gray-200 bg-white/50'
                    } text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all backdrop-blur-sm font-medium`}
                />
                {errors.country && <p className="mt-2 text-sm text-red-600 font-semibold">{errors.country}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3.5 rounded-xl border-2 ${errors.description ? 'border-red-400 bg-red-50/50' : 'border-gray-200 bg-white/50'
                  } text-gray-900 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all resize-none backdrop-blur-sm font-medium`}
                placeholder="Please provide as much detail as possible: what happened, when it occurred, any suspicious links or contact information, transaction details, etc."
              />
              {errors.description && <p className="mt-2 text-sm text-red-600 font-semibold">{errors.description}</p>}
            </div>


            <div className=" pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-6 py-4 rounded-2xl font-black text-white text-lg shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Submit Complaint
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="mb-8 bg-gradient-to-r from-green-50 mt-3 to-emerald-50 border-2 border-green-300/50 rounded-2xl p-5 flex items-start gap-4 shadow-lg shadow-green-500/10">
                  <div className="p-2 bg-green-500 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-green-900 mb-1 text-lg">Complaint Submitted Successfully!</h3>
                    <p className="text-green-700 font-medium">Thank you for reporting. We'll review your complaint and take appropriate action.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-8 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300/50 rounded-2xl p-5 flex items-start gap-4 shadow-lg shadow-red-500/10">
                  <div className="p-2 bg-red-500 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-red-900 mb-1 text-lg">Submission Failed</h3>
                    <p className="text-red-700 font-medium">There was an error submitting your complaint. Please try again.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-500 rounded-xl shadow-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-black text-blue-900 mb-3 text-xl">What Happens Next?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-blue-800 font-semibold">Your complaint will be reviewed by our team within 24-48 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-blue-800 font-semibold">We may contact you for additional information if needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-blue-800 font-semibold">Your information will be shared with relevant authorities to help investigate the scam</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <WhatsAppSupport />
    </div>
  );
}