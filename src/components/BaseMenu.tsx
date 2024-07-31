import { Menu } from '@arco-design/web-react';
import { IconHome } from '@arco-design/web-react/icon';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '@/router';

const MenuItem = Menu.Item;

function BaseMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const onClickMenuItem = (key: string) => {
    navigate(key);
  };
  const [selectedKeys, setSelectedKeys] = useState(ROUTES_PATH.HOME as string);
  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location]);
  return (
    <Menu
      onClickMenuItem={onClickMenuItem}
      selectedKeys={[selectedKeys]}
    >
      <MenuItem key={ROUTES_PATH.HOME}>
        <IconHome />
        应用列表
      </MenuItem>
      <MenuItem key='/aaa'>Menu 2</MenuItem>
      <MenuItem key='/bbb'>Menu 3</MenuItem>
      {/* </SubMenu> */}
    </Menu>
  );
}
export default BaseMenu;
