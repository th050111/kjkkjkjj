const axios = require("axios");

class Meal {
  constructor() {
    this.mealList = [];
    this.sdCode = "N10"; //교육청 코드
    this.scCode = "8140085"; //학교 코드
    this.toFindYear = "2022"; //찾을 년도

    this.url = `ATPT_OFCDC_SC_CODE=${this.sdCode}&SD_SCHUL_CODE=${this.scCode}&MLSV_YMD=${this.toFindYear}`; //요청할 url
  }
  getTodayMealList() {
    const today = this.getTodayDate();
    return this.getMealListAt(today);
  }
  isOkDate(dateJson) {
    //가져온 값들이 NAN이 아닌지 확인하는
    if (!Object.values(dateJson).includes(NaN)) {
      const { year, month, date } = dateJson;
      if (
        year === meal.getTodayDate().year &&
        month >= 1 &&
        month <= 12 &&
        date <= 31 &&
        date >= 1
      ) {
        return true;
      }
    }
    return false;
  }
  getMealListAt(dateJson) {
    // 날짜를 받고 그 날짜의 급식 데이터를 반환
    /* dateJson 형식
      {
          year:2022,
          date:05,
          month:11,
      }
      */
    let { year, date, month } = dateJson;

    let list = [];

    //자리수 맞춰주기 ex) 5월 --> 05월
    date = date < 10 ? "0" + date : date;
    month = month < 10 ? "0" + month : month;

    let dateStr = "" + year + month + date; // 문자열로 변환 ex) 2022년05월22일 --> 20220522

    console.log(dateStr);
    list = this.mealList.filter((el) => {
      return el.MLSV_YMD == dateStr;
    }); //mealList의 객체들중 MLSV_YMD란 값이 dateStr과 같은 객체만 반환하여 배열 생성

    for (let i = 0; i < 3; i++) {
      //급식 정보가 없다면
      if (!list[i]) {
        list[i] = ["급식정보가 없습니다!"];
        continue;
      }
      list[i] = list[i].DDISH_NM.split("<br/>"); // ex) "백미밥<br/>김치" --> ["백미밥", "김치"]
    }

    return {
      dateJson,
      list,
    };
  }
  getTodayDate() {
    //Date객체로 오늘의 날짜 정보 저장
    const date = new Date();
    const today = {
      year: date.getFullYear(),
      date: parseInt(date.getDate()),
      month: date.getMonth() + 1,
    };
    return today;
  }
  getMealListFromApi() {
    //fetch로 api에 요청하여 급식데이터 가져오기
    axios(
      "https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=981b2e196a364ee7b2223e11f375de26&Type=json&pSize=1000&" +
        this.url
    ).then((res) => {
      const myJson = res.data;
      this.mealList = myJson["mealServiceDietInfo"][1].row; // 받은 데이터에서 필요한 급식데이터만 추출
    });
  }
}

const meal = new Meal();

meal.getMealListFromApi();
module.exports = meal;
