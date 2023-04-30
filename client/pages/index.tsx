import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Typography, Space, Tag, Select } from "antd";
import styles from "@/styles/Home.module.scss";

const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState("en");

  const handleClick = () => {
    router.push("/dashboard/auth");
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  return (
    <>
      <Head>
        <title>Cloud Storage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Select
          defaultValue="en"
          style={{ width: 120 }}
          onChange={handleLanguageChange}
        >
          <Option value="en">English</Option>
          <Option value="ru">Русский</Option>
        </Select>
        <Typography>
          <Title>Welcome to App</Title>
          <Paragraph>
            This is a demo application for cloud file storage.
          </Paragraph>
          <Paragraph>
            To visually evaluate the application, you need to register or use a
            test email and password
          </Paragraph>
          <Paragraph>Email: test@test.ru</Paragraph>
          <Paragraph>Password: 123456</Paragraph>
          <Space>
            <Text strong>Technologies used:</Text>
            <Tag color="blue">Next.js</Tag>
            <Tag color="gold">TypeScript</Tag>
            <Tag color="purple">NestJS</Tag>
            <Tag color="green">PostgreSQL</Tag>
          </Space>
        </Typography>
        <Button
          style={{ marginTop: "20px" }}
          type="primary"
          onClick={handleClick}
          size="large"
        >
          Go to Cloud
        </Button>
      </main>
    </>
  );
}