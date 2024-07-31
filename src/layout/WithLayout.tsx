import { FC, ReactNode } from 'react';
import { Layout, Select } from '@arco-design/web-react';
import BaseMenu from '@/components/BaseMenu';

const Sider = Layout.Sider;
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

interface Props {
  children?: ReactNode;
}
const WithLayout: FC<Props> = props => {
  return (
    <Layout className='h-screen'>
      <Sider
        breakpoint='lg'
        width={220}
      >
        <div className='logo'>logo</div>

        <Select
          className='mt-6'
          onChange={value => {
            console.log(value);
          }}
        >
          <Select.Option value={1}>空间1</Select.Option>
          <Select.Option value={2}>空间2</Select.Option>
          <Select.Option value={3}>空间3</Select.Option>
        </Select>
        <BaseMenu />
      </Sider>
      <Layout>
        <Header className='flex justify-end'>zhaoyiyi</Header>
        <Layout>
          <Content>{props.children}</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default WithLayout;
