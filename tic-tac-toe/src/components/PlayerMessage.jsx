import PropTypes from 'prop-types'

export function PlayerMessage(props) {
  return (
    <div style={{
      position: 'absolute',
      top: props.isUpsideDown ? '0' : '',
      bottom: props.isUpsideDown ? '' : '0',
      rotate: props.isUpsideDown ? '180deg' : '',
      fontSize: '1.25rem',
      padding: '0.75rem',
    }}>
      {props.content}
    </div>
  )
}

PlayerMessage.propTypes = {
  content: PropTypes.string,
  isUpsideDown: PropTypes.bool,
}