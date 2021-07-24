
export const queryParams = {

  objToString: (obj: Record<string, any>): string => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },

  stringToObj: () => {
    const search = window.location.search.substring(1);
    try {
      return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    } catch {
      return '';
    }
  },

  append: (obj: Record<string, any>) => {
    return queryParams.objToString({
      ...queryParams.stringToObj(),
      ...obj,
    });
  },

  get(key: string): string | null {
    return new URLSearchParams(window.location.search).get(key);
  }
};
