import PropTypes from 'prop-types'

/**
 * 棋子元件
 * 
 * @param {Object} props 
 * @param {'O'|'X'} props.type - 棋子類型
 * @param {Boolean} [props.isGhost=false] - 是否半透明顯示
 * @returns 
 */
export default function Piece(props) {
  const isCircle = props.type === 'O'

  return (
    <div>
      <span className="material-symbols-outlined" style={{
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        userSelect: 'none',
        fontSize: isCircle ? 'min(1200%, 22.5dvw)' : 'min(1400%, 27.5dvw)',
        color: isCircle ? '#47e' : '#e45',
        opacity: props?.isGhost ? '0.5' : '1'
      }}>
        {isCircle ? 'circle' : 'close'}
      </span>
    </div>
  )
}

Piece.propTypes = {
  type: PropTypes.oneOf(['O', 'X']).isRequired,
  isGhost: PropTypes.bool,
}