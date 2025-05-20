import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, CreditCard, Shield, Edit2, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { mockTickets } from '../data/mockData';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    paymentMethods: [
      { id: '1', type: 'visa', last4: '4242', expiryDate: '09/26' },
      { id: '2', type: 'mastercard', last4: '8888', expiryDate: '12/25' }
    ]
  });
  
  const [editFormData, setEditFormData] = useState({ ...userData });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData(editFormData);
    setIsEditing(false);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  // Count tickets by status
  const ticketCounts = {
    total: mockTickets.length,
    valid: mockTickets.filter(ticket => ticket.status === 'valid').length,
    used: mockTickets.filter(ticket => ticket.status === 'used').length,
    cancelled: mockTickets.filter(ticket => ticket.status === 'cancelled').length,
  };
  
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Profile Card */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <img 
                  src={userData.profileImage} 
                  alt={userData.name} 
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary-500"
                />
                <div className="absolute bottom-0 right-0 bg-primary-500 text-white p-1 rounded-full">
                  <Edit2 size={16} />
                </div>
              </div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">Member since 2023</p>
            </div>
            
            <div>
              <h3 className="font-medium mb-4">Ticket Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary-500">{ticketCounts.total}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Total Tickets</p>
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-success-500">{ticketCounts.valid}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Upcoming</p>
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-neutral-500">{ticketCounts.used}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Past Events</p>
                </div>
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-error-500">{ticketCounts.cancelled}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Cancelled</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* User Details and Settings */}
        <motion.div 
          className="lg:col-span-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Personal Information</h3>
              {!isEditing && (
                <Button 
                  variant="outlined" 
                  size="sm" 
                  icon={<Edit2 size={16} />} 
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              )}
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={16} className="text-neutral-500" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={16} className="text-neutral-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone size={16} className="text-neutral-500" />
                      </div>
                      <input
                        type="text"
                        name="phone"
                        value={editFormData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={16} className="text-neutral-500" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={editFormData.location}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outlined" 
                    type="button" 
                    onClick={() => {
                      setEditFormData({ ...userData });
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    icon={<Check size={16} />}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            ) : (
              <motion.div 
                className="grid grid-cols-1 gap-4"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="flex items-start">
                  <User className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium mb-1">Full Name</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{userData.name}</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <Mail className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{userData.email}</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <Phone className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{userData.phone}</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary-500 mt-1 mr-3" />
                  <div>
                    <h3 className="font-medium mb-1">Location</h3>
                    <p className="text-neutral-600 dark:text-neutral-400">{userData.location}</p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </Card>
          
          <Card className="p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Payment Methods</h3>
              <Button 
                variant="outlined" 
                size="sm" 
                icon={<CreditCard size={16} />}
              >
                Add New
              </Button>
            </div>
            
            <div className="space-y-4">
              {userData.paymentMethods.map(method => (
                <motion.div 
                  key={method.id}
                  variants={itemVariants}
                  className="flex justify-between items-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className={`w-10 h-8 rounded ${method.type === 'visa' ? 'bg-blue-600' : 'bg-red-500'} text-white flex items-center justify-center mr-3`}>
                      <span className="text-xs font-bold">{method.type.toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• {method.last4}</p>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Expires {method.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 transition-colors">
                      <Edit2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center mb-6">
              <Shield className="h-6 w-6 text-primary-500 mr-3" />
              <h3 className="text-xl font-semibold">Security</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <div>
                  <h4 className="font-medium">Password</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Last changed 3 months ago</p>
                </div>
                <Button variant="outlined" size="sm">Change</Button>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-700">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Enhance your account security</p>
                </div>
                <div className="relative inline-block w-12 h-6 rounded-full bg-neutral-300 dark:bg-neutral-700">
                  <input 
                    type="checkbox" 
                    className="sr-only"
                    id="toggle-2fa"
                  />
                  <label 
                    htmlFor="toggle-2fa"
                    className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 transform"
                  ></label>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Permanently delete your account and data</p>
                </div>
                <Button variant="outlined" size="sm" className="text-error-500 border-error-500 hover:bg-error-50 dark:hover:bg-error-950">
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;