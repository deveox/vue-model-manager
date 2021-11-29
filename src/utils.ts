const utils = {
  deepMerge<T>(target: T, ...sources: T[]) {
    let source = sources[0];
    if (sources.length > 1) {
      source = this.deepMerge(sources.shift(), ...sources);
    }
    let result = { ...target };
    for (const k in source) {
      if (!Object.prototype.hasOwnProperty.call(source, k)) continue;
      if (Object.prototype.hasOwnProperty.call(result, k)) {
        if (
          source[k] &&
          typeof source[k] === "object" &&
          !Object.prototype.hasOwnProperty.call(source[k], "length")
        ) {
          result[k] = this.deepMerge(result[k], source[k]);
        } else {
          result[k] = result[k];
        }
      } else {
        result[k] = this.deepCopy(source[k]);
      }
    }
    return result;
  },
  deepCopy(v: any) {
    if (typeof v !== "object" || v === null) {
      return v;
    }

    if (v instanceof Date) {
      return new Date(v);
    }

    if (v instanceof Array) {
      return v.reduce((arr, item, i) => {
        arr[i] = this.deepCopy(item);
        return arr;
      }, []);
    }

    if (v instanceof Object) {
      return Object.keys(v).reduce((newObj, key) => {
        newObj[key] = this.deepCopy(v[key]);
        return newObj;
      }, {});
    }
  },
};

export default utils;
