import React from "react";
import { setCookie } from "nookies";
import styles from "./Auth.module.scss";
import { Button, Form, Input, notification } from "antd";
import { RegisterFormDTO } from "@/api/dto/auth.dto";

import * as Api from "@/api";

export const RegisterForm: React.FC = () => {
  const onSubmit = async (values: RegisterFormDTO) => {
    try {
      const { token } = await Api.auth.register(values);

      notification.success({
        message: "Successfully!",
        description: "You have successfully registered",
        duration: 2,
      });

      setCookie(null, "_token", token, {
        path: "/",
      });

      location.href = "/dashboard";
    } catch (err) {
      console.warn(err);

      notification.error({
        message: "Error!",
        description: "Error during registration",
        duration: 2,
      });
    }
  };

  return (
    <div className={styles.formBlock}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter an email address",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[
            {
              required: true,
              message: "Please enter a full name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter a password",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};