import React from "react";
import {
  Card,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import NewsTable from './NewsTable'

import { observer, inject } from "mobx-react";
import { makeStyles } from "@material-ui/styles";
import NewsDialog from './NewsDialog'


const NewsSection = inject("store")(
  observer((props) => {
    const classes = useStyles()

    const sections = [
      {
        title: "현재 지역",
        regionType : props.store.CITY,
      },
      {
        title: "현재 국가",
        regionType : props.store.COUNTRY,
      }
    ]

    return (
        <div className="section section-tabs">
          <Container>
            <Row>

              {sections.map((eachSection, idx) => {
                return (
                  <Col
                    className="ml-auto mr-auto"
                    key={idx}
                    md="10"
                    xl="6">

                    <p
                      className="category"
                      style={categoryStyle}>

                      {eachSection.title}

                      <Tooltip
                        placement="top"
                        title={"눌러서 변경하기"}>
                        <Button
                          className={classes.regionBtnStyle}>
                          {props.store.getRegionName(
                            eachSection.regionType
                          )}
                        </Button>
                      </Tooltip>

                      COVID-19 News
                    </p>

                    <Card>
                      <CardBody style={cardBodyStyle}>
                        <NewsTable 
                          regionType={eachSection.regionType}/>
                      </CardBody>
                    </Card>
                  </Col>
                )
              })}

            </Row>
          </Container>

          <React.Fragment>
            {props.store.isNewsDialogOpen && 
              <NewsDialog/>
            }
          </React.Fragment>
        </div>
    );
  }))

export default NewsSection;


const categoryStyle = {
  display: 'flex',
  alignItems: 'baseline',
  fontWeight: 500,
  marginBottom: 10
}

const cardBodyStyle = {
  minHeight : 500,
}

const useStyles = makeStyles((theme) => ({
  regionBtnStyle: {
    fontSize: '1.1em',
    color: 'royalblue'
  }
}))