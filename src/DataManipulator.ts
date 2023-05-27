import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,

  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {

    // getting the avg of a stock ABC and DEF
    const price_ABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const price_DEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;

    //getting the ratio of stock ABC to DEF
    const ratio = price_ABC / price_DEF;

    const upper_Bound = 1 + 0.05;
    const lower_Bound = 1 - 0.05;

      return {
        price_abc: price_ABC,
        price_def: price_DEF,
        ratio,

        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ?
                   serverResponds[0].timestamp : serverResponds[1].timestamp,
        upper_bound: upper_Bound,
        lower_bound: lower_Bound,
        trigger_alert: (ratio > upper_Bound || ratio < lower_Bound) ? ratio : undefined,
      };

  }
}
