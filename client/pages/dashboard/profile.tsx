import { GetServerSidePropsContext, NextPage } from "next";
import { User } from "@/api/dto/auth.dto";
import { Button, Modal, Avatar, Carousel } from "antd";
import { UserOutlined } from "@ant-design/icons";

import styles from "@/styles/Profile.module.scss";
import { checkAuth } from "@/utils/checkAuth";
import * as Api from "@/api";
import React from "react";
import { Layout } from "@/layouts/Layout";

interface Props {
  userData: User;
}

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const DashboardProfilePage: NextPage<Props> = ({ userData }) => {
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

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <main className={styles.container}>
      <div className={styles.root}>
        <div style={{ maxWidth: 450, minWidth: 300 }}>
          <div className={styles.avatarWrapper}>
            <Avatar size={100} icon={<UserOutlined />} />
            <h1>{userData.fullName}</h1>
          </div>
          <div className={styles.userInfo}>
            <p>ID: {userData.id}</p>
            <p>Email: {userData.email}</p>
          </div>
          <Button onClick={onClickLogout} type="primary" danger>
            Sign out
          </Button>
        </div>

        <div style={{ maxWidth: 450}}>
          <Carousel afterChange={onChange}>
            <div>
              <h3 style={contentStyle}>Here could be your advertisement</h3>
            </div>
            <div>
              <h3 style={contentStyle}>Another one of your advertisements</h3>
            </div>
          </Carousel>
        </div>

        <Modal
          title="Sign Out"
          open={isLogoutModalOpen}
          onCancel={handleLogoutCancel}
          onOk={handleLogoutConfirm}
          okText="Sign Out"
          cancelText="Cancel"
        >
          <p>Are you sure you want to sign out?</p>
        </Modal>
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Profile">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  const userData = await Api.auth.getMe();

  return {
    props: {
      userData,
    },
  };
};

export default DashboardProfilePage;
