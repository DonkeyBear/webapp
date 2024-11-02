import PropTypes from 'prop-types'

export default function PlayerMessage(props) {
  return (
    <div style={{
      position: 'absolute',
      top: props.isUpsideDown ? '0' : '',
      bottom: props.isUpsideDown ? '' : '0',
      rotate: props.isUpsideDown ? '180deg' : '',
      fontSize: '1.25rem',
      padding: '0.75rem',
      fontWeight: 'bold'
    }}>
      {props.content}
    </div>
  )
}

PlayerMessage.propTypes = {
  content: PropTypes.string,
  isUpsideDown: PropTypes.bool,
}