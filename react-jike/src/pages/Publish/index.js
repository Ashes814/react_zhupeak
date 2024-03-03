import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./index.scss";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useState, useEffect } from "react";
import {
  createArticleAPI,
  getArticleById,
  updateArticleAPI,
} from "@/apis/article";

import { useChannel } from "@/hooks/useChannel";

import { message } from "antd";

const { Option } = Select;

const Publish = () => {
  const [imageList, setImageList] = useState([]);
  const [coverType, setCoverType] = useState(0);
  const navigate = useNavigate();

  const { channelList } = useChannel();

  const onFinish = (formValues) => {
    // console.log(formValues);

    if (coverType !== imageList.length) {
      return message.warning("Wrong number of Cover");
    }

    const { title, content, channel_id } = formValues;
    const reqData = {
      title,
      content,
      channel_id,
      cover: {
        type: coverType,
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
    };

    if (articleId) {
      updateArticleAPI({ ...reqData, id: articleId });
      navigate("/article");
    } else {
      createArticleAPI(reqData);
      navigate("/article");
    }
  };

  const onChange = (value) => {
    setImageList(value.fileList);
  };

  const onTypeChange = (e) => {
    const currentCover = e.target.value;
    setCoverType(currentCover);
  };

  const [searchParams] = useSearchParams();
  const [form] = Form.useForm();
  const articleId = searchParams.get("id");
  console.log("articleId", articleId);
  useEffect(() => {
    async function getArticleDetail() {
      const res = await getArticleById(articleId);
      const data = res.data;
      const { cover } = data;
      form.setFieldsValue({
        ...data,
        type: cover.type,
      });
      setCoverType(cover.type);
      // display the cover
      setImageList(
        cover.images.map((url) => {
          return { url };
        })
      );
    }
    if (articleId) {
      getArticleDetail();
    }
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${articleId ? "编辑文章" : "发布文章"}` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: coverType }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((channel) => {
                return (
                  <Option key={channel.id} value={channel.id}>
                    {channel.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {coverType > 0 && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                name="image"
                maxCount={coverType}
                onChange={onChange}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="Input Something"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
