// lunar-calendar.js - 农历日历计算（1900-2100年）
// 农历数据：1900-2100年
const LUNAR_INFO = [
  0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
  0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
  0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
  0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
  0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
  0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
  0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
  0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
  0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
  0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
  0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
  0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
  0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
  0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
  0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
  0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,
  0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
  0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,
  0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
  0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,
  0x0d520
];

// 天干
const TIAN_GAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
// 地支
const DI_ZHI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
// 生肖
const ZODIAC = ['鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗','猪'];
// 农历月份
const LUNAR_MONTH = ['正','二','三','四','五','六','七','八','九','十','冬','腊'];
// 农历日期
const LUNAR_DAY = [
  '初一','初二','初三','初四','初五','初六','初七','初八','初九','初十',
  '十一','十二','十三','十四','十五','十六','十七','十八','十九','二十',
  '廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'
];
// 星期
const WEEK_DAY = ['日','一','二','三','四','五','六'];

// 节假日（公历）
const SOLAR_HOLIDAYS = {
  '01-01': '元旦',
  '02-14': '情人节',
  '03-08': '妇女节',
  '03-12': '植树节',
  '04-01': '愚人节',
  '05-01': '劳动节',
  '05-04': '青年节',
  '06-01': '儿童节',
  '07-01': '建党节',
  '08-01': '建军节',
  '09-10': '教师节',
  '10-01': '国庆节',
  '10-24': '程序员节',
  '11-11': '双十一',
  '12-24': '平安夜',
  '12-25': '圣诞节'
};

// 节假日（农历）
const LUNAR_HOLIDAYS = {
  '01-01': '春节',
  '01-15': '元宵节',
  '02-02': '龙抬头',
  '05-05': '端午节',
  '07-07': '七夕节',
  '07-15': '中元节',
  '08-15': '中秋节',
  '09-09': '重阳节',
  '12-08': '腊八节',
  '12-23': '小年',
  '12-30': '除夕'
};

// 获取农历年份信息
function getLunarYearInfo(year) {
  const offset = year - 1900;
  if (offset < 0 || offset >= LUNAR_INFO.length) return null;
  return LUNAR_INFO[offset];
}

// 计算农历
function solarToLunar(year, month, day) {
  const baseDate = new Date(1900, 0, 31);
  const targetDate = new Date(year, month - 1, day);
  let offset = Math.floor((targetDate - baseDate) / 86400000);
  
  let lunarYear = 1900;
  let daysInYear = 0;
  
  for (let i = 0; i < LUNAR_INFO.length && offset > 0; i++) {
    daysInYear = lunarYearDays(lunarYear);
    offset -= daysInYear;
    if (offset > 0) lunarYear++;
  }
  
  if (offset < 0) {
    offset += daysInYear;
    lunarYear--;
  }
  
  const yearInfo = getLunarYearInfo(lunarYear);
  const leapMonth = getLeapMonth(lunarYear);
  let lunarMonth = 1;
  let isLeap = false;
  let daysInMonth = 0;
  
  for (let i = 1; i <= 12; i++) {
    if (i === leapMonth + 1) {
      daysInMonth = leapDays(lunarYear);
      if (offset < daysInMonth) {
        isLeap = true;
        lunarMonth = leapMonth;
        break;
      }
      offset -= daysInMonth;
    }
    
    daysInMonth = monthDays(lunarYear, i);
    if (offset < daysInMonth) {
      lunarMonth = i;
      break;
    }
    offset -= daysInMonth;
  }
  
  const lunarDay = offset + 1;
  
  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
    isLeap: isLeap,
    yearStr: TIAN_GAN[(lunarYear - 4) % 10] + DI_ZHI[(lunarYear - 4) % 12],
    zodiac: ZODIAC[(lunarYear - 4) % 12],
    monthStr: (isLeap ? '闰' : '') + LUNAR_MONTH[lunarMonth - 1] + '月',
    dayStr: LUNAR_DAY[lunarDay - 1]
  };
}

// 获取农历年天数
function lunarYearDays(year) {
  let sum = 0;
  const leap = getLeapMonth(year);
  for (let i = 1; i <= 12; i++) {
    sum += monthDays(year, i);
    if (i === leap) sum += leapDays(year);
  }
  return sum;
}

// 获取闰月
function getLeapMonth(year) {
  const info = getLunarYearInfo(year);
  return info & 0xf;
}

// 获取闰月天数
function leapDays(year) {
  if (getLeapMonth(year)) {
    const info = getLunarYearInfo(year);
    return (info & 0x10000) ? 30 : 29;
  }
  return 0;
}

// 获取农历月天数
function monthDays(year, month) {
  const info = getLunarYearInfo(year);
  return (info & (0x10000 >> month)) ? 30 : 29;
}

// 获取公历节假日
function getSolarHoliday(month, day) {
  const key = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  return SOLAR_HOLIDAYS[key] || '';
}

// 获取农历节假日
function getLunarHoliday(lunarMonth, lunarDay) {
  const key = `${lunarMonth.toString().padStart(2, '0')}-${lunarDay.toString().padStart(2, '0')}`;
  return LUNAR_HOLIDAYS[key] || '';
}

// 获取星期
function getWeekDay(year, month, day) {
  const date = new Date(year, month - 1, day);
  return WEEK_DAY[date.getDay()];
}

// 获取完整日期信息
function getDateInfo(year, month, day) {
  const lunar = solarToLunar(year, month, day);
  const solarHoliday = getSolarHoliday(month, day);
  const lunarHoliday = getLunarHoliday(lunar.month, lunar.day);
  const weekDay = getWeekDay(year, month, day);
  
  const festival = solarHoliday || lunarHoliday || '';
  
  let lunarStr = lunar.dayStr;
  if (lunar.day === 1) {
    lunarStr = lunar.monthStr;
  }
  
  return {
    year,
    month,
    day,
    weekDay,
    weekDayStr: '周' + weekDay,
    lunar,
    lunarStr,
    festival,
    solarHoliday,
    lunarHoliday,
    fullLunar: `${lunar.yearStr}年 ${lunar.monthStr}${lunar.dayStr}`
  };
}

// 获取今日信息
function getTodayInfo() {
  const now = new Date();
  return getDateInfo(now.getFullYear(), now.getMonth() + 1, now.getDate());
}
