import React, { useEffect } from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  // Button,
  UncontrolledTooltip
} from "reactstrap";

import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

import { observer, inject } from "mobx-react";


const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});


TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(type, text, createdTime) {
  return { type, text, createdTime };
}

const rows = [
  createData('정보', '연남동 거주자 확진 동선 : 다모토리 -> ', Date.now()),
  createData('정보', '51번째 확진자 동선 : 부탄츄 -> ', Date.now() + 10),
  createData('안내', '코로나 예방 수칙 안내 : 마스크를 꼭..', Date.now() + 100),
  createData('정보', '52번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 200),
  createData('정보', '53번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 300),
  createData('정보', '54번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 400),
  createData('정보', '55번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 500),
  createData('정보', '56번째 거주자 확진 동선 : 다모토리 -> ', Date.now() + 600),
].sort((a, b) => (a.createdTime < b.createdTime ? -1 : 1));

const Tabs = inject("store")(
  observer((props) => {
    const classes = useStyles2();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const [iconPills, setIconPills] = React.useState("1");
    const [pills, setPills] = React.useState("1");

    return (
      <>
        <div className="section section-tabs">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="10" xl="6">
                <p
                  className="category"
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    fontWeight: 500,
                    marginBottom: 10
                  }}>

                  현재 지역

                  <React.Fragment>
                    <Tooltip 
                      placement="top"
                      title={"눌러서 변경하기"} >
                      <Button
                        style={{
                          fontSize: '1.1em',
                          color: 'royalblue'
                        }}
                      >
                        {props.store.userCity}
                      </Button>
                    </Tooltip>

                  </React.Fragment>

                  <div>
                    COVID-19 News
                  </div>
                </p>
                <Card>
                  <CardHeader>
                  </CardHeader>
                  <CardBody>
                    <Table className={classes.table} aria-label="custom pagination table">
                      <TableBody>
                        {(rowsPerPage > 0
                          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : rows
                        ).map((row) => {
                          const createdDate = new Date(row.createdTime)

                          return (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row" style={{ width: 70 }}>
                                {row.type}
                              </TableCell>
                              <TableCell>
                                <Button>
                                  {row.text}
                                </Button>
                              </TableCell>
                              <TableCell style={{ width: 160 }} align="right">
                                {createdDate.toLocaleDateString() + " " + createdDate.toLocaleTimeString()}
                              </TableCell>
                            </TableRow>
                          )
                        })}

                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: { 'aria-label': 'wassup' },
                              native: true,
                            }}
                            labelRowsPerPage={"리스트 행 개수"}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              <Col className="ml-auto mr-auto" md="10" xl="6">
                <p
                  className="category"
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    fontWeight: 500,
                    marginBottom: 10
                  }}>

                  현재 국가

                  <React.Fragment>
                    <Tooltip 
                      placement="top"
                      title={"눌러서 변경하기"} >
                      <Button
                        style={{
                          fontSize: '1.1em',
                          color: 'royalblue'
                        }}
                      >
                      {props.store.userCountry}
                      </Button>
                    </Tooltip>

                  </React.Fragment>

                  <div>
                    COVID-19 News
                  </div>
                </p>
                <Card>
                  <CardBody>
                  <Table className={classes.table} aria-label="custom pagination table">
                      <TableBody>
                        {(rowsPerPage > 0
                          ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          : rows
                        ).map((row) => {
                          const createdDate = new Date(row.createdTime)

                          return (
                            <TableRow key={row.name}>
                              <TableCell component="th" scope="row" style={{ width: 70 }}>
                                {row.type}
                              </TableCell>
                              <TableCell>
                                <Button>
                                  {row.text}
                                </Button>
                              </TableCell>
                              <TableCell style={{ width: 160 }} align="right">
                                {createdDate.toLocaleDateString() + " " + createdDate.toLocaleTimeString()}
                              </TableCell>
                            </TableRow>
                          )
                        })}

                      </TableBody>
                      <TableFooter>
                        <TableRow>
                          <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                              inputProps: { 'aria-label': 'wassup' },
                              native: true,
                            }}
                            labelRowsPerPage={"리스트 행 개수"}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                          />
                        </TableRow>
                      </TableFooter>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }))

export default Tabs;
