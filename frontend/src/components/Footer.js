import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.component/Footer.module.css';

const Footer = () => {
  const encodedSvgLogo = "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg enable-background='new 0 0 476.4 568.9' version='1.1' viewBox='0 0 476.4 568.9' xml:space='preserve' xmlns='http://www.w3.org/2000/svg'%3E%3Cstyle type='text/css'%3E .st0%7Bfill-rule:evenodd;clip-rule:evenodd;fill:%23231F20;%7D .st1%7Bfill-rule:evenodd;clip-rule:evenodd;fill:%23FFFFFF;%7D%0A%3C/style%3E%3Cpolygon class='st0' points='476.4 568.6 476 0 0 0.3 0.4 568.9'/%3E%3Cpolygon class='st1' points='454 545.7 453.7 22.2 22.2 22.4 22.5 546'/%3E%3Cpath class='st0' d='m102.2 361.2c14.5-10 30.4-21.4 46.9-30.6 7.8-5.7-2.3-26.6-14.3-32.4-7.6-3.3-9 0.2-17.6 14.4-8.9 15.1-9.8 16.7-18.3 30.8-5.3 7.4-7.4 13.7-5.6 17.9 1.5 2.6 6.3 1.7 8.9-0.1z'/%3E%3Cpath class='st0' d='m48.1 441.2c6.3 0.7 9.3-1.4 11-3.9 2.9-4.2 0-10.5-1.2-15.2-11-18.4-19.3-47.7-19.3-47.7v62.1c1.9 4.2 4.8 4.7 9.5 4.7z'/%3E%3Cpath class='st0' d='m398.4 38.9c13.9 7.3 24.1 20.6 16.3 33.1-3.2 3.3-8.6 5.2-14.3 6.8-34.6 9.1-66.5 6.1-99.6 18-13.8 4.3-23.1 18.9-30.4 33.3-11.6 19.9-10.3 52.5-5.9 67.5 7.6 20.7 26.5 37.3 41.3 53 2.3 2.5 4.5 6.6 3.4 9.9-1.3 4-5.9 5.8-9.2 3.4-10.1-8.9-23.2-10.8-36.2-7.4-10.1 4.3-17 7-25.6 7.3-8.6-0.3-15.5-2.9-25.7-7.2-13.1-3.3-26-1.7-36.2 7.5-3.3 2.4-7.9 0.6-9.2-3.4-1.1-3.3 1.1-7.4 3.4-9.9 14.8-15.7 33.7-32.3 41.2-53 4.4-15 5.6-47.6-6-67.5-7.2-14.4-16.6-29-30.4-33.3-33.1-11.9-65.1-8.8-99.6-17.9-5.7-1.5-11.1-3.4-14.3-6.7-7.9-12.4 2.4-25.8 16.2-33.1h-39.2l0.1 157.1c7.2-1.5 17.6 0.4 21.5 2.4 10.5 4 10.8 5 19.8 3.7 15.1-1.9 16.1-19.5 25.2-24.6s19.2-3 25 0c3.1 2.1 4.7 4.7 3.5 8.5-1.7 4.6-8.9 14.3-20 18-3.6 1.9-7.2 5.5-5.8 11.3 0.4 2.6 4.2 5.1 8.1 5.1 10.9 0.5 18.3-4.6 26.7-11.8 4.1-3.3 9.5-7.6 13.3-10.8 8.1-5.5 16.2-19.6 27.9-13.3 6.2 4.7-8.5 27.2-20.3 38.4-14.2 10.8-25.5 24-23.5 43.1 4.9 14.9 10 16.4 17.4 20.7 10.5 3.9 17.4 5.3 29.3 3.2 10.9-1.1 11.4-9.5 17-13.5 3.9-3.3 8-2.6 13.5-2 9.3 1 9.6 7.9 12.1 10.9 3.9 4.7 6.9 3.6 6.9 3.6s1.6 0 1.6 0l3.5-0.1c-0.1 0 1.9 1.2 5.7-3.5 2.4-3 2.8-9.9 12.1-10.9 5.5-0.6 10-1.3 13.5 2 5.7 4 6.9 12.1 17.1 13.5 11.9 2 18.8 0.6 29.3-3.3 7.4-4.3 12.6-5.8 17.4-20.7 2-19-9.3-32.3-23.5-43.1-11.8-11.1-26.5-33.7-20.4-38.4 11.6-6.4 19.8 7.7 27.9 13.2 3.7 3.4 9.3 7.5 13.4 10.8 8.4 7.2 15.9 12.2 26.7 11.7 3.9-0.1 7.7-2.5 8.1-5.1 1.5-5.8-2.2-9.4-5.8-11.3-11.1-3.6-18.3-13.4-20-17.9-1.2-3.9 0.4-6.4 3.5-8.6 5.8-3 15.9-5.1 25 0s10.2 22.6 25.3 24.6c8.9 1.3 9.3 0.3 19.8-3.7 4-2 14.8-4.1 21.5-2.4l-0.1-157.1-39.3-0.1zm-240.3 117.2c-13.7 16.1-53.5 14.6-56.9 11.4-3.6-1.9-4.6-6.4-3.8-10.9 1.4-5.1 5.8-8.4 10.6-5.5 4.3 5.8 8 7.8 13.4 8.8 16.7 3.4 18.2-31.4 37-9.3-0.1 0 1.5 3.1-0.3 5.5zm218.7 11.2c-3.4 3.3-45 4.7-58.7-11.4-1.7-2.4-0.2-5.5-0.2-5.5 21.9-20.3 20.3 12.7 37 9.3 5.4-1 9.1-3 13.4-8.8 4.8-3 9.2 0.3 10.6 5.5 0.7 4.5 1.5 9.1-2.1 10.9z'/%3E%3Cpath class='st0' d='m374.4 361c-14.5-10-30.5-21.3-47-30.5-7.8-5.6 3.7-26 14.2-32.5 7.7-3.3 10.7 2.1 14.7 9.6 8.9 15.1 12.9 21.4 21.4 35.5 5.2 7.3 7.4 13.7 5.6 17.9-1.9 2.9-6.4 1.8-8.9 0z'/%3E%3Cpath class='st0' d='m344.9 371.3c-16-9.5-29.4-9.1-48.8-21.1-12-6.4-30.9-8.3-41.6-1.9-10.7 4.4-7.2 3.6-16.1 4.3h-0.1-0.1c-8.5-0.8-5.7-0.4-16.8-4.3-10.7-6.3-29-4.4-41 2-18.3 12-33.7 11.4-48.8 21.2-6.6 3.5-4.6 9.8 2.6 14.2 15.7 10.2 25.9 16.5 45.6 23.7 10 3.9 14.9 5.4 24 9 11.7 5.3 20.7 15 21.2 16.3 1.8 5 9.8 4.2 13.8 4.3h1.3s9.6 0.7 11.4-4.3c0.6-1.6 9.5-11 21.2-16.4 9-3.6 13.9-5.1 23.9-9 19.7-7.2 29.9-13.5 45.6-23.7 7.2-4.5 9.3-10.8 2.7-14.3zm-76.1 30.2c-11.9 5-21 8.1-30.5 8.6-9.5-0.5-18.6-3.6-30.5-8.6-11.5-4.2-31.2-17.9-31.1-22.9 0-4.9 18.4-5.1 29.5-5.1 6 0.3 14.7 4.3 18 9.5 3.5 4.1 3.3 8.4 14 9.2h0.1 0.1c10.7-0.9 10.5-5.1 14-9.2 3.3-5.2 12-9.2 18-9.5 11.2 0 29.6 0.2 29.6 5.1-0.1 4.9-19.7 18.7-31.2 22.9z'/%3E%3Cpath class='st0' d='m428.5 441c-6.3 0.7-9.3-1.4-11-3.8-2.9-4.2 0-10.5 1.1-15.2 9.4-15.2 19.2-47.8 19.2-47.8v62.1c-1.6 4.1-4.6 4.7-9.3 4.7z'/%3E%3Cpath class='st0' d='m429.2 474.1c-9.6 10.5-16.7 21.2-36 27.9-10.1 3.3-14.8 1.9-20.9-2.7-4.7-3.4-5.4-7.2-4.4-12 1-3.3 2.8-6.6 4.7-9.5 4-7.1 11.6-15 11.6-18 0.3-6-5.2-9.1-9.3-6.9-13.9 4.7-15.9 15.3-37.4 16.1-4.4-0.3-7 2.2-7.8 5.8-2.5 15.7-18.2 30.6-23.8 34.2-13.9 8.5-43.8 14.6-67.3 14.7h-0.1c-23.5 0-53.4-6-67.3-14.6-5.6-3.6-21.3-18.5-23.9-34.2-0.9-3.6-3.5-6.1-7.8-5.8-21.8-1.4-23.5-11.3-37.5-16-4.1-2.2-9.5 0.9-9.2 6.9 0 3 7.6 10.9 11.6 18 1.9 2.9 3.6 6.3 4.7 9.5 1 4.8 0.3 8.5-4.4 12-6.1 4.7-10.8 6.1-20.9 2.8-18.9-7.3-26.4-17.4-36-27.8-2.7-2.5-3.4-6-8.8-11.3l0.1 66 199.4-0.1h0.1l199.4-0.1v-66c-5.5 5.1-6.1 8.7-8.8 11.1z'/%3E%3C/svg%3E";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <h3>
            OBEY CLOTHING<br />
            VIỆT NAM
          </h3>
          <Link to="/chinh-sach-giao-hang">Chính sách giao hàng</Link>
          <Link to="/chinh-sach-doi-tra">Chính sách đổi trả</Link>
          <Link to="/the-qua-tang">Thẻ quà tặng OBEY</Link>
        </div>
        <div className={styles.footerColumn}>
          <h3>THÔNG TIN CỬA HÀNG</h3>
          <Link to="/stores">Hệ thống cửa hàng</Link>
          <Link to="/lien-he">Liên hệ</Link>
          <Link to="/bao-ve-thuong-hieu">Bảo vệ thương hiệu</Link>
        </div>
        <div className={styles.footerColumn}>
          <h3>HỖ TRỢ KHÁCH HÀNG</h3>
          <Link to="/ho-tro-khach-hang">Trung tâm hỗ trợ</Link>
          <Link to="/dang-ky-nhan-tin">Đăng ký nhận tin mới nhất</Link>
        </div>
        <div className={styles.footerColumn}>
          <div className={styles.socialLinksContainer}>
            <h3>KẾT NỐI VỚI CHÚNG TÔI</h3>
            <div className={styles.socialLinks}>
              <a 
                href="https://www.instagram.com/obeyclothing/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png"
                  alt="Instagram"
                />
              </a>
              <a 
                href="https://facebook.com/obeyclothing.vietnam" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Facebook_Logo_%282019%29.svg/2560px-Facebook_Logo_%282019%29.svg.png"
                  alt="Facebook"
                />
              </a>
              <a 
                href="https://twitter.com/obey_vietnam" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="X"
              >
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png"
                  alt="X"
                />
              </a>
              <a 
                href="https://www.tiktok.com/@obeyclothing" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <img 
                  src="https://sf-tb-sg.ibytedtos.com/obj/eden-sg/uhtyvueh7nulogpoguhm/tiktok-icon2.png"
                  alt="TikTok"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerSeparator}></div>
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          <img src={encodedSvgLogo} alt="OBEY Logo" className={styles.footerLogo} />
          <span>© 2023 OBEY CLOTHING VIỆT NAM</span>
        </div>
        <div className={styles.legalLinks}>
          <Link to="/dieu-khoan-dich-vu">Điều khoản dịch vụ</Link>
          <Link to="/chinh-sach-bao-mat">Chính sách bảo mật</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;