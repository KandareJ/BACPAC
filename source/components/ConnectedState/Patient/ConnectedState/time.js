export const minute = 60 * 1000;
export const hour = minute * 60;
export const day = hour * 24;
export const month = day * 30;
export const year = day * 365;

export const toRelativeTime = (previous, current) => {
  let elapsed = current - previous;
  let val = 0;

  if (elapsed < 0 || previous === -1 || !previous) {
    return '-';
  }

  else if (elapsed < minute) {
    val = Math.floor(elapsed/1000);
    return  'Just moments ago';
  }

  else if (elapsed < hour) {
    val = Math.floor(elapsed/minute);
    return  (val == 1) ? val + ' minute ago' : val + ' minutes ago';
  }

  else if (elapsed < day ) {
    val = Math.floor(elapsed/hour);
    return  (val == 1) ? val + ' hour ago' : val + ' hours ago';
  }

  else if (elapsed < month) {
    val = Math.floor(elapsed/day);
    return  (val == 1) ? val + ' day ago' : val + ' days ago';
  }

  else if (elapsed < year) {
    val = Math.floor(elapsed/month);
    return  (val == 1) ? val + ' month ago' : val + ' months ago';
  }

  else {
    val = Math.floor(elapsed/year);
    return  (val == 1) ? val + ' year ago' : val + ' years ago';
  }
}
