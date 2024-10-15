import React, { useState, useEffect } from 'react';
import { getAdminOrders, updateAdminOrderStatus } from '../services/api';
import { FaSearch, FaSort } from 'react-icons/fa';
import styles from './style.component/OrderManagement.module.css';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAdminOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.');
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateAdminOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng. Vui lòng thử lại.');
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key !== null) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  const filteredOrders = sortedOrders.filter(order =>
    order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (order.user && order.user.username && order.user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (order.user && order.user.email && order.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div className={styles.loading}>Đang tải...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.orderManagement}>
      <h2>Quản lý đơn hàng</h2>
      <div className={styles.searchBar}>
        <FaSearch />
        <input
          type="text"
          placeholder="Tìm kiếm theo ID, tên người dùng hoặc email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th onClick={() => handleSort('_id')}>ID <FaSort /></th>
            <th onClick={() => handleSort('user.username')}>Người đặt <FaSort /></th>
            <th onClick={() => handleSort('totalAmount')}>Tổng tiền <FaSort /></th>
            <th onClick={() => handleSort('status')}>Trạng thái <FaSort /></th>
            <th>PayPal ID</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user ? order.user.username || order.user.email : 'Không có thông tin'}</td>
              <td>{order.totalAmount?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) || 'N/A'}</td>
              <td>
                <span className={`${styles.status} ${styles[order.status]}`}>
                  {order.status || 'N/A'}
                </span>
              </td>
              <td>{order.paypalOrderId || 'N/A'}</td>
              <td>
                <select
                  value={order.status || ''}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className={styles.statusSelect}
                >
                  <option value="pending">Đang xử lý</option>
                  <option value="processing">Đang chuẩn bị</option>
                  <option value="shipped">Đã gửi</option>
                  <option value="delivered">Đã giao</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
                <Link to={`/admin/orders/${order._id}`} className={styles.viewDetailsButton}>
                  Xem chi tiết
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? styles.active : ''}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement;
