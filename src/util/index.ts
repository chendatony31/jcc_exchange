import assert = require("assert");
import { JcNodeRpc } from "jcc_rpc";

export const exchangeInstance = (() => {
  let inst: JcNodeRpc = null;

  /**
   * init instance of jc exchange
   *
   * @param {string[]} hosts
   * @param {number} port
   * @param {boolean} https
   * @returns {JcNodeRpc}
   */
  const init = (urls: string[]): JcNodeRpc => {
    if (inst === null) {
      inst = new JcNodeRpc(urls);
    } else {
      try {
        assert.deepStrictEqual(inst.urls, urls);
      } catch (error) {
        inst.urls = urls;
      }
    }

    return inst;
  };

  /**
   * destroy instance of jc exchange
   *
   */
  const destroy = () => {
    inst = null;
  };

  return {
    destroy,
    init
  };
})();

export const swtcSequence = (() => {
  // default value
  // the sequence should be not less than 0
  let sequence: number = -1;

  /**
   * get sequence
   *
   * the value is from callback function if the sequence is -1, otherwise is from memory
   *
   * @param {(...args) => Promise<number>} callback
   * @param {*} args
   * @returns {Promise<number>}
   */
  const get = async (callback: (...args) => Promise<number>, ...args): Promise<number> => {
    if (sequence === -1) {
      sequence = await callback.apply(null, args);
    }
    return sequence;
  };

  /**
   * sequence add 1
   *
   */
  const rise = () => {
    sequence = sequence + 1;
  };

  /**
   * reset sequence to -1
   *
   */
  const reset = () => {
    sequence = -1;
  };

  return {
    get,
    reset,
    rise
  };
})();
