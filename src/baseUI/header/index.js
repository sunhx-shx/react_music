import React from 'react';
import { HeaderContainer } from "./style"
import PropTypes from "prop-types";

// 处理函数组件拿不到ref的问题,所以用forwardRef
const Header = React.forwardRef((props, ref) => {
  const { handleClick, title, isMarquee, single} = props;
  return (
    <HeaderContainer ref={ref} addColor={single}>
      <i className="iconfont back"  onClick={handleClick}>&#xe612;</i>
      {
        // eslint-disable-next-line
        isMarquee ? <marquee><h1>{title}</h1></marquee>:
        <h1>{title}</h1>
      }

    </HeaderContainer>
  )
});

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee: false
};

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool,
  single: PropTypes.bool
};

export default React.memo(Header);
