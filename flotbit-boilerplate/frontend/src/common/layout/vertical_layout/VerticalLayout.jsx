const VerticalLayout = (props) => {
  return (
    <div className="vertical-layout" id="layout-wrapper">
      <div className="main-content">{props.children}</div>
    </div>
  );
};

export default VerticalLayout;