var etputil = {
  getCalType: function(val) {
    let rtn = '';
    switch(val) {
      case 'H': 
        rtn = '환헷지';
        break;
      case 'F': 
        rtn = '환노출';
        break;
      case 'A': 
        rtn = '지수환노출';
        break;
      case 'T': 
        rtn = '복합배율';
        break;
      case 'K': 
        rtn = '복합배율2';
        break;
      default: 
        rtn = '';
        break;
    } 
    return rtn;
  },
  getRealType: function(val) {
    let rtn = '';
    switch(val) {
      case '1': 
        rtn = '실시간';
        break;
      case '0': 
        rtn = '종가';
        break;
      default: 
        rtn = '';
        break;
    } 
    return rtn;
  },
}
export default etputil