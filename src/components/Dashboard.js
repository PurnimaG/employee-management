import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout, Menu } from "antd";
import {
    UnorderedListOutlined
  } from "@ant-design/icons";
import api from '../api/employees';
import List from './List';

const { Header, Content, Footer, Sider } = Layout;


const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [employee, setEmployee] = useState('');

    const onCollapse = (collapsed) => {
        setCollapsed(!collapsed);
    };
    
    const getEmployee = async () => {
       const response = await api.get("/employees");
       return response.data;
    };
    
    const getAllEmployees = async () =>{
      const allEmployee = await getEmployee();
      if(allEmployee) setEmployee(allEmployee);
    }
    
    useEffect(() => {
      getAllEmployees();
    });
   
    
    return (
      <div>
        
      <Layout style={{ minHeight: "100vh" }}>
        <Sider onCollapse={onCollapse} collapsed={collapsed}>
          <div className="logo" />
          <Router>
              <Route path="/">
                  <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                          List
                    </Menu.Item>
                  </Menu>
              </Route>
          </Router>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          </Header>
          <Content style={{ margin: "16px 16px" }}>
              <List employee={employee}/>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Created by Purnima
          </Footer>
        </Layout>
      </Layout>
    </div>
    );
};


export default Dashboard;