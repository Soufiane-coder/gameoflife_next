import PieStatistic from '@/components/pie-statistic/pie-statistic-component'
import StatisticLineWProg from '@/components/statistic-line-wprog.component'
import { Row, Col } from 'antd'
import React from 'react'

const Statistics = () => {
  return (
    <div className='mt-20 md:mt-0'>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <StatisticLineWProg/>
        </Col>
        <Col xs={24} sm={12}>
          <PieStatistic/>
        </Col>
        {/* <Col xs={24} sm={12}>
          <StatisticLineWProg/>
        </Col> */}
      </Row>
    </div>
  )
}

export default Statistics
