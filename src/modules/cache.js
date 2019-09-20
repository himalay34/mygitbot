const NodeCache = require( 'node-cache' );

class Cache {

    constructor(ttlSeconds) {
      if (!ttlSeconds) ttlSeconds = 0; //never expire
      this.cache = new NodeCache({ stdTTL: ttlSeconds, useClones: false });
  }
  /**
   * 
   * @param {string} key 
   * @param {function} storeFunction 
   * eg.
   * cache.get(key, () => DB.then((connection) =>
   *    connection.query(selectQuery).then((rows) => {
   *     return rows[0];
   *    })
   *  )).then((result) => {
   *    return result;
   * });
   */
  get(key, storeFunction) {
    const value = this.cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }

    return storeFunction().then((result) => {
      this.cache.set(key, result);
      return result;
    });
  }
  /**
   * 
   * @param {String} key 
   * @param {value: string/object etc} val 
   * @param {time to live} ttl 
   */
  set(key, val, ttl) {
    if (ttl) {
      this.cache.set(key, val, ttl);
    } else {
      this.cache.set(key, val);
    }

    return;
  }
  del(keys) {
    this.cache.del(keys);
  }

  getStartWith(str = '') {
    if (!str) return;

    const keys = this.cache.keys();

    return keys.map(r => {
      if (r.startsWith(str)) {
        return r;
      }
    }).filter(Boolean);
  }
  
  delStartWith(startStr = '') {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    this.cache.flushAll();
  }

  get engine() {
    return this.cache;
  }
}

module.exports = Cache;
/**
 * keys( [callback] ) //Returns an array of all existing keys.
 * .getStats(); //Returns the statistics.
 * .close() //This will clear the interval timeout which is set on check period option.
 * 
 * Events:
 * Cache.on( "set", function( key, value ){})
 * Cache.on( "del", function( key, value ){})
 * Cache.on( "expired", function( key, value ){})
 * Cache.on( "flush", function(){})
 */