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
  },
  getDayName: function(_day) {
    if(_day == 1) return "MON";
    else if(_day == 2) return "TUE";
    else if(_day == 3) return "WED";
    else if(_day == 4) return "THU";
    else if(_day == 5) return "FRI";
    else if(_day == 6) return "SAT";
    else return "SUN";
  },
  getTime: function() {
    let _today = new Date();
    return _today.toTimeString().split(' ')[0];
  },
  getTimeObj: function() {
    let _today = new Date();
    let rtn = {};
    rtn.day = this.getDayName(_today.getDay());
    // console.log("day : " + rtn.day);
    rtn.time = _today.toTimeString().split(' ')[0];
    // console.log("time : " + rtn.time);
    return rtn ;
  },
  getTimeOffset: function(offset) {
    let _today = new Date();
    let _time = _today.toTimeString().split(' ')[0];
    let _hh = _time.split(':')[0];
    let _mm = _time.split(':')[1];
    let _ss = _time.split(':')[2];

    _hh = Number(_hh) + offset ;
    if(_hh < 0) _hh = _hh + 24 ;
    if(_hh < 10) _hh = "0" + _hh;
    let str = _hh + ":" + _mm + ":" + _ss;

    return str ;
  },
  getTimeOffsetObj: function(offset) {
    let _today = new Date();
    let rtn = {};
    let _time = _today.toTimeString().split(' ')[0];
    let _hh = _time.split(':')[0];
    let _mm = _time.split(':')[1];
    let _ss = _time.split(':')[2];
    let _day = _today.getDay();

    _hh = Number(_hh) + offset ;
    if(_hh < 0) {
      _hh = _hh + 24 ;
      _day = _day - 1;
      if(_day < 0) _day = 6;
    }
    if(_hh < 10) _hh = "0" + _hh;
    let str = _hh + ":" + _mm + ":" + _ss;

    rtn.day = this.getDayName(_day);
    rtn.time = str;
    return rtn ;
  },

}
export default dateutil