export const dataSort = (appData, appName) => {
  return appData.map((e) => ({
    ...e,
    app_data: appName.filter((item) => {
      if (e.app_id == item.app_id) {
        return item.app_name;
      }
    }),
  }));
};

export function requestFilter(data, min, max) {
  // data = dataSort(data);
  return data.filter((item) => {
    if (min < item.requests && item.requests < max) {
      return item;
    }
  });
}

export function responsetFilter(data, min, max) {
  // data = dataSort(data);
  return data.filter((item) => {
    if (min < item.responses && item.responses < max) {
      return item;
    }
  });
}

export function impressionFilter(data, min, max) {
  return data.filter((item) => {
    if (min < item.impressions && item.impressions < max) {
      return item;
    }
  });
}

export function clickFilter(data, min, max) {
  return data.filter((item) => {
    if (min < item.clicks && item.clicks < max) {
      return item;
    }
  });
}

export function revenueFilter(data, min, max) {
  return data.filter((item) => {
    if (min < item.revenue && item.revenue < max) {
      return item;
    }
  });
}
