import Highcharts from 'highcharts';

Highcharts.setOptions({
  global: {
    useUTC: false
  },
  lang:{
    contextButtonTitle:"图表导出菜单",
    decimalPoint:".",
    downloadJPEG:"下载JPEG图片",
    downloadPDF:"下载PDF文件",
    downloadPNG:"下载PNG文件",
    downloadSVG:"下载SVG文件",
    drillUpText:"返回 {series.name}",
    loading:"加载中",
    months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    noData:"没有数据",
    numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
    printChart:"打印图表",
    resetZoom:"恢复缩放",
    resetZoomTitle:"恢复图表",
    shortMonths: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
    thousandsSep:",",
    weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  }
});

export default Highcharts;