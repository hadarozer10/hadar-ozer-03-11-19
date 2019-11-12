import React, { Component } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

class LikeIcon extends Component {
  render() {
    if (!this.props.liked) {
      return (
        <FavoriteBorderIcon fontSize="large" onClick={this.props.onClick} />
      );
    } else {
      return <FavoriteIcon fontSize="large" onClick={this.props.onClick} />;
    }
  }
}

export default LikeIcon;
