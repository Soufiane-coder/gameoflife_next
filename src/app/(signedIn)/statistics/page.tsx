import StatisticLineWProg from '@/components/statistic-line-wprog.component'
import { Row, Col } from 'antd'
import React from 'react'

const Statistics = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12}>
        <StatisticLineWProg/>
      </Col>
      {/* <Col xs={24} sm={12}>
        <StatisticLineWProg/>
      </Col> */}
    </Row>
  )
}

export default Statistics
