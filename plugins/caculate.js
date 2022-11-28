import { Timestamp } from '@firebase/firestore'

export function caculateMarket (vol, entry, market) {
  let total = 0
  if (market !== 0) {
    total = Math.abs(((entry - market) / entry) * vol)
  } else {
    total = 0
  }
  return Math.floor(total)
}

export function caculateRate (win, lose) {
  return Math.abs(win / lose).toFixed(2)
}

export function caculateWin (vol, entry, tp) {
  const win = Math.abs(((entry - tp) / entry) * vol)
  return Math.floor(win)
}
export function caculateLose (vol, entry, sl) {
  const lose = -Math.abs(((entry - sl) / entry) * vol)

  return Math.floor(lose)
}

export function convertTimestap (sec, nano) {
  const datetime = new Timestamp(sec, nano).toDate()
  return datetime
}

export function generateData (ids, item) {
  const dateStart = convertTimestap(
    item.date_start.seconds,
    item.date_start.nanoseconds
  )
  const data = {
    id: ids,
    coin: item.coin,
    volume: item.volume,
    entry: item.entry,
    take_profit: item.take_profit,
    stop_loss: item.stop_loss,
    market: item.market,
    rate: caculateRate(
      caculateWin(item.volume, item.entry, item.take_profit),
      caculateLose(item.volume, item.entry, item.stop_loss)
    ),
    win: caculateWin(item.volume, item.entry, item.take_profit),
    lose: caculateLose(item.volume, item.entry, item.stop_loss),
    position: item.position,
    status: item.status,
    date_start: new Date(dateStart).toLocaleString(),
    total: caculateMarket(item.volume, item.entry, item.market)
  }
  return data
}
