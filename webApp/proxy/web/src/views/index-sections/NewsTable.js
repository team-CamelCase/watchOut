import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button'
import TablePaginationAction from './TablePaginationAction'
import CircularProgress from '@material-ui/core/CircularProgress'

import { observer, inject } from "mobx-react";


const NewsTable = inject("store")(
	observer((props) => {
		const classes = useStyles();
		const data = props.store[props.regionDataType]
		const [isLoading, setIsLoading] = useState(false)


		useEffect(() => {
			async function init() {
				try {
					setIsLoading(true)

					await props.store.getNewsData(
						props.regionDataType
					)

					setIsLoading(false)

				} catch (err) {
					alert("뉴스데이터를 가져오는데 오류가 발생했습니다")
				}
			}

			if (data.length == 0){
				init()
			}
		}, [])


		const handleChangePage = (e, newPageNum) => {
			props.store.set(
				"newsTablePageNumber",
				newPageNum
			);
		};

		const handleChangeRowsPerPage = (e) => {

			props.store.set(
				"newsTableRowsPerPage",
				parseInt(e.target.value, 10)
			);

			props.store.set(
				"newsTablePageNumber",
				0
			);
		};

		return (

			<Table
				className={classes.table}
				aria-label="custom pagination table">

				<TableBody>
					{isLoading ?
						<CircularProgress />
						:
						(props.store.newsTableRowsPerPage > 0
							? getSlicedRows(
								data,
								props.store.newsTablePageNumber,
								props.store.newsTableRowsPerPage
							)
							: data
						).map((row) =>
							<TableRow key={row.name}>
								<TableCell
									component="th"
									scope="row"
									style={{ width: 70 }}>
									{row.type}
								</TableCell>
								<TableCell>
									<Button>
										{row.text}
									</Button>
								</TableCell>
								<TableCell
									style={{ width: 160 }}
									align="right">
									{showCreatedTime(
										new Date(row.createdTime)
									)}
								</TableCell>
							</TableRow>
						)}
				</TableBody>

				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={rowsPerPageOptions}
							colSpan={3}
							count={data.length}
							rowsPerPage={props.store.newsTableRowsPerPage}
							page={props.store.newsTablePageNumber}
							SelectProps={{
								inputProps: { 'aria-label': 'wassup' },
								native: true,
							}}
							labelRowsPerPage={"리스트 행 개수"}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationAction}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		)
	}))

export default NewsTable



const showCreatedTime = (date) => {
	return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

const getSlicedRows = (rows, curPageNum, rowsPerPage) => {
	return rows.slice(
		curPageNum * rowsPerPage,
		curPageNum * rowsPerPage + rowsPerPage
	)
}

const rowsPerPageOptions = [5, 10, 25, { label: 'All', value: -1 }]


const useStyles = makeStyles({
	table: {
		minWidth: 500,
		minHeight: 460
	},
});