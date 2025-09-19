'use client'
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, TrendingUp, Users, Plus, Edit, Trash2, Search, DollarSign, Calendar, BarChart3, Printer, Download, FileText, AlertCircle, Eye, EyeOff, Lock, User, X } from 'lucide-react';

// Mock data untuk demo
const initialProducts = [
  { id: '1', name: 'Website Development', category: 'Digital Service', price: 5000000, stock: 5 },
  { id: '2', name: 'Mobile App Development', category: 'Digital Service', price: 8000000, stock: 3 },
  { id: '3', name: 'Digital Marketing', category: 'Marketing', price: 2000000, stock: 10 },
  { id: '4', name: 'SEO Optimization', category: 'Marketing', price: 1500000, stock: 8 }
];

const initialSales = [
  { 
    id: '1', 
    productId: '1',
    productName: 'Website Development', 
    customer: 'PT. Teknologi Maju',
    customerEmail: 'info@tekmaju.com',
    customerPhone: '+62 21-1234-5678',
    quantity: 1, 
    total: 5000000, 
    date: '2024-01-15',
    status: 'Completed',
    paymentMethod: 'Bank Transfer'
  },
  { 
    id: '2', 
    productId: '2',
    productName: 'Mobile App Development', 
    customer: 'CV. Digital Solusi',
    customerEmail: 'contact@digitalsolusi.co.id',
    customerPhone: '+62 812-3456-7890',
    quantity: 1, 
    total: 8000000, 
    date: '2024-01-14',
    status: 'Completed',
    paymentMethod: 'Bank Transfer'
  }
];

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Lababil Logo Component
const LababilLogo = ({ size = 24, className = "", variant = "default" }) => {
  const colorClass = variant === "white" ? "text-white" : "text-blue-600";

  return (
    <div className={`flex items-center ${className}`}>
      <svg 
        width={size} 
        height={size * 0.75} 
        viewBox="0 0 400 300" 
        className={colorClass}
      >
        <defs>
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.7" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        
        <path d="M50 50 L50 150 L150 150 L150 130 L70 130 L70 50 Z" fill="url(#blueGrad)" stroke="currentColor" strokeWidth="1"/>
        <path d="M78 55 L78 115 L98 115 L98 55 Z" fill="url(#silverGrad)"/>
        <path d="M78 55 L118 55 Q125 55 125 65 Q125 72 120 75 Q115 77 110 77 L78 77 Z" fill="url(#silverGrad)"/>
        <path d="M78 77 L108 77 L108 83 L78 83 Z" fill="url(#silverGrad)"/>
        <path d="M78 83 L130 83 Q145 83 145 100 Q145 110 140 115 Q135 115 125 115 L78 115 Z" fill="url(#silverGrad)"/>
        <path d="M80 57 L80 113 L85 113 L85 57 Z" fill="currentColor" opacity="0.4"/>
        <path d="M80 57 L115 57 Q120 57 120 62 Q120 65 118 67 L80 67 Z" fill="currentColor" opacity="0.3"/>
        <path d="M80 85 L127 85 Q135 85 135 93 Q135 100 130 103 L80 103 Z" fill="currentColor" opacity="0.3"/>
        <circle cx="115" cy="100" r="8" fill="none" stroke="url(#silverGrad)" strokeWidth="1.5"/>
        <circle cx="115" cy="100" r="5" fill="url(#blueGrad)"/>
        <circle cx="115" cy="100" r="2.5" fill="currentColor"/>
        <circle cx="95" cy="63" r="1.5" fill="currentColor" opacity="0.8"/>
        <circle cx="102" cy="61" r="1.2" fill="currentColor" opacity="0.6"/>
        <circle cx="107" cy="64" r="1.2" fill="currentColor" opacity="0.6"/>
        <circle cx="104" cy="69" r="1.2" fill="currentColor" opacity="0.6"/>
        <line x1="95" y1="63" x2="102" y2="61" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
        <line x1="102" y1="61" x2="107" y2="64" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
        <line x1="107" y1="64" x2="104" y2="69" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
        <line x1="104" y1="69" x2="95" y2="63" stroke="currentColor" strokeWidth="0.8" opacity="0.6"/>
      </svg>
    </div>
  );
};

