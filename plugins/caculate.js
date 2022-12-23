/* eslint-disable */
import { Timestamp } from "@firebase/firestore";

export function convertTimestap(sec, nano) {
  const datetime = new Timestamp(sec, nano).toDate();
  return datetime;
}

export function generateData(ids, item) {
  const dateStart = convertTimestap(
    item.date_start.seconds,
    item.date_start.nanoseconds
  );
  const data = {
    id: ids,
    coin: item.coin,
    volume: item.volume,
    entry: item.entry,
    take_profit: item.take_profit,
    stop_loss: item.stop_loss,
    market: item.market,
    rate: caculate(
      item.volume,
      item.entry,
      item.take_profit,
      item.stop_loss,
      item.market,
      item.position
    ).rate,
    win: caculate(
      item.volume,
      item.entry,
      item.take_profit,
      item.stop_loss,
      item.market,
      item.position
    ).win,
    lose: caculate(
      item.volume,
      item.entry,
      item.take_profit,
      item.stop_loss,
      item.market,
      item.position
    ).lose,
    position: item.position,
    status: item.status,
    date_start: new Date(dateStart).toLocaleDateString(),
    roe: caculate(
      item.volume,
      item.entry,
      item.take_profit,
      item.stop_loss,
      item.market,
      item.position
    ).roe,
  };
  return data;
}
export function caculate(vol, entry, tp, sl, market, position) {
  // position = true => LONG
  // position = false => SHORT
  let win;
  let lose;
  let roe;

  if (!market || market === 0) {
    win = Math.abs(((entry - tp) / entry) * vol);
    lose = Math.abs(((entry - sl) / entry) * vol);
    roe = 0;
  } else {
    if (position === true) {
      win = Math.abs(((entry - tp) / entry) * vol);
      lose = ((sl - entry) / entry) * vol;
      roe = ((market - entry) / entry) * vol;
    } else {
      win = Math.abs(((entry - tp) / entry) * vol);
      lose = ((entry - sl) / entry) * vol;
      roe = ((entry - market) / entry) * vol;
    }
  }

  return {
    win: Number(win.toFixed(2)),
    lose: Number(lose.toFixed(2)),
    roe: Number(roe.toFixed(2)),
    rate: Number(Math.abs(win / lose).toFixed(2)),
  };
}
export function convertMonth(ele) {
  let year = Number(ele.split("-")[0]) || Number(ele.split("_")[0]);
  let month = Number(ele.split("-")[1]) + 1 || Number(ele.split("_")[1]) + 1;
  let newValue = `${year}-${String(month).padStart(2, "0")}`;

  return newValue;
}
