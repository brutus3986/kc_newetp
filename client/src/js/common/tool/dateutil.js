var dateutil = {
  diffDate: function(val1, val2) {
    let diffDay = 0;

    if(val1 !== undefined && val2 !== undefined) {
      let dateObj1 = new Date(val1.substring(0,4), Number(val1.substring(4,6)) -1, val1.substring(6, 8));
      let dateObj2 = new Date(val2.substring(0,4), Number(val2.substring(4,6)) -1, val2.substring(6, 8));
  
      diffDay = (dateObj1.getTime() - dateObj2.getTime())/1000/60/60/24;
    }
    return diffDay;
  },
  getDay: function(val) {
    let rDay = 0;
    if(val !== undefined) {
      let dateObj = new Date(val.substring(0,4), Number(val.substring(4,6)) -1, val.substring(6, 8));
      rDay = dateObj.getDay();
    }
    return rDay;
  }

}
export default dateutil