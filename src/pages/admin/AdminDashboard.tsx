import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Database } from '../../lib/database.types';
import { generateWhatsAppOrderLink } from '../../lib/whatsappHandoff';
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageCircle,
  Package,
  RefreshCw,
  Search,
  Truck
} from 'lucide-react';
import { Currency } from '../../types';

type Order = Database['public']['Tables']['orders']['Row'];

interface AdminDashboardProps {
  currency: Currency;
  setCurrency?: (c: Currency) => void;
  onShowToast: (msg: string) => void;
  onNavigatePage: (page: any) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onShowToast }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      onShowToast(`Failed to load orders: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await (supabase
        .from('orders') as any)
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;
      
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      onShowToast(`Order status updated to ${newStatus}`);
    } catch (err: any) {
      console.error('Error updating status:', err);
      onShowToast(`Failed to update status: ${err.message}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_verification': return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
      case 'in_progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'delivered': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      case 'completed': return 'text-green-400 bg-green-400/10 border-green-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending_verification': return <Clock className="w-4 h-4" />;
      case 'in_progress': return <RefreshCw className="w-4 h-4" />;
      case 'delivered': return <Truck className="w-4 h-4" />;
      case 'completed': return <CheckCircle2 className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(o => 
    o.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.guest_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.guest_email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050507] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Active Orders Center</h1>
            <p className="text-[#CFCFCF]">Manage client orders and update project statuses.</p>
          </div>
          
          <button 
            onClick={fetchOrders}
            className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1F] border border-[#2A2B35] rounded-lg text-white hover:border-[#E5C158] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="bg-[#0F0F12] border border-[#2A2B35] rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text"
                placeholder="Search by Order ID, Name, or Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1A1F] border border-[#2A2B35] rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#E5C158]"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2A2B35]">
                  <th className="py-4 px-4 text-sm font-medium text-gray-400">Order Details</th>
                  <th className="py-4 px-4 text-sm font-medium text-gray-400">Client</th>
                  <th className="py-4 px-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="py-4 px-4 text-sm font-medium text-gray-400">WhatsApp Handoff</th>
                  <th className="py-4 px-4 text-sm font-medium text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2B35]">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">Loading orders...</td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-400">No orders found.</td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-[#1A1A1F]/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-medium text-white">{order.order_number}</div>
                        <div className="text-sm text-gray-400">{order.service_type}</div>
                        <div className="text-xs text-gray-500 mt-1">Deadline: {order.delivery_tier}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-white">{order.guest_name}</div>
                        <div className="text-sm text-gray-400">{order.guest_email}</div>
                        <div className="text-xs text-gray-500">{order.guest_phone}</div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status || '')}`}>
                          {getStatusIcon(order.status || '')}
                          {(order.status || 'unknown').replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <a 
                          href={generateWhatsAppOrderLink({
                            orderId: order.order_number,
                            clientName: order.guest_name || 'Client',
                            serviceName: order.service_type || 'Service',
                            deadline: order.delivery_tier || 'Standard',
                            quantity: (order.scope_details as any)?.quantity || '1',
                            totalPrice: `${order.currency} ${order.total_amount}`,
                            projectBrief: order.notes || 'No notes'
                          })}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#28C76F]/10 text-[#28C76F] border border-[#28C76F]/30 rounded-lg hover:bg-[#28C76F]/20 transition-colors text-xs font-medium"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Chat
                        </a>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <select
                          value={order.status || 'pending_verification'}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className="bg-[#1A1A1F] border border-[#2A2B35] text-white text-sm rounded-lg focus:ring-[#E5C158] focus:border-[#E5C158] p-2"
                        >
                          <option value="pending_verification">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="delivered">Delivered</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
