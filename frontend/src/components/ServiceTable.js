import React, { useEffect, useState } from 'react'
import { List, Tabs  } from 'antd'
import '../assets/style.css'
import { Table, Popover  } from 'antd';
import { EllipsisOutlined, CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import { get } from '../api/BaseRequest'
import { SKIP, LIMIT, CURRENCY } from '../api/Constant';
import Chart from './Chart';

const { TabPane } = Tabs;

const ServiceTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState(['rank', 'name','price', 'marketCap', 'volume', 'priceChange1w', 'priceChange7d', 'priceGraph', 'priceChange24h', 'priceChange1h']);
  const [data, setData] = useState([])
  const [params, setParams] = useState({
    skip: SKIP,
    limit: 10,
    currency: CURRENCY
  })

  const getData = async() => {
    const res = await get('coins', params)
    setData(res.coins)
  }

  useEffect(() => {
    getData()
  }, [params])

  useEffect(() => {
    const timer = setInterval(() => {
      getData()
    }, 60000);
    return () => clearTimeout(timer);
  }, [])

  const columnsPopover = [
    {
      title: "Title",
      dataIndex: "title",
      width: '85%',
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>{record.title}</span>)
    }
  ];

  const items = [
    {
      key: 'rank',
      title: "#" 
    },
    {
      key: 'name',
      title: "Name" 
    },
    {
      key: 'priceChange1h',
      title: "1h Change" 
    },
    {
      key: 'priceChange24h',
      title: "Change (24h)" 
    },
    {
      key: 'priceChange7d',
      title: "7d Change" 
    },
    {
      key: 'price',
      title: "Price" 
    },
    {
      key: 'priceBtc',
      title: "Price in BTC" 
    },
    {
      key: 'marketCap',
      title: "Market Cap" 
    },
    {
      key: 'volume',
      title: "Volumn 24h" 
    },
    {
      key: 'priceGraph',
      title: "Price Graph (7d)" 
    }
  ]

  const onSelectChange = (newselectedRowKeys) => {
    setSelectedRowKeys(newselectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns = [
    {
      title: '#',
      sorter: (a, b) => a.rank - b.rank,
      width: '20px',
      hidden: selectedRowKeys.includes('rank') ? false : true,
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>{record.rank}</span>)
    },
    {
      title: <span style={{ textAlign: 'left !important' }}>Name</span>,
      className: 'table-name',
      width: '250px',
      hidden: selectedRowKeys.includes('name') ? false : true,
      sorter: (a, b) => a.name - b.name,
      render: (_, record) => (<div>
        <div className='table-icon-coin'>
          <img src={record.icon} alt='avatar-coin'/>
        </div>
        <div className='table-name-content'>
          <div className='table-name-text'>{record.name}</div>
          <div className='table-name-symbol'>{record.symbol}</div>
        </div>
      </div>)
    },
    {
      title: '1h Change',
      width: '120px',
      hidden: selectedRowKeys.includes('priceChange1h') ? false : true,
      render: (_, record) => (
        <div 
          style={{ 
            padding: '5px', 
            borderRadius: '5px', 
            backgroundColor: record.priceChange1h >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,53,53,0.1)', 
            color: record.priceChange1h >= 0 ? '#34b349' : '#ff4d4d',
            fontWeight: 'bold',
            width: 'fit-content',
            marginLeft: 'auto'
          }}
        >
          {record.priceChange1h >= 0 ? <CaretUpOutlined/> : <CaretDownOutlined/>}
          {record.priceChange1h >= 0 ? record.priceChange1h : record.priceChange1h.toString().slice(1)} %
        </div>
      ),
      sorter: (a, b) => a.priceChange1h - b.priceChange1h
    },
    {
      title: 'Change (24h)',
      sorter: (a, b) => a.priceChange1d - b.priceChange1d,
      width: '120px',
      hidden: selectedRowKeys.includes('priceChange24h') ? false : true,
      render: (_, record) => (
        <div 
          style={{ 
            padding: '5px', 
            borderRadius: '5px', 
            backgroundColor: record.priceChange1d >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,53,53,0.1)', 
            color: record.priceChange1d >= 0 ? '#34b349' : '#ff4d4d',
            fontWeight: 'bold',
            width: 'fit-content',
            marginLeft: 'auto'
          }}
        >
          {record.priceChange1d >= 0 ? <CaretUpOutlined/> : <CaretDownOutlined/>}
          {record.priceChange1d >= 0 ? record.priceChange1d : record.priceChange1d.toString().slice(1)} %
        </div>
      ),
    },
    {
      title: '7d Change',
      sorter: (a, b) => a.priceChange1w - b.priceChange1w,
      width: '120px',
      hidden: selectedRowKeys.includes('priceChange7d') ? false : true,
      render: (_, record) => (
        <div 
          style={{ 
            padding: '5px', 
            borderRadius: '5px', 
            backgroundColor: record.priceChange1w >= 0 ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255,53,53,0.1)', 
            color: record.priceChange1w >= 0 ? '#34b349' : '#ff4d4d',
            fontWeight: 'bold',
            width: 'fit-content', 
            marginLeft: 'auto'
          }}
        >
          {record.priceChange1w >= 0 ? <CaretUpOutlined/> : <CaretDownOutlined/>}
          {record.priceChange1w >= 0 ? record.priceChange1w : record.priceChange1w.toString().slice(1)} %
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      width: '150px',
      sorter: (a, b) => a.price - b.price,
      hidden: selectedRowKeys.includes('price') ? false : true,
      render: (_, record) => (<span style={{ color: '#fff', fontWeight: '500' }}>
        $ {record.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
      </span>)
    },
    {
      title: 'Price in BTC',
      sorter: (a, b) => a.priceBtc - b.priceBtc,
      hidden: selectedRowKeys.includes('priceBtc') ? false : true,
      width: '120px',
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>
        {record.priceBtc.toFixed(8).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
      </span>)
    },
    {
      title: 'Market Cap',
      sorter: (a, b) => a.marketCap - b.marketCap,
      width: '120px',
      hidden: selectedRowKeys.includes('marketCap') ? false : true,
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>
        $ {(record.marketCap / 1000000000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} B
      </span>)
    },
    {
      title: 'Volumn 24h',
      sorter: (a, b) => a.volume - b.volume,
      width: '120px',
      hidden: selectedRowKeys.includes('volume') ? false : true,
      render: (_, record) => (<span style={{ color: '#A8ADB3' }}>
        $ {(record.volume / 1000000000).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} B
      </span>)
    },
    {
      title: 'Price Graph (7d)',
      dataIndex: 'priceGraph',
      width: '120px',
      className: 'table-graph',
      hidden: selectedRowKeys.includes('priceGraph') ? false : true,
      sorter: (a, b) => a.priceGraph - b.priceGraph,
      render: (_, record) => (<Chart record={record && record}/>)
    },
    {
      title: <Popover 
        placement="bottomRight" 
        content={(<Table 
          showHeader={false}
          scroll={{
            y: 260
          }}
          style={{ maxWidth: '290px' }}
          className='tableabc'
          rowSelection={rowSelection}
          pagination={false}
          columns={columnsPopover}
          dataSource={items}
        ></Table> )} 
        trigger="click"
      >
        +
      </Popover>
      ,
      className: 'table-plus',
      width: '20px',
      dataIndex: 'key',
      render: (_, record) => (<EllipsisOutlined className='table-row-item-icon' style={{ color: '#fff', fontSize: '20px' }}/>)
    },
  ].filter(item => !item.hidden);

  const handleChangePage = (page, pageSize) => {
    setParams({
      ...params,
      skip: ((page - 1 ) * pageSize)   
    })
  }

  return (
    // <Tabs defaultActiveKey="1" onChange={onChange} style={{ padding: '40px' }}>
    
    <Tabs defaultActiveKey="1" style={{ padding: '40px 0' }}>
      <TabPane tab="Cryptocurrencies" key="1">
        <Table 
          columns={columns} 
          dataSource={data && data} 
          scroll={{
            x: 'max-content'
          }}
          showSorterTooltip={false}
          pagination={{
            position: ['bottomCenter'],
            total: 1000,
            defaultCurrent: 1,
            defaultPageSize: 10,
            showSizeChanger: false,
            onChange: handleChangePage
          }}
        />
      </TabPane>
      <TabPane tab="Exchanges" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Favorites" key="3">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="DeFi" key="4">
        Content of Tab Pane 3
      </TabPane>
      <TabPane tab="Heatmap" key="5">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  )
}

export default ServiceTable