import { useState } from 'react'
import './App.css'
import Piece from './components/Piece'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { PlayerMessage } from './components/PlayerMessage'
import TransparentOverlay from './components/TransparentOverlay'

function App() {
  const [board, setBoard] = useState(Array(9).fill(''))
  const [clearSequence, setClearSequence] = useState(Array(6).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState('O')
  const nextClearIndex = useMemo(() => clearSequence[0], [clearSequence])

  const [winner, setWinner] = useState(null)

  useEffect(() => {
    const result = checkWinner(board)
    setWinner(result.winner)
  }, [board])

  /**
   * @param {'O'|'X'} forWho 
   */
  function generateMessage(forWho) {
    if (winner === null) {
      return currentPlayer === forWho ? '你的回合' : ''
    } else {
      return winner === forWho ? '你贏了' : '你輸了'
    }
  }

  return (
    <>
      {winner !== null && <TransparentOverlay onClick={() => {
        setBoard(Array(9).fill(''))
        setClearSequence(Array(6).fill(null))
        setCurrentPlayer('O')
        setWinner(null)
      }} />}
      <PlayerMessage
        content={generateMessage('X')}
        isUpsideDown={true}
      />
      <PlayerMessage
        content={generateMessage('O')}
        isUpsideDown={false}
      />
      <div id="board" style={{
        width: '90vw',
        height: 'fit-content',
        maxWidth: 'calc(1280px * 0.9)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
      }}>
        {board.map((item, index) => {
          const borderWidth = '5px'
          return (
            <div
              key={`${new Date().getTime()}_${index}`}
              style={{
                width: `calc(30vw - ${borderWidth} * 2)`,
                height: `calc(30vw - ${borderWidth} * 2)`,
                borderWidth,
                borderStyle: 'solid',
                borderTopColor: [0, 1, 2].includes(index) ? 'transparent' : 'white',
                borderBottomColor: [6, 7, 8].includes(index) ? 'transparent' : 'white',
                borderLeftColor: [0, 3, 6].includes(index) ? 'transparent' : 'white',
                borderRightColor: [2, 5, 8].includes(index) ? 'transparent' : 'white',
                cursor: item ? '' : 'pointer',
              }}
              onClick={() => {
                if (item) { return }

                setBoard((prev) => {
                  const next = [...prev]
                  next[index] = currentPlayer
                  if (nextClearIndex !== null) {
                    next[nextClearIndex] = ''
                  }
                  return next
                })
                setClearSequence((prevSeq) => {
                  const nextSeq = [...prevSeq]
                  nextSeq.shift()
                  nextSeq.push(index)
                  return nextSeq
                })
                setCurrentPlayer((prev) => prev === 'O' ? 'X' : 'O')
              }}
            >
              {item && <Piece type={item} isGhost={index === nextClearIndex} />}
            </div>
          )
        })}
      </div>
    </>
  )
}

/**
 * 判斷棋盤是否有勝利者
 * 
 * @param {Array<string|null>} board - 長度為 9 的一維陣列，包含 'X'、'O' 或 null
 * @returns {string|null} - 返回 'X' 或 'O' 表示勝利者，或 null 表示沒有勝利者
 */
function checkWinner(board) {
  const winningCombinations = [
    [0, 1, 2], // 第一橫排
    [3, 4, 5], // 第二橫排
    [6, 7, 8], // 第三橫排
    [0, 3, 6], // 第一直排
    [1, 4, 7], // 第二直排
    [2, 5, 8], // 第三直排
    [0, 4, 8], // 對角線從左上到右下
    [2, 4, 6]  // 對角線從右上到左下
  ]

  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        indexes: [a, b, c]
      }
    }
  }

  return { winner: null }
}

export default App