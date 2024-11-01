import PropTypes from 'prop-types'

export default function TransparentOverlay(props) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '1000',
        ...props.style
      }}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

TransparentOverlay.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  onClick: PropTypes.func,
}