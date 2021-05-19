import React, { useState } from 'react';
import { Table, Space, Modal } from 'antd';
import { EditTwoTone, DeleteTwoTone, ExclamationCircleOutlined } from '@ant-design/icons';
import Edit from './Edit';
import api from '../api/employees';


const { Column } = Table;
const { confirm } = Modal;

const List = ({employee}) => {
    const [visible, setVisible] = useState(false);
    const [employeeData, setEmployeeData] = useState(); 
    
    const deleteConfirm = (id) => {
        confirm({
            title: 'Are you sure delete this record?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
              console.log('OK');
              deleteRecord(id);
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    };
    
    const deleteRecord = async (id) => {
        
        await api.delete(`/employees/${id}`);
        
    };
    
    return (
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Table dataSource={employee}>
            <Column title="ID" dataIndex="id" key="id" />
            <Column title="User Name" dataIndex="username" key="username" />
            <Column title="Full Name" dataIndex="fullName" key="fullName" />
            <Column title="Salary" dataIndex="salary" key="salary" />
            <Column
              title="Action"
              key="action"
              render={(text, record) => (
                <div>
                    <Space size="middle">
                      <EditTwoTone key="id" onClick={() => { setVisible(true); setEmployeeData(record) }}/>
                      <DeleteTwoTone key="id" onClick={() => deleteConfirm(record.id)} />
                    </Space>
                    
                </div>
              )}
            />
          </Table>
          {
              employeeData && (
                <Edit visible={visible} setVisible={setVisible} employeeData={employeeData}/>
              )
          }
          
        </div>
    )
}

export default List
