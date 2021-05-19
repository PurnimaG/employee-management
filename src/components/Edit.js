import React, { useState, useEffect } from 'react';
import { Modal, Form,
    Input,
    Button
    } from 'antd';
import api from '../api/employees';

const Edit = ({ visible, setVisible, employeeData }) => {
    
    const [state, setState] = useState(employeeData);
    
    const [user, setUser] = useState({
        username: state.username,
        fullName: state.fullName,
        salary: state.salary,
        id: state.id
    });
    
    const { username, fullName, salary} = user;
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
      
    const onInputChange = (e) => {
        console.log(e.target.value);
        setUser({...user, [e.target.name]: e.target.value});
    };
  
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("Hello Submit");
        await api.put(`/employees/${employeeData.id}`, user);
        // console.log(responce, "responce");
        setVisible(false); 
    };
    
    return (
        <Modal
            title="Edit Employee Information"
            centered
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            width={1000}
            id="id"
            footer={[
                <Button key="back" onClick="">
                  Return
                </Button>,
                <Button key="submit" type="primary"  onClick={e => onSubmit(e)}>
                  Submit
                </Button>
              ]}
          >
           <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                initialValues={{ size: componentSize }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                onSubmit={e => onSubmit(e)}
              >
                <Form.Item label="User Name">
                    <Input 
                        placeholder="User Name"
                        name="username"
                        value={ username }
                        onChange={e => onInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="Full Name">
                    <Input 
                        placeholder="Full Name"
                        name="fullName"
                        value={ fullName }
                        onChange={e => onInputChange(e)}
                    />
                </Form.Item>
                <Form.Item label="Salary">
                    <Input 
                        placeholder="Salary" 
                        name="salary"
                        value={ salary }
                        onChange={e => onInputChange(e)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Edit;