export const styles = {
  appbar: {
    borderRadius: "10px",
    margin: "15px 0",
    padding: "0 15px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    display: { xs: "none", sm: "flex" },
    color: "#1A1A40",
    marginRight: "15px",
    fontFamily: "Roboto",
    fontWeight: "700",
  },

  headingLogo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: { xs: 0, sm: "20px" },
  },
  profile: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    padding: "0 10px",
    textAlign: "center",
    fontSize: { xs: "1rem", sm: "1.2rem" },
  },
  avatar: {
    margin: "0 5px",
  },
  logout: {
    margin: "0 5px",
  },
};
