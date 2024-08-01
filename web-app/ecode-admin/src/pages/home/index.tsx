import { Card } from '@arco-design/web-react';

const list = new Array(10).fill(0);
function Home() {
  return (
    <div className='flex flex-wrap gap-3 justify-around'>
      {list.map(() => (
        <Card
          className=' flex-shrink-0 bg-slate-700'
          style={{ width: 360 }}
          title='Arco Card'
          bordered={false}
        >
          Card content
          <br />
          Card content
        </Card>
      ))}
    </div>
  );
}

export default Home;
