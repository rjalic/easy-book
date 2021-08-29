export class DateHelper {
  static today = () => {
    return this.normalizeDate(new Date());
  };

  static tomorrow = () => {
    const today = new Date(this.today());
    return this.normalizeDate(today.setDate(today.getDate() + 1));
  };

  static normalizeDate = (date) => {
    let dateObject = new Date(date);
    dateObject.setMinutes(0, 0, 0);
    return dateObject.toISOString();
  };

  static toIsoDate = (date) => {
    let dateObject = new Date(date);
    return dateObject.toISOString();
  };

  static toDateString = (date) => {
    const dateObject = new Date(date);
    return dateObject.toDateString();
  };

  static daysBetween = (d1, d2) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    return Math.floor((date2 - date1) / 86400000);
  };

  static addDays = (date, days) => {
    const dateObject = new Date(date);
    return dateObject.setDate(dateObject.getDate() + days);
  };
}
