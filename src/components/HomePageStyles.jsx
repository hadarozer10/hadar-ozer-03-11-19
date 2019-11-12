export default theme => ({
  root: {
    background: "#81c784"
  },
  item: {
    padding: "10px",
    textAlign: "center"
  },
  middleSection: {
    borderRadius: "16rem",
    background: "#cfe8fc",
    height: "500px",
    width: "auto"
  },
  lowerSection: {
    borderRadius: "16rem",
    background: "#cfe8fc",
    direction: "row",
    justify: "flex-end"
  },
  Typography: {
    left: "50px",
    top: "100px",
    color: "red",
    width: "auto",
    whiteSpace: "pre-wrap",
    height: "500px",
    margin: "20px"
  },
  listbox: {
    width: "100%",
    margin: 0,
    padding: 0,
    borderRadius: "1rem",
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    "& :hover": {
      backgroundColor: "grey",
      color: "black",
      cursor: "pointer"
    }
  }
});
