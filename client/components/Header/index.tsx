import React from "react";
import { Layout, Avatar, Menu, Popover, Button, Modal } from "antd";
import styles from "./Header.module.scss";
import { CloudOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import * as Api from "@/api";

export const Header: React.FC = () => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  const [isLogoutModalOpen, setIsLogoutModalOpen] = React.useState(false);

  const showLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleLogoutCancel = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    Api.auth.logout();
    location.href = "/";
  };

  const onClickLogout = () => {
    showLogoutModal();
  };

  return (
    <Layout.Header className={styles.root}>
      <div className={styles.headerInner}>
        <div className={styles.headerLeft}>
          <h2>
            <CloudOutlined />
            <span className={styles.cloudStorageText}>Cloud Storage</span>
          </h2>

          <Menu
            className={styles.topMenu}
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedMenu]}
            onSelect={({ key }) => router.push(key)}
            items={[
              { key: "/dashboard", label: "Home" },
              { key: "/dashboard/profile", label: "Profile" },
            ]}
          />
        </div>

        <div className={styles.headerRight}>
          <Popover
            trigger="click"
            content={
              <Button onClick={onClickLogout} type="primary" danger>
                Sign out
              </Button>
            }
          >
            <Avatar size={40} icon={<UserOutlined />} />
          </Popover>
        </div>
      </div>
      <Modal
        title="Sign Out"
        open={isLogoutModalOpen}
        onCancel={handleLogoutCancel}
        onOk={handleLogoutConfirm}
        okText="Sign out"
        cancelText="Cancel"
      >
        <p>Are you sure you want to sign out?</p>
      </Modal>
    </Layout.Header>
  );
};

export default Header;