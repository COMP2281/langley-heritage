import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Popover,
  Radio,
  Table,
  Select,
  Space,
  ConfigProvider,
} from "antd";
import zhCN from "antd/locale/zh_CN";
import { useEffect, useState } from "react";
// 处理时间的js工具
import moment from "moment";
// 导入APi
import blogApi from "../../api/BlogApi";
const Blog = () => {
  const { TextArea } = Input;
  // 表格参数的控制
  const columns = [
    {
      title: "num",
      dataIndex: "id",
      width: 100,
      render: (_, record, index) => (index + 1).toString(),
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "content",
      dataIndex: "content",
      key: "content",
      width: 400,
    },
    {
      title: "createTime",
      key: "createTime",
      render: (record) => moment(record.createTime).format("YYYY-MM-DD"),
    },
    {
      title: "action",
      key: "action",
      render: (row) => (
        <span>
          <Button
            style={{
              backgroundColor: "orange",
              color: "white",
              marginRight: "5px",
            }}
            onClick={() => handleOpenUpdateModal(row)}
          >
            编辑
          </Button>
          <Popover
            title="您确定要删除该博客吗？"
            content={
              <Button
                onClick={() => handleDeleteBlog(row.id)}
                type="primary"
                danger
              >
                确定
              </Button>
            }
          >
            <Button type="primary" danger>
              删除
            </Button>
          </Popover>
        </span>
      ),
    },
  ];
  // 查询参数
  const [params, setParams] = useState({
    current: 1,
    size: 10,
    type: "",
    title: "",
  });
  // 博客列表数据
  const [blogList, setBlogList] = useState([]);
  // 博客总数
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getBlogList();
  }, [params]); 
  const getBlogList = async () => {
    const { data } = await blogApi.getBlogList(params);
    setTotal(data.data.total);
    setBlogList(data.data.records);
  };
  const handlePaginationChange = (newPageNum, newPageSize) => {
    setParams({
      ...params,
      current: newPageNum,
      size: newPageSize,
    });
  };
  const [isUpdate, setIsUpdate] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenUpdateModal = (row) => {
    //将当前行的数据赋值给表单
    form.setFieldsValue(row);
    setIsUpdate(true);
    setIsModalOpen(true);
  };
  const handleDeleteBlog = async (id) => {
    await blogApi.delBlog(id);
    message.success("删除成功");
    getBlogList();
  };
  const [form] = Form.useForm();
  const handleOpenAddModal = () => {
    form.resetFields(); 
    setIsUpdate(false);
    setIsModalOpen(true);
  };
  const showTotal = (total) => {
    return `共 ${total} 条`;
  };
  const handleAddUpdateBlog = async (blogForm) => {
    const { data } = await blogApi.saveBlog(blogForm);
    if (data.code == 200) {
      form.resetFields();
      setIsModalOpen(false);
      getBlogList();
    } else {
      message.error(data.message);
    }
  };
  return (
    <div>
      <Space style={{ marginBottom: "10px" }}>
        <label>
          {"selectType："}
          <Select
            style={{
              width: 120,
            }}
            placeholder={"selectType"}
            allowClear
            onChange={(value) => setParams({ ...params, type: value })}
            options={[
              {
                value: "vue",
                label: "vue",
              },
              {
                value: "java",
                label: "java",
              },
              {
                value: "uniapp",
                label: "uniapp",
              },
              {
                value: "react",
                label: "react",
              },
              {
                value: "js",
                label: "js",
              },
            ]}
          />
        </label>
        <Input.Search
          value={params.title}
          onChange={(e) => setParams({ ...params, title: e.target.value })}
          style={{ width: "200px" }}
          allowClear
          placeholder="Please enter a title"
          enterButton
        />
        <Button type="primary" onClick={handleOpenAddModal}>
        Add blog
        </Button>
      </Space>
      <ConfigProvider locale={zhCN}>
        <Table
          rowKey={(record) => record.id}
          bordered={true}
          pagination={{
            current: params.current,
            pageSize: params.size,
            total: total,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: showTotal,
            onChange: handlePaginationChange,
          }}
          columns={columns}
          dataSource={blogList}
          scroll={{ y: 540 }}
        />
      </ConfigProvider>
      <Modal
        title={isUpdate ? "edit blog" : "Add blog"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[]}
      >
        <Form
          form={form}
          style={{ maxWidth: 400 }}
          initialValues={{ remember: true }}
          onFinish={handleAddUpdateBlog}
          autoComplete="off"
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "Please enter a title" }]}
          >
            <Input placeholder="Please enter a title" />
          </Form.Item>
          <Form.Item
            label="类别"
            name="type"
            rules={[{ required: true, message: "selectType" }]}
          >
            <Radio.Group>
              <Radio value={"java"}> java </Radio>
              <Radio value={"vue"}> vue </Radio>
              <Radio value={"react"}> react </Radio>
              <Radio value={"uniapp"}> uniapp </Radio>
              <Radio value={"js"}> js </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="content"
            name="content"
            rules={[{ required: true, message: "Please enter the content" }]}
          >
            <TextArea
              placeholder="Please enter the content"
              autoSize={{
                minRows: 4,
                maxRows: 6,
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
              <Button htmlType="submit" onClick={() => setIsModalOpen(false)}>
                取消
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Blog;