// Print utilities
const generateReceiptHTML = (sale, companyInfo) => {
  const {
    companyName = 'Lababil Solution',
    address = 'Jakarta, Indonesia',
    phone = '+62 21-1234-5678',
    email = 'info@lababilsolution.com',
    website = 'www.lababilsolution.com'
  } = companyInfo;

  const formatTime = () => new Date().toLocaleTimeString('id-ID');
  const totalWithTax = sale.total * 1.11;
  const tax = sale.total * 0.11;

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Receipt - ${sale.id}</title>
        <style>
            @page { size: A4; margin: 20mm; }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Arial', sans-serif; font-size: 14px; line-height: 1.5; color: #333; }
            .receipt-container { max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #e5e7eb; }
            .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #3b82f6; }
            .company-name { font-size: 28px; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
            .receipt-title { font-size: 24px; font-weight: bold; margin: 20px 0 10px 0; }
            .total-section { margin-top: 30px; padding: 20px; background-color: #f0f9ff; border: 2px solid #3b82f6; }
            .total-final { font-size: 20px; font-weight: bold; color: #1e40af; padding-top: 10px; border-top: 2px solid #3b82f6; margin-top: 15px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
            th { background-color: #3b82f6; color: white; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
        </style>
    </head>
    <body>
        <div class="receipt-container">
            <div class="header">
                <div class="company-name">${companyName}</div>
                <div>${address}</div>
                <div>Telp: ${phone} | Email: ${email}</div>
                <div>Website: ${website}</div>
                <div class="receipt-title">INVOICE</div>
                <div>No. Receipt: #${sale.id}</div>
            </div>
            
            <div style="margin-bottom: 30px;">
                <div><strong>Customer:</strong> ${sale.customer}</div>
                <div><strong>Email:</strong> ${sale.customerEmail || '-'}</div>
                <div><strong>Phone:</strong> ${sale.customerPhone || '-'}</div>
                <div><strong>Date:</strong> ${formatDate(sale.date)}</div>
                <div><strong>Print Time:</strong> ${formatTime()}</div>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Description</th>
                        <th class="text-center">Qty</th>
                        <th class="text-right">Unit Price</th>
                        <th class="text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">1</td>
                        <td><strong>${sale.productName}</strong></td>
                        <td class="text-center">${sale.quantity}</td>
                        <td class="text-right">${formatCurrency(sale.total / sale.quantity)}</td>
                        <td class="text-right"><strong>${formatCurrency(sale.total)}</strong></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="total-section">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Subtotal:</span>
                    <span>${formatCurrency(sale.total)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>Tax (11%):</span>
                    <span>${formatCurrency(tax)}</span>
                </div>
                <div class="total-final" style="display: flex; justify-content: space-between;">
                    <span>TOTAL:</span>
                    <span>${formatCurrency(totalWithTax)}</span>
                </div>
            </div>
            
            <div style="text-align: center; margin-top: 40px;">
                <p><strong>Thank You for Your Business!</strong></p>
                <p>For questions about this service, please contact us.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

const printReceipt = (sale, companyInfo) => {
  const receiptHTML = generateReceiptHTML(sale, companyInfo);
  const printWindow = window.open('', '_blank');
  
  if (printWindow) {
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        printWindow.onafterprint = () => printWindow.close();
      }, 500);
    };
  } else {
    alert('Pop-up blocked! Please enable pop-ups for print functionality.');
  }
};

const downloadReceiptPDF = (sale, companyInfo) => {
  const receiptHTML = generateReceiptHTML(sale, companyInfo);
  const blob = new Blob([receiptHTML], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `receipt-${sale.id}-${sale.date}.html`;
  link.click();
  URL.revokeObjectURL(url);
};

// Receipt Modal Component
const ReceiptModal = ({ isOpen, onClose, sale, companyInfo }) => {
  if (!isOpen || !sale) return null;

  const handlePrint = () => printReceipt(sale, companyInfo);
  const handleDownload = () => downloadReceiptPDF(sale, companyInfo);
  const totalWithTax = sale.total * 1.11;
  const tax = sale.total * 0.11;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Preview Receipt</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-8 pb-6 border-b-2 border-blue-600">
            <div className="w-20 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <LababilLogo size={40} variant="white" />
            </div>
            <h1 className="text-2xl font-bold text-blue-600 mb-2">{companyInfo.companyName}</h1>
            <p className="text-sm text-gray-600">{companyInfo.address}</p>
            <p className="text-sm text-gray-600">Telp: {companyInfo.phone} | Email: {companyInfo.email}</p>
            <p className="text-sm text-gray-600">Website: {companyInfo.website}</p>
            <h2 className="text-xl font-bold mt-4 text-gray-900">RECEIPT / KWITANSI</h2>
            <p className="text-sm text-gray-600">No. Receipt: #{sale.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Customer Info:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex"><span className="w-20 font-medium text-gray-600">Name:</span><span className="text-gray-900">{sale.customer}</span></div>
                <div className="flex"><span className="w-20 font-medium text-gray-600">Email:</span><span className="text-gray-900">{sale.customerEmail || '-'}</span></div>
                <div className="flex"><span className="w-20 font-medium text-gray-600">Phone:</span><span className="text-gray-900">{sale.customerPhone || '-'}</span></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 text-gray-900">Transaction Info:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex"><span className="w-20 font-medium text-gray-600">Date:</span><span className="text-gray-900">{formatDate(sale.date)}</span></div>
                <div className="flex"><span className="w-20 font-medium text-gray-600">Status:</span><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{sale.status || 'Completed'}</span></div>
                <div className="flex"><span className="w-20 font-medium text-gray-600">Payment:</span><span className="text-gray-900">{sale.paymentMethod || 'Bank Transfer'}</span></div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Unit Price</th>
                  <th className="px-4 py-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-3 text-center">1</td>
                  <td className="px-4 py-3"><div className="font-medium text-gray-900">{sale.productName}</div></td>
                  <td className="px-4 py-3 text-center">{sale.quantity}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(sale.total / sale.quantity)}</td>
                  <td className="px-4 py-3 text-right font-semibold">{formatCurrency(sale.total)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
            <div className="space-y-2">
              <div className="flex justify-between text-sm"><span>Subtotal:</span><span>{formatCurrency(sale.total)}</span></div>
              <div className="flex justify-between text-sm"><span>Tax (11%):</span><span>{formatCurrency(tax)}</span></div>
              <div className="border-t-2 border-blue-600 pt-2 mt-3">
                <div className="flex justify-between text-lg font-bold text-blue-900"><span>TOTAL:</span><span>{formatCurrency(totalWithTax)}</span></div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-semibold text-blue-600 mb-2">Thank You for Your Trust!</p>
            <p className="text-sm text-gray-600">For further questions about this service, please contact us.<br />All services are protected by warranty according to applicable terms.</p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button onClick={onClose} className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Close</button>
          <button onClick={handleDownload} className="px-4 py-2 text-green-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 flex items-center"><Download className="h-4 w-4 mr-2" />Download HTML</button>
          <button onClick={handlePrint} className="px-4 py-2 text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 flex items-center"><Printer className="h-4 w-4 mr-2" />Print Receipt</button>
        </div>
      </div>
    </div>
  );
};

// Authentication Components
const LoginPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }
    setLoading(true);
    setError('');
    
    // Demo credentials
    const users = {
      admin: { username: 'admin', password: 'F@ruq2021', role: 'admin', name: 'Administrator' },
      kasir: { username: 'kasir', password: 'kasir123', role: 'kasir', name: 'Cashier' }
    };
    
    const user = Object.values(users).find(u => u.username === formData.username);
    
    if (!user || user.password !== formData.password) {
      setError('Invalid username or password');
      setLoading(false);
      return;
    }
    
    setTimeout(() => {
      onLogin({ username: user.username, role: user.role, name: user.name });
      setLoading(false);
    }, 1000);
  };

  const demoCredentials = [
    { label: 'Admin', username: 'admin', password: 'F@ruq2021', role: 'Full Access' },
    { label: 'Cashier', username: 'kasir', password: 'kasir123', role: 'Sales Only' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl">
                <LababilLogo size={40} variant="white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Lababil Solution</h1>
            <p className="text-blue-100 text-sm">Digital Sales System</p>
          </div>

          <div className="px-8 py-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p className="text-gray-600">Please enter your credentials</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Demo Credentials</h3>
          <div className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{cred.label}</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{cred.role}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-500">Username:</span><p className="font-mono font-medium">{cred.username}</p></div>
                  <div><span className="text-gray-500">Password:</span><p className="font-mono font-medium">{cred.password}</p></div>
                </div>
                <button
                  onClick={() => setFormData({ username: cred.username, password: cred.password })}
                  className="mt-2 text-blue-600 text-sm hover:text-blue-800 font-medium"
                >
                  Use these credentials →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2024 Lababil Solution. All rights reserved.</p>
          <p className="mt-1">Digital Sales System v2.0</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function LababilSalesApp() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState(initialProducts);
  const [sales, setSales] = useState(initialSales);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  const companyInfo = {
    companyName: 'Lababil Solution',
    address: 'Jakarta, Indonesia',
    phone: '+62 21-1234-5678',
    email: 'info@lababilsolution.com',
    website: 'www.lababilsolution.com'
  };

  // Authentication
  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Dashboard calculations
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalProducts = products.length;
  const totalSales = sales.length;
  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  // Handle form submission
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (modalType === 'product') {
        if (editingItem) {
          const updatedProduct = {
            ...editingItem,
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
          };
          setProducts(products.map(p => p.id === editingItem.id ? updatedProduct : p));
        } else {
          const newProduct = {
            id: Date.now().toString(),
            name: formData.name,
            category: formData.category,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock)
          };
          setProducts([...products, newProduct]);
        }
      } else if (modalType === 'sale') {
        const product = products.find(p => p.id === formData.productId);
        if (!product) {
          throw new Error('Product not found');
        }
        
        const newSale = {
          id: Date.now().toString(),
          productId: product.id,
          productName: product.name,
          quantity: parseInt(formData.quantity),
          total: product.price * parseInt(formData.quantity),
          date: new Date().toISOString().split('T')[0],
          customer: formData.customer,
          customerEmail: formData.customerEmail || '',
          customerPhone: formData.customerPhone || '',
          status: 'Completed',
          paymentMethod: 'Bank Transfer'
        };
        
        setSales([newSale, ...sales]);
        
        const updatedProduct = {
          ...product,
          stock: product.stock - parseInt(formData.quantity)
        };
        setProducts(products.map(p => p.id === product.id ? updatedProduct : p));
      }
      
      setShowModal(false);
      setFormData({});
      setEditingItem(null);
      
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to save data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      if (type === 'product') {
        setProducts(products.filter(p => p.id !== id));
      } else if (type === 'sale') {
        setSales(sales.filter(s => s.id !== id));
      }
      
    } catch (err) {
      console.error('Error deleting item:', err);
      setError('Failed to delete item: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle print receipt
  const handlePrintReceipt = (sale) => {
    setSelectedSale(sale);
    setShowReceiptModal(true);
  };

  // Handle quick print
  const handleQuickPrint = (sale) => {
    printReceipt(sale, companyInfo);
  };

  // Handle download receipt
  const handleDownloadReceipt = (sale) => {
    downloadReceiptPDF(sale, companyInfo);
  };

  // Open modal
  const openModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item || {});
    setShowModal(true);
  };

  // Filtered data
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSales = sales.filter(sale =>
    sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4 mt-4">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">✕</button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-2 rounded-lg mr-3 flex items-center justify-center">
                <LababilLogo size={24} variant="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Lababil Solution</h1>
                <p className="text-xs text-gray-500 -mt-1">Digital Sales System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>}
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Welcome, {user.name}</div>
                <div className="text-xs text-gray-500">{user.role}</div>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'sales', label: 'Sales', icon: TrendingUp }
          ].map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TabIcon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-green-500 text-white p-3 rounded-lg">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white p-3 rounded-lg">
                    <Package className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Products</p>
                    <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-purple-500 text-white p-3 rounded-lg">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Sales</p>
                    <p className="text-2xl font-bold text-gray-900">{totalSales}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="bg-orange-500 text-white p-3 rounded-lg">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageOrderValue)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sales */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium text-gray-900">Recent Sales</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {sales.slice(0, 5).map(sale => (
                    <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{sale.productName}</p>
                        <p className="text-sm text-gray-600">{sale.customer}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatCurrency(sale.total)}</p>
                          <p className="text-sm text-gray-600">{sale.date}</p>
                        </div>
                        <button
                          onClick={() => handlePrintReceipt(sale)}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50"
                          title="Print Receipt"
                        >
                          <Printer className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => openModal('product')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openModal('product', product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete('product', product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Sales Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search sales..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={() => openModal('sale')}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Sale
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSales.map(sale => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sale.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(sale.total)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sale.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handlePrintReceipt(sale)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                            title="Print Receipt"
                          >
                            <Printer className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDownloadReceipt(sale)}
                            className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                            title="Download Receipt"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete('sale', sale.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                            title="Delete Sale"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {modalType === 'product' 
                ? (editingItem ? 'Edit Product' : 'Add Product')
                : 'Add Sale'
              }
            </h3>
            
            <div className="space-y-4">
              {modalType === 'product' ? (
                <>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={formData.price || ''}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={formData.stock || ''}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </>
              ) : (
                <>
                  <select
                    value={formData.productId || ''}
                    onChange={(e) => setFormData({...formData, productId: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.name} - {formatCurrency(product.price)}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={formData.customer || ''}
                    onChange={(e) => setFormData({...formData, customer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Customer Email (Optional)"
                    value={formData.customerEmail || ''}
                    onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    placeholder="Customer Phone (Optional)"
                    value={formData.customerPhone || ''}
                    onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    min="1"
                    value={formData.quantity || ''}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </>
              )}
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  {editingItem ? 'Update' : 'Save'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setFormData({});
                    setEditingItem(null);
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        sale={selectedSale}
        companyInfo={companyInfo}
      />
    </div>
  );
}