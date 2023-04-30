import React from "react";
import styles from "@/styles/Home.module.scss";
import { useRouter } from "next/router";
import { UploadButton } from "@/components/UploadButton";
import { Menu, Typography } from "antd";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: `/dashboard`,
              icon: <FileOutlined />,
              label: `Files`,
              onClick: () => router.push("/dashboard"),
            },
            {
              key: `/dashboard/photos`,
              icon: <FileImageOutlined />,
              label: `Photos`,
              onClick: () => router.push("/dashboard/photos"),
            },
            {
              key: `/dashboard/trash`,
              icon: <DeleteOutlined />,
              label: `Trash`,
              onClick: () => router.push("/dashboard/trash"),
            },
          ]}
        />
      </div>

      <div className="container">
        <Text keyboard>The max allowed size for a single file is 1024*1024 (5MB)</Text> 
        {children}
      </div>
    </main>
  );
};
