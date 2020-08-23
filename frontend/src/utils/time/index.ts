import Moment from 'moment';

export const nowDate = () => {
  return Moment.utc().format();
};

export const yesterdayDate = () => {
  const today = new Date()
  const yesterday = new Date(today)

  yesterday.setDate(yesterday.getDate() - 1);
  var toReturn = Moment(yesterday).format();

  return toReturn;
}

export const convertDateFromNow = (date: any) => {
  return Moment(date).local().fromNow();
};

export const delay = async (ms: number) => {
  return new Promise(resolve => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, ms);
  });
};