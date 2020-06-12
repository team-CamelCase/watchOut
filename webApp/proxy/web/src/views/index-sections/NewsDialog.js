import React, { useRef, useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const NewsDialog = inject("store")(
	observer((props) => {

		const classes = useStyles()

		const regionNewsList = props.store[props.store.curDialogNewsDataType]

		const data = regionNewsList.find(eachNews => {
				return eachNews._id == props.store.curDialogNewsId
			})

		return (
			<Dialog
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={true}
				onClose={props.store.closeNewsDialog}
				className={classes.dialog}
				classes={{ paperScrollPaper: classes.dialog }}
			>
				<div
					className={classes.dialogTitle}>
					<div className={classes.newsTitle}>
					{`COVID-19 ${data.type} : ${data.title}`}
					</div>
					<div className={classes.newsTime}>
						{showCreatedTime(new Date(data.createdTime))}
					</div>
      	</div>

				<DialogContent
					className={classes.dialogContent}
					dividers>
					{data.content}
				</DialogContent>

				<DialogActions className={classes.dialogActions}>
					<Button
						className={classes.button}
						onClick={props.store.closeNewsDialog}>
						닫기
        </Button>
				</DialogActions>
			</Dialog>
		)
	}))

export default NewsDialog

const showCreatedTime = (date) => {
	return date.toLocaleDateString() + " " + date.toLocaleTimeString()
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: "500px",
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
		flexDirection: "column",
	},
	formControl: {
		width: "100%",
		display: "flex",
		justifyContent: "center",
	},
	button: {
		marginBottom: theme.spacing(1),
		background: "white",
		color: "black",
		padding: theme.spacing(1, 1),
	},
	create: {
		backgroundColor: "#182848",
		color: "white",
		transitionProperty: "all",
		"&:hover": {
			transitionDuration: "0.5s",
			transform: "translateY(-5px)",
			backgroundColor: "#182848",
		},
	},
	dialog: {
		minWidth: 400,
		minHeight : 500,
		position: "unset",

	},
	dialogTitle : {
		display : 'flex',
		flexDirection : 'column',
		flex: '0 0 auto',
    margin: 0,
		padding: '16px 24px 3px',
		fontSize : '1.25rem',
	},
	newsTitle : {
	},
	newsTime : {
		fontWeight: 300,
    fontSize: '0.6em',
	},
	dialogContent: {
		display: "flex",
		flexDirection: "column",
	},
	dialogActions: {
		padding: "0px 8px",
	},
}));

const dialogTitleStyle = {
	display : 'flex',
	alignItems : 'baseline'
}